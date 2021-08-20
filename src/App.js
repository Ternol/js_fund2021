import React, {useContext, useEffect, useState} from "react";
import './App.css'
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context/context";
import {BrowserRouter} from "react-router-dom";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false)
    },[])



    return (
        <div className='App'>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                isLoading
            }}>
                <BrowserRouter>
                    <NavBar/>
                    <AppRouter/>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    )
}

export default App;
