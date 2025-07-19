export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <div className="relative">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <div className="animate-reverse absolute inset-0 mx-auto h-16 w-16 animate-spin rounded-full border-4 border-transparent border-r-purple-600"></div>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-700">
          Loading Archana Groups
        </h2>
        <p className="text-gray-500">Preparing your sustainable solutions...</p>
      </div>
    </div>
  );
}
