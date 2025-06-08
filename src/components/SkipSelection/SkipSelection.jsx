// SkipSelection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stepper from "./Stepper";
import SkipCard from "./SkipCard";
import BottomBar from "./BottomBar";

const SkipSelection = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

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
  <section className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 lg:px-16 py-10 sm:py-16 pb-28">
    <div
      className="max-w-7xl bg-gray-900 border rounded-2xl border-gray-800 p-3 mb-10 mx-auto space-y-10
                 sm:static sticky top-0 z-50"
    >
      <Stepper activeStep="Select Skip" />
    </div>

    <div className="text-center max-w-3xl mx-auto mb-12 px-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
        Choose Your Skip Size
      </h2>
      <p className="text-gray-400 mt-2 text-sm sm:text-base">
        Select the skip size that best suits your needs
      </p>
    </div>

    {loading ? (
      <p className="text-center text-gray-400 text-lg">Loading skips...</p>
    ) : (
      <div
        className={`grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-0 ${
          selectedSkipId ? "mb-10" : ""
        }`}
      >
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkipId === skip.id}
            onSelect={() =>
              setSelectedSkipId(selectedSkipId === skip.id ? null : skip.id)
            }
          />
        ))}
      </div>
    )}
  </section>

  {selectedSkipId && (
    <BottomBar
      selectedSkip={skips.find((s) => s.id === selectedSkipId)}
      onBack={() => setSelectedSkipId(null)}
      onContinue={() => alert("Continue with skip ID: " + selectedSkipId)}
    />
  )}
</>

  );
};

export default SkipSelection;




