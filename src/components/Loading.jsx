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
    <div className="absolute z-10 bg-opacity-60 bg-black w-full h-full flex items-center justify-center">
      <div className="bg-primary bg-opacity-80 rounded-full w-20 h-20 flex items-center justify-center">
        <div
          className="w-13 h-13 text-center"
          style={{ transform: `rotate(${spin}deg)` }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
