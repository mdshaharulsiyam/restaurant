import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    const { user, loading } = useAuth();  // Fetches user authentication details and loading state

    const [axiosSecure] = useAxiosSecure();  // Fetches Axios instance with authentication headers
    // const token = localStorage.getItem('access-token');

    // Queries the cart data using tanstack/react-query
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email], // Unique query identifier
        enabled: !loading, // Determines if the query is enabled based on loading state
        queryFn: async () => {
            // Fetch cart data based on the user's email using axiosSecure
            const response = await axiosSecure(`/carts?email=${user?.email}`)
            return response.data;
        },
    })

    return [cart, refetch];    // Returns the fetched cart data and a function to refetch it
};

export default useCart;