import React from 'react';
import useResources from './useResources';

const Userlist = () => {
    const users = useResources('users');

    return (
        <ul>
            {users.map(user=><li key={user.id}>{user.name}</li>)}
        </ul>
    );
}

export default Userlist;