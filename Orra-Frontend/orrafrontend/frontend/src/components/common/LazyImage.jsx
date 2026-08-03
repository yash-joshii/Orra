import React, { useState } from 'react'

const LazyImage = ({ src, alt, className }) => {

    const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-xl" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default LazyImage