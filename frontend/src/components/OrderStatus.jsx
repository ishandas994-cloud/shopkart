import { getOrderStatusColor } from "../utils/helpers";

const steps = ["Processing", "Confirmed", "Shipped", "Delivered"];

const OrderStatus = ({ status }) => {
  const currentStep = steps.indexOf(status);

  return (
    <div>
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(status)}`}>
        {status}
      </span>
      {status !== "Cancelled" && (
        <div className="mt-4 flex items-center gap-0">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  i <= currentStep
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}>
                  {i < currentStep ? "✓" : i + 1}
                </div>
                <span className="text-xs mt-1 text-gray-500 whitespace-nowrap">{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 mb-5 ${i < currentStep ? "bg-orange-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;