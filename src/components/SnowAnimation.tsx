import { useEffect, useRef } from 'react';

const SnowAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.width = `${Math.random() * 3 + 1}px`;
      snowflake.style.height = snowflake.style.width;
      snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
      snowflake.style.animationDelay = `-${Math.random() * 10}s`;
      container.appendChild(snowflake);
    };

    const generateSnowflakes = () => {
      // Clear existing snowflakes
      container.innerHTML = '';
      
      // Generate new snowflakes
      for (let i = 0; i < 50; i++) {
        createSnowflake();
      }
    };

    generateSnowflakes();

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default SnowAnimation;