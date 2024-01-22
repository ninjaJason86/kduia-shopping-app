import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CartValue() {
    const { CartValue, Location, } = useContext(AppContext);

    return (
        <div className='alert alert-primary'>
            <span>Cart Value: {Location}{CartValue}</span>
        </div>
    )
}
