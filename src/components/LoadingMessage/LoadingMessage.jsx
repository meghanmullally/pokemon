import React from "react";
import { CircularProgress } from '@mui/material';
import './LoadingMessage.css';

const LoadingMessage = () => {
  return (
    <div className="loadingContainer">
      <CircularProgress color="primary" variant="indeterminate" size={150} thickness={3} className="loadingCircle"/>
    </div>
  );
};

export default LoadingMessage;