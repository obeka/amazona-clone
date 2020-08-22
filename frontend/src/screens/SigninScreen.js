import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory, useParams} from 'react-router-dom';
import {signin} from '../actions/userActions';

function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(() => { 
        if(userInfo) {
            history.push('/')
        }
        return () => {
            //
        }
    }, [userInfo])

    return (
        <div className='form'>
            <form onSubmit={submitHandler}>
                <ul className='form-container'>
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading ...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>Signin</button>
                    </li>
                    <li>
                        New to amazona?
                    </li>
                    <li>
                        <Link to='/register' className='button secondary'>Create your amazona account</Link>
                    </li>
                </ul>

            </form>
        </div>
    )
}

export default SigninScreen
