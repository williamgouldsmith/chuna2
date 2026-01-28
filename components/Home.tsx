import React, { useState } from 'react';
import Hero from './Hero';
import Services from './Services';
import Process from './Process';
import Booking from './Booking';
import ServiceModal from './ServiceModal';
import { ServiceItem } from '../types';

const Home: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenModal = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <Hero />
      <Services onServiceClick={handleOpenModal} />
      <Process />
      <Booking />
      
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default Home;