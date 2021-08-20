import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/myButton";
import {AuthContext} from "../context/context";

const Login = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const submit = (e) => {
        e.preventDefault()
    }

    const tryLogin = () => {
        if (login === 'test' && pass === 'test') {
            setIsAuth(true);
            localStorage.setItem('auth', 'true');
        }
    }

    return (
        <div>
            <h1>Авторизация</h1>
            <form onSubmit={submit}>
                <MyInput type='text'
                         placeholder='Введите логин'
                         value={login}
                         onChange={e => setLogin(e.target.value)}/>
                <MyInput
                    type='text'
                    placeholder='Введите пароль'
                    value={pass}
                    onChange={e => setPass(e.target.value)}/>
                <MyButton onClick={tryLogin}>Войти</MyButton>

            </form>
        </div>
    );
};

export default Login;