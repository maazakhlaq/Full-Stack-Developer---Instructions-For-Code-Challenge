
// Stepper.jsx
import React from "react";
import {
  FiCheckCircle,
  FiMapPin,
  FiTrash2,
  FiTruck,
  FiCheckSquare,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";

const steps = [
  "Postcode",
  "Waste Type",
  "Select Skip",
  "Permit Check",
  "Choose Date",
  "Payment",
];

const stepIcons = {
  Postcode: <FiMapPin size={16} className="mr-1" />,
  "Waste Type": <FiTrash2 size={16} className="mr-1" />,
  "Select Skip": <FiTruck size={16} className="mr-1" />,
  "Permit Check": <FiCheckSquare size={16} className="mr-1" />,
  "Choose Date": <FiCalendar size={16} className="mr-1" />,
  Payment: <FiCreditCard size={16} className="mr-1" />,
};

const Stepper = ({ activeStep }) => {
  const activeStepIndex = steps.indexOf(activeStep);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {steps.map((step, i) => {
        const isActive = i === activeStepIndex;
        const isCompleted = i < activeStepIndex;

        return (
          <div key={i} className="flex items-center space-x-2">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : isCompleted
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {isCompleted ? <FiCheckCircle size={18} /> : stepIcons[step]}
            </div>
            <span
              className={`text-sm font-medium ${
                isActive
                  ? "text-white"
                  : isCompleted
                  ? "text-green-300"
                  : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
