import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {isLoading && (
        <div className="fixed top-0 left-0 z-[9999] w-full h-full flex items-center justify-center bg-[#180102] bg-opacity-70">
          <div className="spinner" />
          {/* Replace with your spinner or use a library like react-loader-spinner */}
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
