

export default function PendingOverlay({ isPending }) {
  if (!isPending) return null;

  return (
    <div className="absolute inset-0 bg-[#fefce8]/60 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-xl transition-all duration-200">
    
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-3 border-[#facc15] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider animate-pulse">
          Updating...
        </p>
      </div>
    </div>
  );
}