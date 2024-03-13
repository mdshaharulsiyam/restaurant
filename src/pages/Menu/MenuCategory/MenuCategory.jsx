import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button'
const MenuCategory = ({ items, title, img }) => {
    return (
        <div className='mb-20'>
            {title && <Cover img={img} title={title}></Cover>}

            <div className='grid md:grid-cols-2 gap-10 mx-4 md:mx-24 my-20'>
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link className="mx-4 md:mx-24" to={`/order/${title}`}>
                <Button title='Order Now' ></Button>
            </Link>

        </div>
    );
};

export default MenuCategory;