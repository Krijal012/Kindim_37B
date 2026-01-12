import qrImg from "../assets/icons/qr.png";

export default function PaymentMethod() {
  return (
    <div>
      <h3 className="font-bold mb-4">Payment Method</h3>

      <div className="flex gap-4">
        <div className="w-36 h-36 border-2 border-black rounded-xl flex flex-col items-center justify-center cursor-pointer">
          <img src={qrImg} alt="QR" className="w-20 h-20 mb-2" />
          <p className="text-sm font-medium">QR Payment</p>
        </div>

        <div className="w-36 h-36 border-2 border-black rounded-xl flex items-center justify-center cursor-pointer">
          <p className="text-sm font-medium">Direct Cash</p>
        </div>
      </div>
    </div>
  );
}

