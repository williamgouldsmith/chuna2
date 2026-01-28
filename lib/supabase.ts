
import { createClient } from '@supabase/supabase-js';

// Safe environment variable access
const getEnv = (key: string) => {
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env) return process.env[key];
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) return import.meta.env[key];
  return undefined;
};

const SUPABASE_URL = getEnv('SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnv('SUPABASE_ANON_KEY');

// Check if configured (and not using default placeholders if any were hardcoded previously)
const isConfigured = 
  SUPABASE_URL && 
  SUPABASE_URL !== 'https://your-project.supabase.co' && 
  SUPABASE_ANON_KEY && 
  SUPABASE_ANON_KEY !== 'your-anon-key';

// MOCK IMPLEMENTATION
// This allows the app to run without a real backend connection for demonstration purposes.

const STORAGE_KEY = 'chuna_mock_db';
const SESSION_KEY = 'chuna_mock_session';
const MASTER_EMAIL = 'wgouldie.business@gmail.com';

const getDb = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    // 1. Handle missing or "null" string storage
    if (!stored || stored === "null" || stored === "undefined") {
       return { users: [], profiles: [], tenants: [], onboarding: [], leads: [], feedback: [], requests: [], api_keys: [], invoices: [] };
    }

    const parsed = JSON.parse(stored);

    // 2. Handle parsed being null or not an object
    if (!parsed || typeof parsed !== 'object') {
        return { users: [], profiles: [], tenants: [], onboarding: [], leads: [], feedback: [], requests: [], api_keys: [], invoices: [] };
    }

    // 3. Ensure all required tables exist (migration safety)
    const tables = ['users', 'profiles', 'tenants', 'onboarding', 'api_keys', 'leads', 'feedback', 'requests', 'invoices'];
    tables.forEach(table => {
        if (!Array.isArray(parsed[table])) parsed[table] = [];
    });

    return parsed;
  } catch (e) {
    console.warn("Corrupted mock DB, resetting...", e);
    return { users: [], profiles: [], tenants: [], onboarding: [], leads: [], feedback: [], requests: [], api_keys: [], invoices: [] };
  }
};

const saveDb = (db: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

const getSession = () => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored && stored !== "null") return JSON.parse(stored);
  } catch (e) {}
  return null;
};

const setSession = (session: any) => {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
  notifyAuthSubscribers(session);
};

// Auth Subscribers
type AuthSubscriber = (event: string, session: any) => void;
const authSubscribers: AuthSubscriber[] = [];
const notifyAuthSubscribers = (session: any) => {
  authSubscribers.forEach(cb => cb(session ? 'SIGNED_IN' : 'SIGNED_OUT', session));
};

class MockQueryBuilder {
  table: string;
  data: any[] = [];
  filter: (row: any) => boolean = () => true;
  action: 'select' | 'insert' | 'update' | null = null;
  payload: any = null;
  singleResult = false;
  orderBy: { col: string, ascending: boolean } | null = null;

  constructor(table: string) {
    this.table = table;
  }

  select(columns: string = '*') {
    // Only set action to select if it hasn't been set to insert/update yet
    if (this.action !== 'insert' && this.action !== 'update') {
      this.action = 'select';
    }
    return this;
  }

  insert(data: any) {
    this.action = 'insert';
    this.payload = data;
    return this;
  }

  update(data: any) {
    this.action = 'update';
    this.payload = data;
    return this;
  }

  eq(column: string, value: any) {
    const prevFilter = this.filter;
    this.filter = (row) => prevFilter(row) && row[column] === value;
    return this;
  }

  single() {
    this.singleResult = true;
    return this;
  }

  order(column: string, { ascending = true } = {}) {
    this.orderBy = { col: column, ascending };
    return this;
  }

  // Execute
  async then(resolve: (res: any) => void, reject?: (err: any) => void) {
    await new Promise(r => setTimeout(r, 100)); // Lower latency for snappier feel
    const db = getDb(); // Safe getter
    
    // Ensure table exists in mock DB
    if (!db[this.table]) {
        db[this.table] = [];
        saveDb(db);
    }
    
    let rows = db[this.table] || [];
    let result: any = null;
    let error: any = null;

    try {
      if (this.action === 'insert') {
        const newRows = Array.isArray(this.payload) ? this.payload : [this.payload];
        const inserted = newRows.map((r: any) => ({
           id: crypto.randomUUID(), 
           created_at: new Date().toISOString(),
           ...r 
        }));
        db[this.table] = [...rows, ...inserted];
        saveDb(db);
        result = this.singleResult ? inserted[0] : inserted;
      } 
      else if (this.action === 'update') {
        let updatedCount = 0;
        const updated = rows.map((r: any) => {
          if (this.filter(r)) {
            updatedCount++;
            return { ...r, ...this.payload };
          }
          return r;
        });
        db[this.table] = updated;
        saveDb(db);
        // Supabase update returns null data by default unless select() is chained, but we'll return null to mimic default
        result = null; 
      }
      else if (this.action === 'select') {
        let filtered = rows.filter(this.filter);
        if (this.orderBy) {
          filtered.sort((a: any, b: any) => {
            if (a[this.orderBy!.col] < b[this.orderBy!.col]) return this.orderBy!.ascending ? -1 : 1;
            if (a[this.orderBy!.col] > b[this.orderBy!.col]) return this.orderBy!.ascending ? 1 : -1;
            return 0;
          });
        }
        result = this.singleResult ? (filtered[0] || null) : filtered;
        if (this.singleResult && !result) {
            error = { message: 'Row not found', code: 'PGRST116' }; 
        }
      }
    } catch (err: any) {
      error = err;
    }

    if (error && this.singleResult && error.code === 'PGRST116') {
         resolve({ data: null, error }); 
         return;
    }

    resolve({ data: result, error });
  }
}

const mockClient = {
  auth: {
    signUp: async ({ email, password, options }: any) => {
      await new Promise(r => setTimeout(r, 500));
      const db = getDb();
      if (db.users.find((u: any) => u.email === email)) {
        return { data: { user: null }, error: { message: 'User already exists' } };
      }
      
      const user = { 
        id: crypto.randomUUID(), 
        email, 
        password, // Storing password in mock for consistency (in plaintext, never do this in real app)
        user_metadata: options?.data || {} 
      };
      db.users.push(user);
      
      // Check if this is the master email
      const isMaster = email.toLowerCase() === MASTER_EMAIL.toLowerCase();

      // Trigger profile creation immediately to ensure it exists for subsequent updates
      db.profiles.push({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name,
        role: isMaster ? 'admin' : 'client', // Auto-assign admin role
        onboarding_complete: false,
        created_at: new Date().toISOString()
      });
      
      saveDb(db);
      
      const session = { access_token: 'mock-token-' + Date.now(), user: { id: user.id, email: user.email, user_metadata: user.user_metadata } };
      setSession(session);
      return { data: { user: session.user, session }, error: null };
    },
    signInWithPassword: async ({ email, password }: any) => {
      await new Promise(r => setTimeout(r, 500));
      const db = getDb();
      // Simple mock auth check
      const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) { 
        // In mock mode, we'll allow login if password matches OR if password was not stored (legacy mock data)
        if (!user.password || user.password === password) {

            // FORCE ADMIN CHECK ON LOGIN (Fixes existing accounts)
            if (user.email.toLowerCase() === MASTER_EMAIL.toLowerCase()) {
                const profileIndex = db.profiles.findIndex((p: any) => p.id === user.id);
                if (profileIndex >= 0 && db.profiles[profileIndex].role !== 'admin') {
                    db.profiles[profileIndex].role = 'admin';
                    console.log("Auto-promoted Master Admin on login");
                    saveDb(db);
                }
            }

            const session = { access_token: 'mock-token-' + Date.now(), user: { id: user.id, email: user.email, user_metadata: user.user_metadata } };
            setSession(session);
            return { data: { user: session.user, session }, error: null };
        }
      }
      return { data: { user: null }, error: { message: 'Invalid login credentials' } };
    },
    resetPasswordForEmail: async (email: string) => {
      await new Promise(r => setTimeout(r, 800));
      return { data: {}, error: null }; 
    },
    signOut: async () => {
      setSession(null);
      return { error: null };
    },
    getSession: async () => {
      return { data: { session: getSession() } };
    },
    onAuthStateChange: (callback: any) => {
      authSubscribers.push(callback);
      callback(getSession() ? 'SIGNED_IN' : 'SIGNED_OUT', getSession());
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  from: (table: string) => new MockQueryBuilder(table),
  
  channel: (name: string) => {
    const ch: any = {
      on: (type: any, filter: any, callback: any) => ch,
      subscribe: (cb?: any) => {
        if(cb) cb('SUBSCRIBED');
        return ch;
      },
      unsubscribe: () => Promise.resolve(),
    };
    return ch;
  },
  removeChannel: (ch: any) => {}
};

// @ts-ignore
export const supabase: any = isConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : mockClient;
export const isMockClient = !isConfigured;

if (!isConfigured) {
  console.warn('Supabase not configured. Using Mock Client with localStorage.');
  
  // Developer Helper: Create Master Admin
  // @ts-ignore
  window.makeMeAdmin = (emailInput?: string) => {
    const db = getDb();
    
    // Default to the known master email if none provided
    const targetEmail = emailInput || MASTER_EMAIL;

    if (!db || !db.profiles || db.profiles.length === 0) {
        console.error("%c Error: No users found in DB.", 'color: #ef4444; font-weight: bold;');
        alert("Error: No users found in the mock database. Please Sign Up first.");
        return false;
    }

    // Case insensitive match
    const user = db.profiles.find((p: any) => p.email.toLowerCase() === targetEmail.toLowerCase());

    if (user) {
        user.role = 'admin';
        saveDb(db);
        const msg = `Success! User ${user.email} is now an Admin.`;
        console.log(`%c ${msg}`, 'color: #4ade80; font-weight: bold; font-size: 14px;');
        alert(msg + " Page will now reload.");
        return true;
    } else {
        const err = `User with email '${targetEmail}' not found.`;
        console.error(err);
        alert(err);
        return false;
    }
  };
}
