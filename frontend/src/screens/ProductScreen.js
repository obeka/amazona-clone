import React, { useState, useEffect } from 'react';
import data from '../data';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import {useHistory, useParams} from 'react-router-dom';

function ProductScreen(props) {

    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    useEffect(() => {
        dispatch(detailsProduct(id));
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        history.push(`/cart/${id}?qty=${qty}`)
    }
    return (
        <div>
            <div className='back-to-result'>
                <Link to='/'>Back to results</Link>
            </div>
    {loading ? <div>Loading ...</div> : error ? <div>{error}</div> : 
            (
             <div  className='details'>
                <div className='details-image'>
                    <img src={product.image} alt="product"/>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Stars ({product.numReviews} Reviews)
                        </li>
                        <li>
                            Price : <b>${product.price}</b>
                        </li>
                        <li>
                            Description:
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price: ${product.price}
                        </li>
                        <li>
                            Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </li>
                        <li>
                            Qty: <select name="" id="" value={qty} onChange={e => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map(x=> <option value={x+1} key={x+1}>{x+1}</option>)}
                            </select>
                        </li>
                        <li>
                            {product.countInStock > 0 &&  <button className='button primary' onClick={handleAddToCart}>Add to Cart</button>}
                            
                        </li>
                    </ul>
                </div>
            </div>) }
        </div>
    )
}

export default ProductScreen
