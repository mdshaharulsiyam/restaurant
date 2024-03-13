import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const MyCart = () => {
    const [cart, refetch] = useCart();     // Fetch cart items using the useCart custom hook

    const total = cart.reduce((sum, item) => item.price + sum, 0);     // Calculate the total price of items in the cart using reduce

    // Pagination state
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate indexes for pagination and display items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cart.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(cart.length / itemsPerPage);     // Calculate the total number of pages based on the cart length and items per page

    // Functions to navigate to the next 
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Functions to navigate to the previous pages
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle item deletion from the cart
    const handleDelete = (item) => {
        // Display a confirmation dialog before deleting the item
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Make a DELETE request to remove the item from the cart
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch(); // Refetch the cart items and display a success message
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div className='w-full'>
            <Helmet>
                <title>My Cart | Restaurant</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <SectionTitle heading='My Orders ' subHeading='Confirm Order'></SectionTitle>

            <div className='font-bold flex justify-evenly mb-2 items-center'>
                <div className='flex flex-col md:flex-row justify-between md:gap-5'>
                    <h3 className='text-lg'>Total Items: {cart.length}</h3>
                    <h3 className='text-lg'>Total Price: {total}</h3>
                </div>
                <Link to='/dashboard/payment'><button className="bg-green-500 text-black py-2 px-4 rounded-md">Pay</button></Link>
            </div>

            <div className="flex flex-col">
                <div className="flex-grow overflow-auto rounded-lg">
                    <table className="table w-full rounded-lg">
                        <thead>
                            <tr className='bg-primary text-black text-lg'>
                                <th>Food Item Name</th>
                                <th className="text-right">Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                currentItems.map((item, index) => <tr className='text-center text-white hover:bg-gray-800 ' key={item._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right">${item.price}</td>
                                    <td ><button onClick={() => handleDelete(item)} className="p-3 rounded-lg text-lg text-white bg-red-600"><FaTrashAlt /></button></td>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>

            {/* pagination buttons */}
            <div className=' flex justify-center items-center gap-4 mt-4'>
                <Button onClick={prevPage} disabled={currentPage === 1} title={'Prev'}></Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={nextPage} disabled={currentPage === totalPages} title={'Next'}></Button>
            </div>
        </div>
    );
};

export default MyCart;