
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) return process.env.API_KEY;
  return null;
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateServiceExplanation = async (serviceName: string, serviceDetails: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Using fallback text.");
    return "Experience the power of modern automation. Contact us for a live demo.";
  }

  try {
    const prompt = `
      You are an expert business efficiency consultant for service-based businesses.
      Write a compelling, punchy explanation (max 80 words) of how implementing "${serviceName}" specifically helps a business owner modernise their operations, save time, and increase revenue.
      
      Context: ${serviceDetails}
      
      Focus on the business outcome: "Imagine never missing a client call..." or "Picture your schedule filling up automatically...".
      Do not use markdown formatting. Keep it plain text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Contact us to learn more about this service.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Experience the power of modern automation. Contact us for a live demo.";
  }
};
