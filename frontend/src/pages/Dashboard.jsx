import { useEffect, useState } from "react";
import API from "../api/api";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order Management Dashboard</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customerName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.productName}</td>
              <td>₹{order.amount}</td>
              <td>{order.paymentStatus}</td>
              <td>{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;