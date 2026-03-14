import PlateCalculator from "../components/PlateCalculator";
import "../styles/glass.css";

export default function HomePage() {
  return (
    <div className="glass-page min-h-screen bg-base-200">
      <div className="mx-auto max-w-4xl px-6 py-8 md:px-8 md:py-10">


        <div className="mt-6 md:mt-8">
          <PlateCalculator />
        </div>
        <div className="glass-panel rounded-[2rem] p-6 md:p-8 mt-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Plate Calculator
            </h1>

            <p className="mt-3 max-w-2xl mx-auto text-base text-base-content/70 md:text-lg">
                Designed by Jared Smith
            </p>
        </div>
      </div>
    </div>
  );
}