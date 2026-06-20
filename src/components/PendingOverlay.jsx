export default function PendingOverlay({ isPending }) {
  if (!isPending) return null;

  return (
    <div className="absolute inset-0 bg-amber-50/60 dark:bg-neutral-950/70 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-xl transition-all duration-200">
      
      <div className="flex flex-col items-center space-y-2">
        {/* Theme Primary Yellow Spinner */}
        <div className="w-8 h-8 border-3 border-theme-yellow-primary border-t-transparent rounded-full animate-spin"></div>
        
        {/* Adaptive Pulse Text */}
        <p className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}