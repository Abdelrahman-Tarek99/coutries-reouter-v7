import { useEffect, useState } from "react";

export const useHome = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl =
    "https://image.winudf.com/v2/image/Ymx1ZWNhcC5pbWFnZXouYmVhdXRpZnVsX2NvdW50cmllc193YWxscGFwZXJzX3NjcmVlbl8wXzlpMW14OWl1/screen-0.webp?fakeurl=1&type=.webp";

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Create a promise that resolves when the image loads
        const imageLoadPromise = new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageUrl;
        });

        // Wait for the image to load
        await imageLoadPromise;

        // If we get here, the image loaded successfully
        setImageLoaded(true);
      } catch (error) {
        console.error("Failed to load image:", error);
        // Show the image anyway if loading fails
        setImageLoaded(true);
      }
    };

    loadImage();
  }, [imageUrl]);

  return {
    imageLoaded,
    imageUrl,
  };
};
