
import React, { useState, useEffect } from 'react';
import { LoaderIcon } from './icons';

const scanSteps = [
  "Initializing scanner...",
  "Connecting to OTX threat intelligence...",
  "Fetching latest IOC signatures...",
  "Scanning running processes...",
  "Analyzing system files...",
  "Checking network connections...",
  "Scanning browser cache...",
  "Finalizing report...",
];

const Scanner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % scanSteps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
      <LoaderIcon className="w-16 h-16 text-blue-500 animate-spin" />
      <h2 className="mt-6 text-2xl font-semibold text-slate-200">Scanning Endpoint</h2>
      <p className="mt-2 text-slate-400 transition-opacity duration-500 ease-in-out">
        {scanSteps[currentStep]}
      </p>
    </div>
  );
};

export default Scanner;
