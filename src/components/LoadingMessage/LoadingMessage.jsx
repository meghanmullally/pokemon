import React from "react";
import { CircularProgress } from '@mui/material';


const LoadingMessage = () => {
  return (
    <>
       <CircularProgress color="primary" variant="indeterminate" />
    </>
  );
};

export default LoadingMessage;