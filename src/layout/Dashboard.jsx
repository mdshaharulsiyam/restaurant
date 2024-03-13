import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FiMenu, FiShoppingCart, } from 'react-icons/fi';
import { GiCrossedBones, GiForkKnifeSpoon, GiWallet } from "react-icons/gi";
import { FaBook, FaCalendarAlt, FaHome, FaTable, FaUsers } from "react-icons/fa";
import { FaBarsStaggered } from 'react-icons/fa6';

const Dashboard = () => {
    const [cart] = useCart(); // Fetch user's cart
    const [isAdmin] = useAdmin(); // Check if user is an admin
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen ">
            {/* Helmet for setting meta tags */}
            <Helmet>
                <title>Dashboard | Your App Name</title>
            </Helmet>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex justify-between items-center">
                <Link to={'/'}>
                    <h1 className='text-5xl font-bold text-primary'>Restaurant</h1>
                </Link>
                <button
                    onClick={toggleSidebar}
                    className="text-gray-200 p-3 focus:outline-none"
                >
                    {isSidebarOpen ? (
                        <GiCrossedBones className='text-4xl text-primary' />
                    ) : (
                        <FaBarsStaggered className='text-4xl text-primary' />
                    )}

                </button>
            </div>

            {/* Sidebar */}
            <aside className={`bg-primary text-black w-full lg:w-80 h-screen ${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:min-h-screen p-3 md:p-6`} >
                {/* Sidebar content */}
                <h1 className="text-black text-7xl font-bold">Restaurant</h1>
                {/* Sidebar links/menu */}
                <ul className="p-4 min-h-full">
                    {
                        isAdmin ? <>

                            <Link to='/dashboard/adminhome'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaHome /> <p>Admin Home</p> </div>  </Link>
                            <Link to='/dashboard/mycart'>      <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FiShoppingCart /> <p>My Cart</p> <span className='bg-purple-400 rounded-lg' > +{cart?.length || 0}</span> </div>  </Link>
                            <Link to='/dashboard/addItem'>     <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <GiForkKnifeSpoon /> <p>Add An Items</p> </div>  </Link>
                            <Link to='/dashboard/manageItems'> <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaBook /> <p>Manage Items</p> </div>  </Link>
                            <Link to='/dashboard/allusers'>    <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaUsers /> <p>All Users</p> </div>  </Link>
                        </>
                            : <>


                                <Link to='/dashboard/userhome'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaHome /> <p>User Home</p> </div>  </Link>
                                <Link to='/dashboard/mycart'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FiShoppingCart /> <p>My Orders</p> <span className='bg-purple-400 rounded-lg' > +{cart?.length || 0}</span> </div>  </Link>
                                <Link to='/dashboard/reservation'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaCalendarAlt /> <p>Reservation</p> </div>  </Link>
                                <Link to='/dashboard/history'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <GiWallet /> <p>Payment History</p> </div>  </Link>
                            </>
                    }

                    <div className="h-[1px] w-full bg-gray-500 my-5"> </div>

                    <Link to='/'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaHome /> <p>Home</p> </div>  </Link>
                    <Link to='/menu'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FiMenu /> <p>Menu</p> </div>  </Link>
                    <Link to='/order/salad'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaTable /> <p>Order Food</p> </div>  </Link>
                </ul>
            </aside>

            {/* Main content area */}
            <main className="flex-1 p-6 lg:p-10">
                {/* Main content */}
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default Dashboard;
