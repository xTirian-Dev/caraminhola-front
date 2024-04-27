import React from "react";
import "./loading.css";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="loading-container">
      <p>{message || "Loading..."}</p>
      <div className="loading"></div>
    </div>
  );
};

export default Loading;
