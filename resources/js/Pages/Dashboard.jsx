import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCar,
    faCartArrowDown,
    faDollarSign,
    faClipboardList,
    faCheckCircle,
    faTimesCircle,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({
    cars,
    orders,
    isAdmin,
    totalCars,
    unsoldCars,
    totalOrders,
    totalEarnings,
    statusCounts,
}) {
    // Sample chart data for demo purposes
    const data = {
        labels: ["Pending", "Confirmed", "Canceled"],
        datasets: [
            {
                label: "Order Statuses",
                data: [
                    statusCounts.Pending,
                    statusCounts.Confirmed,
                    statusCounts.Canceled,
                ],
                backgroundColor: ["#FBBF24", "#10B981", "#EF4444"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Order Status Overview",
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-lg rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-2">
                                Welcome Back!
                            </h3>
                            <p>
                                You're logged in and ready to manage the
                                platform.
                            </p>
                        </div>

                        {isAdmin && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white">
                                <div className="p-6 bg-blue-100 rounded-lg shadow-md flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faCar}
                                        className="text-blue-500 text-3xl"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">
                                            Total Cars
                                        </h4>
                                        <p className="text-2xl font-bold text-blue-700">
                                            {totalCars}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 bg-yellow-100 rounded-lg shadow-md flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faCartArrowDown}
                                        className="text-yellow-500 text-3xl"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">
                                            Unsold Cars
                                        </h4>
                                        <p className="text-2xl font-bold text-yellow-700">
                                            {unsoldCars}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 bg-green-100 rounded-lg shadow-md flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faClipboardList}
                                        className="text-green-500 text-3xl"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">
                                            Total Orders
                                        </h4>
                                        <p className="text-2xl font-bold text-green-700">
                                            {totalOrders}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 bg-indigo-100 rounded-lg shadow-md flex items-center space-x-4">
                                    <FontAwesomeIcon
                                        icon={faDollarSign}
                                        className="text-indigo-500 text-3xl"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">
                                            Total Earnings
                                        </h4>
                                        <p className="text-2xl font-bold text-indigo-700">
                                            ${totalEarnings}
                                        </p>
                                    </div>
                                </div>

                                <div className="md:col-span-2 lg:col-span-4 bg-gray-50 p-6 rounded-lg mt-6">
                                    <h4 className="text-md font-semibold text-gray-700 mb-4">
                                        Order Statuses
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="p-4 bg-yellow-50 rounded-lg shadow flex items-center space-x-4">
                                            <FontAwesomeIcon
                                                icon={faClock}
                                                className="text-yellow-600 text-2xl"
                                            />
                                            <div>
                                                <p className="text-lg font-semibold text-yellow-700">
                                                    Pending
                                                </p>
                                                <p className="text-xl font-bold">
                                                    {statusCounts.Pending}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-lg shadow flex items-center space-x-4">
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="text-green-600 text-2xl"
                                            />
                                            <div>
                                                <p className="text-lg font-semibold text-green-700">
                                                    Confirmed
                                                </p>
                                                <p className="text-xl font-bold">
                                                    {statusCounts.Confirmed}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-red-50 rounded-lg shadow flex items-center space-x-4">
                                            <FontAwesomeIcon
                                                icon={faTimesCircle}
                                                className="text-red-600 text-2xl"
                                            />
                                            <div>
                                                <p className="text-lg font-semibold text-red-700">
                                                    Canceled
                                                </p>
                                                <p className="text-xl font-bold">
                                                    {statusCounts.Canceled}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Section */}
                                <div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-lg mt-6 shadow">
                                    <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                        Order Status Chart
                                    </h4>
                                    <Bar data={data} options={options} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
