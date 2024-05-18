import React, { useState, useEffect } from 'react';

const Loading = ({ isLoading = false }) => {
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    let animationInterval;
    if (isLoading) {
      animationInterval = setInterval(() => {
        setSpin((prevSpin) => (prevSpin + 1) % 360);
      }, 1000);
    } else {
      clearInterval(animationInterval);
    }
    return () => clearInterval(animationInterval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex items-center justify-center overflow-hidden">
      <div className="bg-primary bg-opacity-80 rounded-full w-20 h-20 flex items-center justify-center">
        <div
          className="w-13 h-13 text-center text-base-light font-bold"
          style={{ transform: `rotate(${spin}deg)` }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
