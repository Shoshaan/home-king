import { DashboardLayout } from "../components/DashboardLayout";
import { Table, Badge } from "react-bootstrap";

export function OrdersPage() {
  const orders = [
    {
      id: 1,
      customer: "Ahmed",
      total: 300,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Ali",
      total: 500,
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "Pending") return "warning";
    if (status === "Completed") return "success";
    return "secondary";
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4">Orders</h2>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>

              <td>
                <Badge bg={getStatusColor(order.status)}>{order.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardLayout>
  );
}
