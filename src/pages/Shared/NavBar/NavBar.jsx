import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';
import Swal from "sweetalert2";
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossedBones } from "react-icons/gi";
import useAuth from '../../../hooks/useAuth';

const NavBar = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [open, setOpen] = useState(false);

    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logged out successfully",
            showConfirmButton: false,
            timer: 1000
        });
    };

    return (

        <nav className="bg-transparent z-10 relative w-full  h-16 md:h-20 flex justify-center">
            <div className='flex justify-between items-center font-serif container mx-auto'>
                <div className='flex justify-center items-center font-bold text-primary text-5xl'>
                    <Link to={'/'}><h1>Restaurant</h1></Link>
                </div>
                {/*for small device */}
                <ul className={`absolute w-full h-screen flex flex-col gap-10 justify-center items-center bg-[#0C0B08] text-primary transform duration-500 ease-in-out ${open ? 'left-0 top-0' : '-top-[2000px]  left-0'} `}>
                    <Link to='/' className='text-3xl font-bold  rounded-md p-1 hover:text-white'>Home</Link>
                    <Link to='/menu' className='text-3xl font-bold  rounded-md p-1 hover:text-white'>Menu</Link>
                    <Link to='/order/salad' className='text-3xl font-bold  rounded-md p-1 hover:text-white'>Order Food</Link>
                    <Link to={!user ? '/login' : isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'} className='text-3xl font-bold  text-primary rounded-md p-1 hover:text-white'>Dashboard</Link>
                    {
                        user ?
                            <>
                                <button onClick={handleLogout} className="text-3xl font-bold  text-primary rounded-md p-1 hover:text-white underline">Logout</button>
                            </>
                            : <>
                                <Link to={'/login'}><button className=' md:flex hover:text-primary text-3xl font-bold  w-36 h-12 items-center justify-center rounded-lg text-white transition ease-in-out duration-200'>Login / Register</button></Link>
                            </>
                    }
                </ul>

                {/* for medium and large device */}
                <ul className='md:flex hidden text-white space-x-5'>
                    <Link to='/' className='text-lg font-lg hover:text-primary rounded-md px-1'>Home</Link>
                    <Link to='/menu' className='text-lg font-lg hover:text-primary rounded-md px-1'>Menu</Link>
                    <Link to='/order/salad' className='text-lg font-lg hover:text-primary rounded-md px-1'>Order Food</Link>
                    <Link to={!user ? '/login' : isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'} className='text-lg font-lg hover:text-primary rounded-md px-1'>Dashboard</Link>

                </ul>

                {
                    user ?
                        <div className='flex'>
                            <Link className=' md:mr-8' to={!user ? '/login' : '/dashboard/mycart'}>
                                <div className="relative py-2">
                                    <div className="t-0 absolute left-3">
                                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-primary p-3 text-sm font-semibold text-black">{cart?.length || 0}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="hidden md:flex hover:text-primary hover:underline font-serif w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200">Logout</button>
                        </div>
                        : <div className='flex'>
                            <Link className=' md:mr-8' to={!user ? '/login' : '/dashboard/mycart'}>
                                <div className="relative py-2">
                                    <div className="t-0 absolute left-3">
                                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-primary p-3 text-sm font-semibold text-black">{cart?.length || 0}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </div>
                            </Link>
                            <Link to={'/login'}><button className='hidden md:flex hover:underline hover:text-primary font-serif w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Login / Register</button></Link>
                        </div>
                }
                <div className='md:hidden z-20' onClick={() => setOpen(!open)}>
                    {
                        open ? <GiCrossedBones className='text-4xl text-primary' /> : <FaBarsStaggered className='text-4xl text-primary' />
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;