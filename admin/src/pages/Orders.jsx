import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-center">Order Page</h3>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-4 p-6 border border-gray-300 rounded-lg shadow-md"
        >
          <div className="flex flex-col items-center w-full md:w-1/6">
            <img src={assets.parcel_icon} alt="Parcel" className="w-16 h-16" />
          </div>

          <div className="flex flex-col space-y-2 w-full md:w-2/5">
            <div className="font-medium text-gray-800 text-lg">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm">
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>
            <div className="font-medium text-gray-600 text-sm">
              <p className="font-semibold">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-2 w-full md:w-1/4">
            <p className="text-sm font-semibold text-gray-600">
              Items: {order.items.length}
            </p>
            <p className="text-sm text-gray-600">
              Method: {order.paymentMethod}
            </p>
            <p className="text-sm text-gray-600">
              Payment: {order.payment === true ? "Done" : "Pending"}
            </p>
            <p className="text-sm text-gray-600">
              Date: {new Date(order.date).toLocaleDateString()}
            </p>
          </div>

          <div className=" py-2 flex flex-col items-center w-full md:w-1/6">
            <p className="text-xl font-semibold text-green-600">
              {currency}
              {order.amount}
            </p>
          </div>

          <div className="flex flex-col items-center w-full md:w-1/6">
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="py-2 text-md border border-gray-300 rounded-md"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
