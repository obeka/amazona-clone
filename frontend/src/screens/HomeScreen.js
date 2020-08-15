import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen() {
    /* const [products, setProducts] = useState([]); */
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList; 
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
        /* const fetchData = async() => {
            const {data} = await axios.get('http://127.0.0.1:5000/api/products');
            setProducts(data); 
            return () => {

            }
        }
         fetchData() */
    }, [])
    console.log(products);
    return (
            loading ? <div>Loading...</div> : error ? <div>{error}</div> : 
            <ul className="products">
                  {
                    products.map(product => 
                    <li key={product._id}>
                        <div className="product">
                            <Link to={'/product/' + product._id}>
                                <img src={product.image} alt="product" className="product-image" />
                            </Link>
                            <div className="product-name"><Link to={'/products/' + product._id}>{product.name}</Link></div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">{product.rating} Starts ({product.numReviews} Reviews)</div>
                        </div>
                    </li>)
                  }
                    
                </ul>
        
    )
}

export default HomeScreen
