export function ProductDisplay({ productName, originalPrice, image }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-lg">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded flex-shrink-0">
        {image && <img src={image} alt={productName} className="w-full h-full object-cover rounded" />}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base sm:text-lg truncate">{productName}</h3>
        <p className="text-gray-600 text-xs sm:text-sm">Original Price: {originalPrice}</p>
      </div>
    </div>
  );
}