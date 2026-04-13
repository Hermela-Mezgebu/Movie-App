export default function TrailerModal({ videoKey, onClose }) {
  if (!videoKey) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="w-[800px] h-[450px] relative">
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          allow="autoplay"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded"
        >
          X
        </button>
      </div>
    </div>
  );
}
