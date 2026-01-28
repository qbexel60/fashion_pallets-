export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14 font-sans">
      <div className="animate-pulse space-y-5">
        <div className="h-9 w-56 rounded-lg bg-white/10" />
        <div className="h-12 w-full rounded-xl bg-white/10" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-44 sm:h-52 rounded-2xl bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

