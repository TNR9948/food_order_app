import React, { useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [postal, setPostal] = useState();
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({});

  const adress = {
    name: name,
    street: street,
    postal: postal,
    city: city
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    const errors = validate(adress);
    setErrors(errors);
    if(Object.keys(errors).length===0){
    props.onConfirm(adress);
  };
  };


  const validate = (adress) => {
    const error = {};

    if (!adress.name.trim()) {
      error.name = "Name is Required";
    }
    if (!adress.street.trim()) {
      error.street = "Street name is required";
    }
    // if (!adress.postal.trim()) {
    //   error.postal = "Postal code is required";

    // }
    // else {
    
    //   if (adress.postal.length !== 5) {
    //     error.postal = "Please enter valid postal code";
    //   }
    // }
    if(!adress.city.trim()){
      error.city="City name is required";
    }
    return error;
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
          onChange={(e) => setName(e.target.value)} />
          {errors.name && <span className={classes.error}>{errors.name}</span>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'
          onChange={(e) => setStreet(e.target.value)} />
          {errors.street && <span className={classes.error}>{errors.street}</span>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal'
          onChange={(e) => setPostal(e.target.value)} />
          {errors.postal && <span className={classes.error}>{errors.postal}</span>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'
          onChange={(e) => setCity(e.target.value)} />
          {errors.city && <span className={classes.error}>{errors.city}</span>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;