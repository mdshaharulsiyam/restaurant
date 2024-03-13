import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import NavBar from '../pages/Shared/NavBar/NavBar';

const Main = () => {
    const location = useLocation();

    const noheaderFooter = location.pathname.includes('login') || location.pathname.includes('register')

    return (
        <div>
            {
                noheaderFooter || <NavBar></NavBar>
            }

            <Outlet></Outlet>
            {
                noheaderFooter || <Footer></Footer>
            }

        </div>
    );
};

export default Main;