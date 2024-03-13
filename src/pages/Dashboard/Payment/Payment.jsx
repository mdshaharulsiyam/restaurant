import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import useCart from '../../../hooks/useCart';

//todo: provide pk
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const price = parseFloat(total.toFixed(2));
    return (
        <div>
            <SectionTitle subHeading={'Please Provide '} heading={'payment'}></SectionTitle>
            <h2 className='text-3xl'>Payment Method</h2>
            <Elements stripe={stripePromise}>
                <CheckOutForm price={price} cart={cart} />
            </Elements>
        </div>
    );
};

export default Payment;