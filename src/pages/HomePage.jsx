import PlateCalculator from "../components/PlateCalculator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-3xl p-6 md:p-8">
        <h1 className="text-4xl font-bold tracking-tight">Plate Calculator</h1>
        <p className="mt-2 text-base-content/70">
          Build a barbell with mixed lb and kg plates.
        </p>

        <div className="mt-4">
          <PlateCalculator />
        </div>
      </div>
    </div>
  );
}