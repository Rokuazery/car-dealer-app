import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Cars({ cars }) {
    const brands = [
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
    ];
    const {
        data: addData,
        setData: setAddData,
        post: postAddCar,
        processing: addingProcessing,
        errors: addErrors,
        reset: resetAdd,
    } = useForm({
        name: "",
        brand: "",
        price: 0,
        stock: 0,
        production_year: null,
        image_url: "",
    });

    const {
        data: editData,
        setData: setEditData,
        patch,
        processing: editingProcessing,
        errors: editErrors,
        reset: resetEdit,
    } = useForm({
        name: "",
        brand: "",
        price: "",
        stock: "",
        production_year: null,
        image_url: "",
    });

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditmodal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        if (selectedCar) {
            setEditData({
                name: selectedCar.name || "",
                brand: selectedCar.brand || "",
                price: selectedCar.price || "",
                stock: selectedCar.stock || "",
                image_url: selectedCar.image_url || "",
                production_year: selectedCar.production_year || null,
            });
        }
    }, [selectedCar]);

    const handleAddCar = (e) => {
        e.preventDefault();

        if (
            addData.production_year < 1900 ||
            addData.production_year > new Date().getFullYear()
        ) {
            alert("Please enter a valid production year.");
            return;
        }

        postAddCar("/api/cars", addData, {
            onSuccess: () => {
                alert("Car has been added successfully!");

                setAddModal(false);
                resetAdd();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const updateCarData = (e) => {
        e.preventDefault();

        patch(`api/cars/${selectedCar.id}`, {
            onSuccess: () => {
                alert("Car has been updated successfully!");

                setEditmodal(false);
                resetEdit();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const deleteCar = (id) => {
        if (confirm("Are you sure you want to delete this car?")) {
            router.delete(`api/cars/${id}`, {
                onSuccess: () => {
                    alert("Car deleted successfully!");
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Cars
                </h2>
            }
        >
            <Head title="Cars" />
            <div className="p-5 py-12">
                <div className="mb-4">
                    <SecondaryButton onClick={() => setAddModal(true)}>
                        Add New Car
                    </SecondaryButton>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-300 overflow-clip rounded-md">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Picture
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Car name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Brand
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Production Year
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b border-gray-300 "
                                >
                                    <th className="p-5">
                                        <img
                                            src={car.image_url}
                                            className="h-16 rounded-md object-cover object-center"
                                        />
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {car.name}
                                    </td>
                                    <td className="px-6 py-4">{car.brand}</td>
                                    <td className="px-6 py-4">
                                        {car.production_year}
                                    </td>
                                    <td className="px-6 py-4">{car.price}</td>
                                    <td className="px-6 py-4">
                                        qty: {car.stock}
                                    </td>
                                    <td className="px-6 py-4 space-x-3">
                                        <SecondaryButton
                                            onClick={() => {
                                                setSelectedCar(car);
                                                setEditmodal(true);
                                            }}
                                        >
                                            Edit
                                        </SecondaryButton>
                                        <DangerButton
                                            onClick={() => deleteCar(car.id)}
                                        >
                                            Delete
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={addModal} onClose={() => setAddModal(false)}>
                <form className="p-6" onSubmit={handleAddCar}>
                    <h2 className="font-semibold text-lg uppercase">
                        Add new car
                    </h2>
                    <hr className="mb-5 border-gray-300"></hr>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <InputLabel htmlFor="name" value="Car name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={addData.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) =>
                                        setAddData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={addErrors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex-1">
                                <InputLabel htmlFor="brand" value="Brand" />
                                <select
                                    id="brand"
                                    name="brand"
                                    value={addData.brand}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    onChange={(e) =>
                                        setAddData("brand", e.target.value)
                                    }
                                >
                                    <option value="" disabled={true}>
                                        Select a brand...
                                    </option>
                                    {brands.map((brand) => (
                                        <option key={brand} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    message={addErrors.brand}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <InputLabel htmlFor="stock" value="Stock" />
                                <TextInput
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    value={addData.stock}
                                    className="mt-1 block w-full"
                                    autoComplete="stock"
                                    onChange={(e) =>
                                        setAddData("stock", e.target.value)
                                    }
                                />
                                <InputError
                                    message={addErrors.stock}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex-1">
                                {" "}
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={addData.price}
                                    className="mt-1 block w-full"
                                    autoComplete="price"
                                    onChange={(e) =>
                                        setAddData("price", e.target.value)
                                    }
                                />
                                <InputError
                                    message={addErrors.price}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <InputLabel
                                    htmlFor="image_url"
                                    value="Image URL"
                                />
                                <TextInput
                                    id="image_url"
                                    name="image_url"
                                    value={addData.image_url}
                                    className="mt-1 block w-full"
                                    autoComplete="image_url"
                                    onChange={(e) =>
                                        setAddData("image_url", e.target.value)
                                    }
                                />
                                <InputError
                                    message={addErrors.image_url}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="production_year"
                                    value="Production Year"
                                />
                                <TextInput
                                    id="production_year"
                                    name="production_year"
                                    type="number"
                                    className="mt-1 block w-full"
                                    autoComplete="production_year"
                                    onChange={(e) =>
                                        setAddData(
                                            "production_year",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={addErrors.production_year}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex w-full flex-1 flex-row-reverse gap-2">
                            <SecondaryButton
                                type="submit"
                                disabled={addingProcessing}
                            >
                                Add Car
                            </SecondaryButton>
                            <DangerButton
                                type="button"
                                onClick={() => setAddModal(false)}
                            >
                                Cancel
                            </DangerButton>
                        </div>
                    </div>
                </form>
            </Modal>

            <Modal show={editModal}>
                <form className="p-6" onSubmit={updateCarData}>
                    <h2 className="font-semibold text-lg uppercase">
                        Edit car
                    </h2>
                    <hr className="mb-5 border-gray-300"></hr>
                    <div className="flex flex-col gap-5 items-end">
                        <div className="flex flex-col gap-3 items-start flex-1 w-full">
                            <img
                                src={selectedCar?.image_url}
                                className="h-24 self-center object-cover rounded-md"
                            ></img>

                            <hr className="border border-gray-200 w-full"></hr>

                            <div className="flex gap-3 w-full">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Car name"
                                    />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={editData.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setEditData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={editErrors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <InputLabel htmlFor="brand" value="Brand" />
                                    <select
                                        id="brand"
                                        name="brand"
                                        value={editData.brand}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setEditData("brand", e.target.value)
                                        }
                                    >
                                        <option value="" disabled={true}>
                                            Select a brand...
                                        </option>
                                        {brands.map((brand) => (
                                            <option key={brand} value={brand}>
                                                {brand}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={editErrors.brand}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-3">
                                <div className="flex-1">
                                    <InputLabel htmlFor="stock" value="Stock" />
                                    <TextInput
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        value={editData.stock}
                                        className="mt-1 block w-full"
                                        autoComplete="stock"
                                        onChange={(e) =>
                                            setEditData("stock", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={editErrors.stock}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={editData.price}
                                        className="mt-1 block w-full"
                                        autoComplete="price"
                                        onChange={(e) =>
                                            setEditData("price", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={editErrors.price}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 w-full">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="image_url"
                                        value="Image URL"
                                    />
                                    <TextInput
                                        id="image_url"
                                        name="image_url"
                                        value={editData.image_url}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setEditData(
                                                "image_url",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={editErrors.image_url}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="production_year"
                                        value="Production Year"
                                    />
                                    <TextInput
                                        id="production_year"
                                        name="production_year"
                                        value={editData.production_year}
                                        className="mt-1 block w-full"
                                        autoComplete="production_year"
                                        onChange={(e) =>
                                            setEditData(
                                                "production_year",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={editErrors.production_year}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <DangerButton
                                type="button"
                                onClick={() => setEditmodal(false)}
                            >
                                Cancel
                            </DangerButton>
                            <SecondaryButton
                                type="submit"
                                disabled={editingProcessing}
                            >
                                Update Car
                            </SecondaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
