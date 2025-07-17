import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../asset/logo.png'
import toast from 'react-hot-toast';

const Navbar = () => {
    const { auth, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // use to navigate to back login page
    const navigateHandler = () => {
        navigate("/login")
    }

    // Function to toggle menu 
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white border-b">
            {auth?.user ? (
                auth.user.role === "User" ? (
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                        <Link to="/" className="w-10 flex items-center ms-2">
                            <img src={Image} alt='logo' />
                            <h1 className="text-xl font-bold font-serif text-fuchsia-600">EVENT</h1>
                        </Link>
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link to="/home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Home </Link>
                                </li>
                                <li>
                                    <Link to="/event" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Event </Link>
                                </li>
                                <li>
                                    <Link to="/userticket" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Ticket </Link>
                                </li>
                                <li>
                                    <Link to="/eventForm" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Create Event </Link>
                                </li>
                                <li>
                                    <Link to="/calendar" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Calendar </Link>
                                </li>
                                <li>
                                    <Link to="/feedback" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> feedback </Link>
                                </li>
                                <li>
                                    <Link to="/query" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Query </Link>
                                </li>
                                <li>
                                    <Link to="/profile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Profile </Link>
                                </li>
                                <li>
                                    <Link onClick={logout} to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-bold"> Logout </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap items-center justify-between p-3 mx-5">
                        <Link to="/adminDashboard" className="w-10 flex items-center ms-2">
                            <img src={Image} alt="logo" />
                            <h1 className="text-xl font-bold font-serif text-fuchsia-600">EVENT</h1>
                        </Link>
                        <div className="me-2">
                            <button onClick={logout} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-3xl text-sm px-5 py-2 text-center outline-none"> Logout </button>
                        </div>
                    </div>
                )
            ) : (
                <div className="flex flex-wrap items-center justify-between p-3 mx-5">
                    <Link to="/home" className="w-10 flex items-center ms-2">
                        <img src={Image} alt="logo" />
                        <h1 className="text-xl font-bold font-serif text-fuchsia-600">EVENT</h1>
                    </Link>
                    <div className="me-2">
                        <button onClick={navigateHandler} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-3xl text-sm px-5 py-2 text-center outline-none"> Login </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
