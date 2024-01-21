import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimesCircle } from 'react-icons/fa';

export default function ExpenseItem(props) {
    const { dispatch, Location } = useContext(AppContext);

    function handleDeleteItem() {
        const item = {
            name: props.name,
        };

        dispatch({
            type: "DELETE_ITEM",
            payload: item,
        })
    }
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
            <td>{Location}{parseInt(props.unitPrice)}</td>
            <td>{Location}{parseInt(props.quantity) * parseInt(props.unitPrice)}</td>
            <td><FaTimesCircle size={"2.2em"} color='red' onClick={handleDeleteItem}></FaTimesCircle></td>
        </tr>
    )
}

