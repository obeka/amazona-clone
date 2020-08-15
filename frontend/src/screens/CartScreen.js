import React,{ useEffect } from 'react';
import {useParams, useLocation, Link, useHistory } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

function CartScreen() {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    const productId = useParams().id;
    const {search} = useLocation();
    const qty = parseInt(search.split('=')[1]);
    const dispatch = useDispatch();
    const history = useHistory();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        history.push('/signin?redirect=shipping')
    }

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [])

    return (
        <div className='cart'>
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ? 
                        <div>Cart is Empty</div> :
                        cartItems.map( item => 
                            <li>
                                <div className="cart-image"><img src={item.image} alt="product"/></div>
                                
                                <div className="cart-name">
                                    <div>
                                        <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        Qty : <select value={item.qty} onChange={e => dispatch(addToCart(item.productId, e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x=> <option value={x+1} key={x+1}>{x+1}</option>)}
                                        </select>
                                        <button type="button" className='button' onClick={() => removeFromCartHandler(productId)}>Delete</button>
                                    </div>
                                    
                                </div>
                                <div className='cart-price'>${item.price}</div>
                            </li> )
                    }

                </ul>
            </div>
            <div className="cart-action">,
                <h3>Subtotal ({cartItems.reduce((a ,c) => a + parseInt(c.qty), 0)} items) :
                $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
                </h3>
                <button className="button primary full-width" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                    Proceed to checkout
                </button>
            </div>
        </div>
    )
}

export default CartScreen
