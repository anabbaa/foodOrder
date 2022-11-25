import { useContext } from 'react';
import Model from "./Model"
import CartItem from './CarItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
/*If we want to pass additional params (not only the event which is passed by default),
 we can't just write a simple reference:
onClick={clickHandler}
And we can't write ...
onClick={clickHandler(param)}
... since this would call the function immediately (and not only when the cart item
  is clicked).
So, if we want to pass params, we can either use bind (the first param is not used here,
  so we can write anything in this place) ...
onClick={clickHandler.bind(null, param)}
..., or we can create an anonymous function:
onClick={() => clickHandler(param)}
Both options are equivalent.
*/
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {};

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Model>
  );
};

export default Cart;
