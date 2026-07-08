export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white">
      <div className="w-8 h-8 border-[3px] border-teal-100 border-t-teal-600 rounded-full animate-spin" />

      <div className="text-[13.5px] font-medium text-gray-500">Loading...</div>
    </div>
  );
}
