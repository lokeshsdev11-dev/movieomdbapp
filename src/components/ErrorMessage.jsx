import React from 'react';

/**
 * Error Message Component
 * Displays user-friendly error messages
 * @param {string} message - Error message to display
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center max-w-2xl mx-auto">
      <p className="font-semibold">Error</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

