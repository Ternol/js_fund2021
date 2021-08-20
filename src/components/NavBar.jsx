import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
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
            </div>
        </div>
    );
};

export default NavBar;