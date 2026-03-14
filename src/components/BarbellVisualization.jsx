export default function BarbellVisualization({ bar, plates, onRemovePlate }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">

      {/* Bar Label */}
      <div className="text-sm font-medium uppercase tracking-[0.12em] text-base-content/80">
        {bar.weight} {bar.unit} bar
      </div>

      <div className="w-full flex items-center justify-start gap-3">

        {/* Bar */}
        <div className="flex items-center shrink-0">
          {/* Short Shaft (inside sleeve) */}
          <div className="h-[6px] w-6 rounded-full bg-gradient-to-r from-base-content/40 via-base-content/70 to-base-content/40" />

          {/* Collar */}
          <div className="ml-1 h-4 w-[4px] rounded-sm bg-base-content/80" />

          {/* Main Shaft */}
          <div className="ml-1 h-[6px] w-14 rounded-full bg-gradient-to-r from-base-content/40 via-base-content/70 to-base-content/40" />
        </div>

        {/* Right Plates */}
        <div className="flex flex-wrap items-center justify-start gap-2">
          {plates.map((p, i) => (
            <button
              key={`R-${i}`}
              type="button"
              className="badge badge-outline border-white/25 bg-base-100/70 px-3 py-3 text-xs font-semibold text-base-content shadow-sm cursor-pointer transition hover:scale-105 active:scale-95"
              onClick={() => onRemovePlate && onRemovePlate(i)}
            >
              {p.weight} {p.unit}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}