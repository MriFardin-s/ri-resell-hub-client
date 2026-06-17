export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-[#fefce8]/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center space-y-6 select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#facc15]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col items-center space-y-5">
        <h1 className="text-3xl font-black tracking-widest text-neutral-800 animate-pulse">
          RESELL<span className="text-neutral-950 bg-[#facc15] px-2 py-0.5 rounded ml-1.5 shadow-md shadow-yellow-500/10">HUB</span>
        </h1>
        
        <div className="w-32 h-1.5 bg-neutral-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-[#facc15] to-[#eab308] rounded-full animate-loading-bar"></div>
        </div>
      </div>

      <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest animate-pulse">
        Loading fresh experience...
      </p>
    </div>
  ); 
}