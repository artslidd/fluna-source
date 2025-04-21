import React from "react";
import icon from "../assets/logo.png"; // Import the image

// Define props type (adjust if needed)
interface CustomLoadingOverlayProps {
  loadingMessage?: string;
}

export const CustomLoadingOverlay: React.FC<CustomLoadingOverlayProps> = ({
  loadingMessage = "Loading...",
}) => {
  return (
    <div className="ag-overlay-loading-center" role="presentation">
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Arrange icon and text vertically
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Use the imported image */}
        <img
          src={icon}
          alt="Loading icon"
          className="animate-spin h-10 w-10" // Apply spin animation and size
        />
        {/* Display the loading message passed via props */}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {loadingMessage}
        </p>
      </div>
    </div>
  );
};
