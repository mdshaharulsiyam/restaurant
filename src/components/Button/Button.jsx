import React from 'react';

const Button = ({ title, onClick }) => {
    return (
        <button onClick={onClick} className='px-4 py-1 rounded-md bg-primary hover:bg-[#D1A054] ease-in-out duration-300 text-black font-serif text-2xl font-semibold'>{title}</button>
    );
};

export default Button;