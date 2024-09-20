import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import {
    faDashboard,
    faShoppingCart,
    faSignOut,
    faUser,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

export default function Normal({ children, user }) {
    return (
        <div>
            <nav className="bg-white shadow-md sticky top-0 z-50 px-2">
                <div className="h-16  md:px-3 py-2 w-dvw flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-fit" />
                    </Link>

                    <div className="flex space-x-4">
                        {!user ? (
                            <>
                                <Link
                                    href="/login"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            // Render other user-specific links or components when logged in
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-800 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.username}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("orders")}>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faShoppingCart}
                                        ></FontAwesomeIcon>
                                        My Orders
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("dashboard")}>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faDashboard}
                                        ></FontAwesomeIcon>
                                        Dashboard
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faUserCircle}
                                        ></FontAwesomeIcon>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <FontAwesomeIcon
                                            className="mr-2 text-red-500"
                                            icon={faSignOut}
                                        ></FontAwesomeIcon>
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </nav>

            <div className="bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
