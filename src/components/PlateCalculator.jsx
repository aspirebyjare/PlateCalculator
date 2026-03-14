import { useState } from "react";

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

  const kgToLb = (kg) => kg * 2.20462;
  const lbToKg = (lb) => lb / 2.20462;

  const barLb = bar.unit === "kg" ? kgToLb(bar.weight) : bar.weight;

  const platesLb = plates.reduce((s, p) => {
    const weightLb = p.unit === "kg" ? kgToLb(p.weight) : p.weight;
    return s + weightLb * 2;
  }, 0);

  const total = Math.round((barLb + platesLb) * 100) / 100;

  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-4">

        {/* Display */}
        <div className="bg-base-200 rounded-box p-4">
          <div className="text-xs opacity-60 text-right">Bar {bar.weight} {bar.unit}</div>

          <div className="text-3xl font-bold tracking-tight text-right">
            {displayUnit === "lb"
              ? `${total} lb`
              : `${Math.round(lbToKg(total) * 100) / 100} kg`}
          </div>

          {/* Result Unit Toggle */}
          <div className="flex justify-end mt-2">
            <div className="join">
              <button
                className={`btn btn-xs join-item ${displayUnit === "lb" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setDisplayUnit("lb")}
              >
                LB
              </button>
              <button
                className={`btn btn-xs join-item ${displayUnit === "kg" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setDisplayUnit("kg")}
              >
                KG
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button className="btn btn-sm btn-ghost" onClick={clear}>
            Clear
          </button>
        </div>

        {/* Bar Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs opacity-60">Bar</div>
            <div className="join">
              <button
                className={`btn btn-xs join-item ${barUnit === "lb" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setBarUnit("lb")}
              >
                LB
              </button>
              <button
                className={`btn btn-xs join-item ${barUnit === "kg" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setBarUnit("kg")}
              >
                KG
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {barSet.map((w) => (
              <button
                key={w}
                className={`btn btn-sm ${bar.weight === w && bar.unit === barUnit ? "btn-secondary" : "btn-outline"}`}
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
            <div className="text-xs opacity-60">Plates (per side)</div>
            <div className="join">
              <button
                className={`btn btn-xs join-item ${plateUnit === "lb" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setPlateUnit("lb")}
              >
                LB
              </button>
              <button
                className={`btn btn-xs join-item ${plateUnit === "kg" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setPlateUnit("kg")}
              >
                KG
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {plateSet.map((p) => (
              <button
                key={p}
                className="btn btn-outline"
                onClick={() => addPlate(p)}
              >
                {p} {plateUnit}
              </button>
            ))}
          </div>
        </div>

        {/* Plate Visualization */}
        <div className="mt-4 flex flex-col items-center gap-2">

          {/* Bar Label */}
          <div className="text-xs opacity-60">
            {bar.weight} {bar.unit}
          </div>

          <div className="flex justify-center items-center gap-2">

            {/* Left Side Plates */}
            <div className="flex items-center gap-1">
              {[...plates].reverse().map((p, i) => (
                <div key={`L-${i}`} className="badge badge-outline">
                  {p.weight} {p.unit}
                </div>
              ))}
            </div>

            {/* Bar */}
            <div className="w-16 h-1 bg-base-content opacity-40 rounded" />

            {/* Right Side Plates */}
            <div className="flex items-center gap-1">
              {plates.map((p, i) => (
                <div key={`R-${i}`} className="badge badge-outline">
                  {p.weight} {p.unit}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}