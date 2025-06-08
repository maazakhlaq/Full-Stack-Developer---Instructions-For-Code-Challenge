

// BottomBar.jsx
import React from "react";

const BottomBar = ({ selectedSkip, onBack, onContinue }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 border-t border-gray-800 shadow-lg py-2 px-6 text-white text-sm sm:text-base">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3 gap-x-6 max-w-7xl mx-auto">
        <p className="text-gray-400 text-xs sm:text-sm leading-snug max-w-3xl">
          Imagery and information shown throughout this website may not reflect the exact shape or size specification. Colours may vary. Options and/or accessories may be featured at additional cost.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 sm:ml-auto">
          <div className="text-white font-semibold whitespace-nowrap text-sm sm:text-base text-center sm:text-left">
            {selectedSkip.size} Yard Skip <span className="text-blue-500 font-bold">£{selectedSkip.price_before_vat}</span> {selectedSkip.hire_period_days} day hire
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm"
              onClick={onBack}
            >
              Back
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all text-sm"
              onClick={onContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
