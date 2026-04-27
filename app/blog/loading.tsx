export default function BlogLoading() {
  return (
    <div className="bg-surface-ground min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="h-12 bg-surface-section rounded-lg w-56 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-surface-section rounded-lg w-80 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-surface-section">
              <div className="h-44 bg-surface-section animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-surface-section rounded w-24 animate-pulse"></div>
                <div className="h-6 bg-surface-section rounded w-full animate-pulse"></div>
                <div className="h-4 bg-surface-section rounded w-full animate-pulse"></div>
                <div className="h-4 bg-surface-section rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
