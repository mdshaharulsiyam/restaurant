import FoodCard from '../../../components/FoodCard/FoodCard';
import 'swiper/css';
import 'swiper/css/pagination';

// Component for displaying items in an order page
const OrderTab = ({ items }) => {
    return (
        <div className=' mx-2 md:mx-0 grid md:grid-cols-4 gap-10'>
            {
                items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;