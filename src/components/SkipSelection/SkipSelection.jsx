import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiAlertTriangle,
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

const SkipSelection = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const activeStepIndex = steps.indexOf("Select Skip");

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(response.data);
      } catch (error) {
        console.error("Failed to fetch skips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  return (
    <>
      <section className="min-h-screen bg-gray-950  text-white px-4 sm:px-6 lg:px-16 py-10 sm:py-16 pb-28">
        {/* Stepper */}
        <div className="max-w-7xl bg-gray-900 border rounded-2xl border-gray-800 p-3 mb-10 mx-auto space-y-10">
        {/* Stepper */}
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
                  {isCompleted ? (
                    <FiCheckCircle size={18} />
                  ) : (
                    stepIcons[step]
                  )}
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
        </div></div>
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Choose Your Skip Size
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Skip Cards */}
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading skips...</p>
        ) : (
          <div
            className={`grid relative  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-0 ${
              selectedSkipId ? "mb-10" : ""
            }`}
          >
            {skips.map((skip) => {
              const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`;
              const isSelected = selectedSkipId === skip.id;

              return (
                <div
                  key={skip.id}
                  onClick={
                    isSelected
                      ? () => setSelectedSkipId(null)
                      : () => setSelectedSkipId(skip.id)
                  }
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
                      className="border border-gray-700 shadow-md"
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
                    Hire period:{" "}
                    <span className="text-white">
                      {skip.hire_period_days} days
                    </span>
                  </p>

                  <p className="text-xl sm:text-2xl text-blue-400 font-extrabold mb-6 tracking-tight">
                    £{skip.price_before_vat}
                  </p>

                  <button
                    type="button"
                    className={`mt-auto w-full py-3 rounded-2xl font-semibold shadow-md transition-colors duration-300 text-base sm:text-lg
                      bg-gradient-to-r from-blue-600 via-blue-500
                       to-blue-700 text-white hover:from-blue-700 hover:via-blue-600 hover:to-blue-800
                      `}
                   
                    aria-pressed={isSelected}
                  >
                    {isSelected ? (
                      <>
                        <FiCheckCircle
                          className="inline mr-2 text-white"
                          size={18}
                        />
                        Selected
                      </>
                    ) : (
                      "Select This Skip"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom Bar */}
      {selectedSkipId && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 border-t border-gray-800 shadow-lg py-2 px-6 text-white text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3 gap-x-6 max-w-7xl mx-auto">
            {/* Notice Text */}
            <p className="text-gray-400 text-xs sm:text-sm leading-snug max-w-3xl">
              Imagery and information shown throughout this website may not
              reflect the exact shape or size specification. Colours may vary.
              Options and/or accessories may be featured at additional cost.
            </p>

            {/* Selected Skip Summary + Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 sm:ml-auto">
              <div className="text-white font-semibold whitespace-nowrap text-sm sm:text-base text-center sm:text-left">
                {(() => {
                  const selected = skips.find((s) => s.id === selectedSkipId);
                  return (
                    <>
                      {selected?.size} Yard Skip{" "}
                      <span className="text-blue-500 font-bold">
                        £{selected?.price_before_vat}
                      </span>{" "}
                      {selected?.hire_period_days} day hire
                    </>
                  );
                })()}
              </div>
              <div className="flex gap-2 sm:gap-4">
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm"
                  onClick={() => setSelectedSkipId(null)}
                >
                  Back
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all text-sm"
                  onClick={() =>
                    alert("Continue with skip ID: " + selectedSkipId)
                  }
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SkipSelection;
