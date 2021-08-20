import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "./UI/button/myButton";
import {AuthContext} from "../context/context";

const NavBar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className='navbar__wrapper'>
            <div className='navbar'>
                <div className='navbar__item'>
                    <Link to='/about'>
                        <span className='navbar__links__text'>О сайте</span>
                    </Link>
                </div>
                <div className='navbar__item'>
                    <Link to='/posts'>
                        <span className='navbar__links__text'>Посты</span>
                    </Link>
                </div>
                <div className="navbar__item__exitbtn">
                    <MyButton onClick={logout}>Выйти</MyButton>
                </div>
            </div>
        </div>
    );
};

export default NavBar;