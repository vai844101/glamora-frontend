import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../redux/features/orders/orderApi";
import TimelineStep from "../../../components/TimelineStep";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { data, error, isLoading } = useGetOrderByIdQuery(orderId);
  const order = data?.order; // Extract the nested order object

  // Debugging Logs
  //console.log("Order ID:", orderId);
  //console.log("Fetched Order Data:", data);
  //console.log("Error:", error);
  //console.log("Loading:", isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (error || !order) return <div>No Orders Found!</div>;

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: {
        iconName: "time-line",
        bgColor: "bg-red-500",
        textColor: "text-gray-800",
      },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: {
        iconName: "loader-line",
        bgColor: "bg-yellow-800",
        textColor: "text-yellow-800",
      },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: {
        iconName: "truck-line",
        bgColor: "bg-blue-800",
        textColor: "text-blue-800",
      },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: {
        iconName: "check-line",
        bgColor: "bg-green-800",
        textColor: "text-green-900",
      },
    },
  ];

  return (
    <section className="section__container rounded p-6">
      {/* Render Order Details */}
      <h2 className="text-2xl font-semibold mb-4 text-violet-500">Order Details</h2>
      <p className="mb-4">
        <strong>Order ID:</strong> {order?.orderId || "N/A"}
      </p>
      <p className="mb-8">
        <strong>Status:</strong> {order?.status || "Unknown"}
      </p>

      {/* Render Timeline */}
      <ol className="sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>
    </section>
  );
};

export default OrderDetails;
