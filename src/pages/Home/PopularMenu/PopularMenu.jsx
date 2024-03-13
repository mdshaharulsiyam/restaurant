import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className=' mb-10'>
            <SectionTitle heading={'From Our Menu'} subHeading={'Popular Items'}></SectionTitle>

            <div className='grid md:grid-cols-2 gap-4 mt-20 mb-10'>
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>

            <Link to={'/menu'}><Button title={'View Full Menu'}></Button></Link>

        </section>
    );
};

export default PopularMenu;