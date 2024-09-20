import React from "react";
import { Head, useForm } from "@inertiajs/react";
import Normal from "@/Layouts/NormalLayout";

const Orders = ({ orders, user }) => {
    const { data, setData, post } = useForm({
        orders: orders || [], // Initialize orders with data from SSR
    });

    if (data.orders.length === 0) {
        return (
            <Normal user={user}>
                <Head title="My Orders"></Head>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                        My Orders
                    </h1>
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                        <p>No orders found.</p>
                    </div>
                </div>
            </Normal>
        );
    }

    return (
        <Normal user={user}>
            <Head title="My Orders"></Head>

            <div className="px-4 py-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    My Orders
                </h1>

                <div className="overflow-x-auto bg-white rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-300 overflow-clip rounded-md">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr className="bg-gray-200 text-left text-gray-600 font-semibold">
                                <th className="py-2 px-4">Car</th>
                                <th className="py-2 px-4">Customer Name</th>
                                <th className="py-2 px-4">Ordered At</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orders.map((order) => (
                                <tr className="border-b p-3" key={order.id}>
                                    <td className="py-2 px-4">
                                        {order.car.name}
                                    </td>
                                    <td className="py-2 px-4">
                                        {order.customer_name}
                                    </td>
                                    <td className="py-2 px-4">
                                        {new Date(
                                            order.ordered_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4">
                                        {order.status === "Pending" && (
                                            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm">
                                                Pending
                                            </span>
                                        )}
                                        {order.status === "Confirmed" && (
                                            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                                                Confirmed
                                            </span>
                                        )}
                                        {order.status === "Canceled" && (
                                            <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">
                                                Canceled
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Normal>
    );
};

export default Orders;
