import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 mb-4"></div>
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;