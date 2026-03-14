import { useState } from "react";
import BarbellVisualization from "./BarbellVisualization";
import Toggle from "./Toggle";
import "../styles/glass.css";

export default function PlateCalculator() {
  const [barUnit, setBarUnit] = useState("lb");
  const [plateUnit, setPlateUnit] = useState("lb");
  const [displayUnit, setDisplayUnit] = useState("lb");
  const [bar, setBar] = useState({ weight: 45, unit: "lb" });
  const [plates, setPlates] = useState([]);

  const lbPlates = [55, 45, 35, 25, 10, 5, 2.5];
  const kgPlates = [25, 20, 15, 10, 5, 2.5, 1.25];

  const lbBars = [45, 35];
  const kgBars = [20, 15, 10];

  const plateSet = plateUnit === "lb" ? lbPlates : kgPlates;
  const barSet = barUnit === "lb" ? lbBars : kgBars;

  const addPlate = (weight) => {
    setPlates((p) => [...p, { weight, unit: plateUnit }]);
  };

  const clear = () => setPlates([]);

  const removePlateAtIndex = (indexToRemove) => {
    setPlates((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const kgToLb = (kg) => kg * 2.20462;
  const lbToKg = (lb) => lb / 2.20462;

  const barLb = bar.unit === "kg" ? kgToLb(bar.weight) : bar.weight;

  const platesLb = plates.reduce((s, p) => {
    const weightLb = p.unit === "kg" ? kgToLb(p.weight) : p.weight;
    return s + weightLb * 2;
  }, 0);

  const total = Math.round((barLb + platesLb) * 100) / 100;

  return (
    <div className="glass-panel card rounded-[2rem] border-0 bg-base-100/40 shadow-none">
      <div className="card-body p-5 md:p-6">

        {/* Display */}
        <div className="glass-subpanel rounded-[1.5rem] p-5 md:p-6">
          <div className="glass-label text-[11px] text-right">Bar {bar.weight} {bar.unit}</div>

          <div className="mt-1 text-4xl font-bold tracking-tight text-right md:text-5xl">
            {displayUnit === "lb"
              ? `${total} lb`
              : `${Math.round(lbToKg(total) * 100) / 100} kg`}
          </div>

          {/* Result Unit Toggle */}
          <div className="flex justify-end mt-2">
            <Toggle
              options={["lb", "kg"]}
              value={displayUnit}
              onChange={setDisplayUnit}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <button
            className="glass-pill btn btn-sm border-0 bg-transparent shadow-none text-white/90"
            onClick={clear}
            disabled={plates.length === 0}
          >
            Clear
          </button>
        </div>

        {/* Bar Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <div className="glass-label text-xs font-semibold tracking-wide text-base-content/80">Bar</div>
            <Toggle
              options={["lb", "kg"]}
              value={barUnit}
              onChange={setBarUnit}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {barSet.map((w) => (
              <button
                key={w}
                className={`glass-pill btn btn-sm border shadow-none transition-all ${
                  bar.weight === w && bar.unit === barUnit
                    ? "border-white/40 bg-white/10 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:bg-white/10"
                    : "border-transparent"
                }`}
                onClick={() => setBar({ weight: w, unit: barUnit })}
              >
                {w} {barUnit}
              </button>
            ))}
          </div>
        </div>

        {/* Plates Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <div className="glass-label text-xs font-semibold tracking-wide text-base-content/80">Plates (per side)</div>
            <Toggle
              options={["lb", "kg"]}
              value={plateUnit} 
              onChange={setPlateUnit}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {plateSet.map((p) => (
              <button
                key={p}
                className="glass-token btn border-0 bg-transparent shadow-none w-20 h-20 rounded-full flex items-center justify-center text-sm font-semibold"
                onClick={() => addPlate(p)}
              >
                {p} {plateUnit}
              </button>
            ))}
          </div>
        </div>

        <BarbellVisualization
          bar={bar}
          plates={plates}
          onRemovePlate={removePlateAtIndex}
        />

      </div>
    </div>
  );
}