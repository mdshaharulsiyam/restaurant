import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import Button from "../Button/Button";

const FoodCard = ({ item }) => {
    const { image, name, recipe, price, _id } = item;
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = (item) => {
        // console.log(item);
        if (user && user.email) {
            const cartItem = { menuItemId: _id, image, name, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); //refetch cart ro update the numbaer of items in the cart
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Food Added to Cart",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    }
                })
        }
        else {
            Swal.fire({
                title: "Please login to order food",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };
    return (

        <div className="card glass hover:transform  hover:translate-y-2 ease-in-out duration-300">
            <figure><img className="w-full" src={image} alt="Shoes" /></figure>
            <p className="bg-primary text-black font-medium font-serif absolute right-4 top-4 px-4 py-2 rounded-lg">${price}</p>
            <div className="card-body flex flex-col items-start">
                <h2 className="card-title text-white">{name}</h2>
                <p className="text-gray-300">{recipe}</p>
                <div className="card-actions justify-end">
                    <Link to={``}>
                        <Button onClick={() => handleAddToCart(item)} title={'Order Now'} ></Button>
                    </Link>
                </div>
            </div>
        </div>

    );
};



export default FoodCard;