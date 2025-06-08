
import React from "react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`;

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer flex flex-col rounded-3xl p-3 shadow-sm transition-shadow duration-300
        bg-gray-900 bg-opacity-30 backdrop-blur-md
        border-2 ${
          isSelected
            ? "border-blue-500 shadow-blue-600 shadow-lg"
            : "border-transparent hover:border-blue-500 hover:shadow-blue-600 hover:shadow-lg"
        }`}
      tabIndex={0}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-600 rounded-full p-1 z-20 shadow-md">
          <FiCheckCircle size={14} className="text-white" />
        </div>
      )}

      <div className="relative w-full mb-5 p-2 border rounded-2xl shadow-md border-gray-700">
        <img
          src={imageUrl}
          alt={`${skip.size} Yard Skip`}
          className="border border-gray-700 h-44 w-full shadow-md"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x160?text=No+Image";
          }}
        />
        {!skip.allowed_on_road && (
          <span className="absolute top-0 left-0 rounded-tl-2xl text-xs sm:text-sm bg-red-700 px-3 py-[2px] font-semibold shadow whitespace-nowrap flex items-center gap-1 z-10">
            <FiAlertTriangle className="text-white" size={12} />
            Off-road only
          </span>
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-semibold tracking-wide truncate mb-2">
        {skip.size} Yard Skip
      </h3>

      <p className="text-gray-400 mb-3 tracking-wide text-sm sm:text-base">
        Hire period: <span className="text-white">{skip.hire_period_days} days</span>
      </p>

      <p className="text-xl sm:text-2xl text-blue-400 font-extrabold mb-6 tracking-tight">
        £{skip.price_before_vat}
      </p>

      <button
        type="button"
        className={`mt-auto w-full py-3 rounded-2xl font-semibold shadow-md transition-colors duration-300 text-base sm:text-lg
          bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white hover:from-blue-700 hover:via-blue-600 hover:to-blue-800`}
        aria-pressed={isSelected}
      >
        {isSelected ? (
          <>
            <FiCheckCircle className="inline mr-2 text-white" size={18} />
            Selected
          </>
        ) : (
          "Select This Skip"
        )}
      </button>
    </div>
  );
};

export default SkipCard;