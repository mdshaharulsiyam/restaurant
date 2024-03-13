import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Button from "../../../components/Button/Button";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();     // Fetching menu items using custom hook

    const [axiosSecure] = useAxiosSecure(); // Axios instance for secure requests

    // Pagination state
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate indexes for pagination and display items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(menu.length / itemsPerPage);     // Calculate the total number of pages based on the cart length and items per page

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

    // Function to handle item deletion
    const handleDelete = item => {
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
                // Delete item via secure Axios request
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); // Refresh menu items after deletion
                            Swal.fire(
                                'Deleted!',
                                'Your Item has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        });
    };

    return (
        <div className="w-full text-white">
            <SectionTitle heading={'Manage Items'} subHeading={'Hurry Up'}></SectionTitle>

            <div className="overflow-x-auto rounded-lg">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr className="bg-primary text-black text-lg">
                            <th>Name</th>
                            <th>Category</th>
                            <th className="text-right">Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((item, index) => <tr key={item._id}>

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
                                <td>{item.category}</td>
                                <td className="text-right">${item.price}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">Update</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="p-3 rounded-lg text-lg text-white bg-red-600"><FaTrashAlt /></button>                                </td>
                            </tr>)
                        }


                    </tbody>


                </table>
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

export default ManageItems;