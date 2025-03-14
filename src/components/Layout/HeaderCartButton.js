import { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon';

import CartContext from '../../store/cart-context';
import classes from './HeaderCardButton.module.css';

const HeaderCartButton=(props) =>{
 const [btnIsHighlighted,setBtnIsHighlighted]= useState(false);

  const cartctx=useContext(CartContext);

  const { items }=cartctx;

  const numberOfcartItems=items.reduce((currentNumber,item)=>{
    return currentNumber+item.amount;
  },0);

  

  const btnClasses=`${classes.button} 
  ${btnIsHighlighted ? classes.bump : ''}`;


  useEffect(()=>{
    if(items.length === 0){
      return;
    }

    setBtnIsHighlighted(true);

const timer=setTimeout(()=>{
  setBtnIsHighlighted(false);
},300);


return ()=>{
  clearTimeout(timer)
};

  },[items]);

  return (
    <button className={btnClasses} 
    onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>your Cart</span>
        <span className={classes.badge}>{numberOfcartItems}</span>
    </button>
  )
}

export default HeaderCartButton