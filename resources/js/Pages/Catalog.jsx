import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCar,
    faCalendar,
    faDollarSign,
    faBox,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Normal from "@/Layouts/NormalLayout";

const Catalog = ({ user }) => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("");
    const [brands] = useState([
        "Audi",
        "Toyota",
        "Honda",
        "Mitsubishi",
        "Ferrari",
        "Volkswagen",
        "Hyundai",
        "Lamborghini",
        "Aston Martin",
        "Omoda",
        "Maserati",
    ]);

    useEffect(() => {
        fetchCars();
    }, [search, brand]);

    const fetchCars = async () => {
        try {
            const response = await axios.get("/api/catalog", {
                params: { search, brand },
            });
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    return (
        <Normal user={user}>
            <Head title="Catalog" />

            <div className="p-8 mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div className="w-full relative">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute right-3 bottom-0 top-0 my-auto"
                        ></FontAwesomeIcon>
                        <input
                            type="text"
                            placeholder="Search by name or brand"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 bg-white rounded-md p-2  w-full flex-1"
                        />
                    </div>
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 ml-4 bg-white"
                    >
                        <option value="">All Brands</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
                    {cars.length === 0 ? (
                        <p className="text-center">No cars found.</p>
                    ) : (
                        cars.map((car) => (
                            <div
                                key={car.id}
                                className="border border-gray-300 rounded-lg shadow-lg p-4"
                            >
                                <img
                                    src={car.image_url}
                                    alt={car.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-xl font-bold">
                                    {car.name}
                                </h2>
                                <p className="text-gray-600 mb-2 flex items-center text-lg">
                                    <FontAwesomeIcon
                                        icon={faDollarSign}
                                        className="mr-2"
                                    />
                                    {car.price}
                                </p>
                                <p className="text-gray-600 mb-2 flex items-center text-sm">
                                    <FontAwesomeIcon
                                        icon={faCar}
                                        className="mr-2"
                                    />{" "}
                                    {car.brand}
                                </p>
                                <p className="text-gray-600 mb-2 flex items-center text-sm">
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        className="mr-2"
                                    />{" "}
                                    {car.production_year}
                                </p>

                                <p className="text-gray-600 mb-2 flex items-center text-sm">
                                    <FontAwesomeIcon
                                        icon={faBox}
                                        className="mr-2"
                                    />{" "}
                                    {car.stock} in stock
                                </p>
                                <PrimaryButton className="w-full place-content-center">
                                    Order Now
                                </PrimaryButton>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Normal>
    );
};

export default Catalog;
