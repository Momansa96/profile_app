"use client"
import React, { useEffect } from 'react';
const Loading = () => {
    useEffect(() => {
        // Simule un délai de chargement de 2 secondes
        const timer = setTimeout(() => {
          // Ce code sera exécuté après le délai
        }, 3000);
    
        // Nettoie le timer si le composant est démonté avant la fin du délai
        return () => clearTimeout(timer);
      }, []);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#f0f0f0' 
    }}>
      <p className='text-2xl'>Chargement en cours...</p>
    </div>
  );
};

export default Loading;
