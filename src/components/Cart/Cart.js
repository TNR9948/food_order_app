import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {
    const [isCheckOut, setIscheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartctx = useContext(CartContext);
 

    const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`;

    const hasItems = cartctx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartctx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartctx.addItem({ ...item, amount: 1 });

    };

    const orderHandler = () => {
        setIscheckOut(true);
    }

    const submitOrderHandler = async (addressData) => {
        isSubmitting(true);
        const response = await fetch("http://localhost:9100/foodorder-api/saveaddress", {
            method: 'POST',
            body: JSON.stringify(addressData),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartctx.clearCart();
    }

    const cartitems = (
        <ul className={classes['cart-items']}>
            {
                cartctx.items.map((item) => (
                    <CartItem key={item.id} name={item.name}
                        amount={item.amount} price={item.price}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}

                    />
                ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']}
                onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}
                onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (<React.Fragment>
        {cartitems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut && <Checkout onConfirm={submitOrderHandler}
            onCancel={props.onClose} />}
        {!isCheckOut && modalActions}
    </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmittingModalContent = (<React.Fragment>
        <p>Sucessfully sent the order</p>

        <div className={classes.actions}>
            <button className={classes.button}
                onClick={props.onClose}>Close</button>

        </div>

    </React.Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmittingModalContent}

        </Modal>
    )
}

export default Cart