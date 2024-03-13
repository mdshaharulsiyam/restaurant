import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';

import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';


import PopularMenu from '../../Home/PopularMenu/PopularMenu';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
const Menu = () => {
    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Our Menu</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>

            {/* //main cover */}
            <Cover img={menuImg} title={'Our menu'}></Cover>
            <SectionTitle subHeading={'Dont Miss'} heading={'Todays Offer'}></SectionTitle>

            {/* //offered items */}
            <MenuCategory items={offered}></MenuCategory>

            {/* //desert items */}
            <MenuCategory items={dessert} title={"deserts"} img={dessertImg}></MenuCategory>

            {/* pizza items */}
            <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>

            {/* //soup items */}
            <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>

            {/* //salad items */}
            <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>



        </div>
    );
};

export default Menu;