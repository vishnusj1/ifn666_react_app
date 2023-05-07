import React, { useState, useEffect } from 'react';
import "./Loader.css"
const Loader = ()=> {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loader">
      <span className={`dot ${dotCount >= 1 ? 'active' : ''}`}></span>
      <span className={`dot ${dotCount >= 2 ? 'active' : ''}`}></span>
      <span className={`dot ${dotCount >= 3 ? 'active' : ''}`}></span>
    </div>
  );
}

export default Loader;