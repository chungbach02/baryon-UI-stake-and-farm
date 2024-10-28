import React from 'react';
import { ToastContainer as ToastifyContainer, Bounce } from 'react-toastify';

export const ToastContainer = () => {
  return (
    <ToastifyContainer
      transition={Bounce}
      pauseOnHover
      closeOnClick
      className="z-50"
      position="bottom-right"
      closeButton={false}
    />
  );
};
