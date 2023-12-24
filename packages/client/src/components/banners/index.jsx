import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
function AutoScrollingBanner() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 1) % totalImages);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalImages = 3;

  return (
    <Grid style={{ width: "100%", overflow: "hidden" }}>
      <Grid
        style={{
          display: "flex",
          transition: "transform 0.5s",
          transform: `translateX(-${position * 100}%)`,
        }}
      >
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
      </Grid>
    </Grid>
  );
}

export default AutoScrollingBanner;
