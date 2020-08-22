import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory, useParams} from 'react-router-dom';
import {signin} from '../actions/userActions';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success:successSave, error: errorSave } = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success:successDelete, error: errorDelete } = productDelete;
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveProduct({_id :id, name, price, image, brand, category, countInStock, description}));
    }

    const deleteHandler = product => {
        dispatch(deleteProduct(product._id));
    }

    useEffect(() => { 
        if(successSave) {
            setModalVisible(false)
        }
        dispatch(listProducts());
        
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true)
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        console.log(product);
    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button onClick={() => openModal({})}>Create Product</button>
            </div>
            {modalVisible && <div className='form'>
            <form onSubmit={submitHandler}>
                <ul className='form-container'>
                    <li>
                        <h2>Create Product</h2>
                    </li>
                    <li>
                        {loadingSave && <div>Loading ...</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" id="image" value={image} onChange={e => setImage(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="brand">Brand</label>
                        <input type="text" name="brand" id="brand" value={brand} onChange={e => setBrand(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="countInStock">Count in Stock</label>
                        <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={e => setCountInStock(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="name">Description</label>
                        <textarea type="text" name="description" id="description" value={description} onChange={e => setDescription(e.target.value)}/>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>{ id ? "Update" : "Create" }</button>
                    </li>
                    <li>
                        <button type='button' onClick={() => setModalVisible(false)} className='button secondary'>Back</button>
                    </li>

                </ul>

            </form>
        </div>}
            
            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Category</td>
                            <td>Brand</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                         <tr>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button onClick={() => openModal(product)}>Edit</button>
                                <button onClick={() => deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default ProductsScreen;
