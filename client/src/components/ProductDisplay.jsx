export function ProductDisplay({ productName, originalPrice, image }) {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
      <div className="w-20 h-20 bg-gray-300 rounded flex-shrink-0">
        {image && <img src={image} alt={productName} className="w-full h-full object-cover rounded" />}
      </div>
      <div>
        <h3 className="font-bold text-lg">{productName}</h3>
        <p className="text-gray-600 text-sm">Original Price: {originalPrice}</p>
      </div>
    </div>
  );
}