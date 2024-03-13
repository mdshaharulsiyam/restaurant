import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Users = () => {
    const { } = useQuery(['users'], async () => {

    })

    return (
        <div>
            total users:
        </div>
    );
};

export default Users;