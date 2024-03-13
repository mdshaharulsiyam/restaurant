import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();  // Retrieve Axios instance for secure requests

    const { register, handleSubmit, reset } = useForm(); // Initialize form handling with React Hook Form

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;   // Image hosting URL


    const [isLoading, setIsLoading] = useState(false); // State for loading

    // Function triggered on form submission
    const onSubmit = data => {
        setIsLoading(true);

        //host images on imagebb
        const formData = new FormData();
        formData.append('image', data.image[0]);

        // Send POST request to upload image
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                // Handle the image hosting response
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, category, recipe } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }

                    // create new item to the menu using secure Axios instance
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            setIsLoading(false); // Set loading to false after response handling
                            if (data.data.insertedId) {
                                setIsLoading(false); // Set loading to false on error
                                reset();

                                // Show success notification
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Menu Item Added Successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                }
            })
    };

    return (
        <div className="w-full text-white">
            <SectionTitle subHeading="What's new?" heading="Add An Item"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="mx-4" >
                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className=" font-semibold">Recipe Name *</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Recipe Name"
                        className="input input-bordered w-full "
                        {...register("name", { required: true, maxLength: 120 })}
                    />
                </div>

                <div className="flex my-4 text-white">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span >Category *</span>
                        </label>
                        <select defaultValue={'Choose a category'} className="select select-bordered" {...register("category", { required: true })}>
                            <option disabled >Choose a category</option>
                            <option>pizza</option>
                            <option>soup</option>
                            <option>salad</option>
                            <option>drinks</option>
                            <option>dessert</option>
                        </select>
                    </div>

                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className=" font-semibold">Price *</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            className="input input-bordered w-full "
                            {...register("price", { required: true, maxLength: 120 })}
                        />
                    </div>
                </div>

                <div className="form-control my-4">
                    <label className="label">
                        <span className="">Recipe Details *</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </div>

                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="">Item Image *</span>
                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full " />
                </div>

                <input className="bg-primary px-4 py-2 rounded-md text-black font-semibold" type="submit" value={isLoading ? 'Adding...' : 'Add Item'}
                    disabled={isLoading} />
            </form>
        </div>
    );
};

export default AddItem;