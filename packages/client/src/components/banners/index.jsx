import React, { useState, useEffect } from "react";

function AutoScrollingBanner() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % totalImages);
    }, 3000); // Change the duration (in milliseconds) to adjust the scrolling speed

    return () => clearInterval(interval);
  }, []);

  const totalImages = 3; // Replace with the total number of images in your banner

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s",
          transform: `translateX(-${position * 100}%)`, // Assuming each image takes 100% of the container width
        }}
      >
        {/* Add your banner images here */}
        <img
          src="/public/image/ms_banner_img1.webp"
          alt="Image 1"
          style={{ width: "100%", flexShrink: 0 }}
        />
        <img
          src="/public/image/ms_banner_img2.webp"
          alt="Image 2"
          style={{ width: "100%", flexShrink: 0 }}
        />
        <img
          src="/public/image/ms_banner_img3.webp"
          alt="Image 3"
          style={{ width: "100%", flexShrink: 0 }}
        />
      </div>
    </div>
  );
}

export default AutoScrollingBanner;
