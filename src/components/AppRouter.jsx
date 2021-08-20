import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./router/routes";
import {AuthContext} from "../context/context";


const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);
    if (isLoading) {
        return <div>
            <h2 style={{textAlign: 'center'}}>Идет загрузка..</h2>
        </div>
    }
    return (
        isAuth ?
        <Switch>
            {privateRoutes.map(route => <Route
                component={route.component}
                path={route.path}
                exact={route.exact}
                key={route.path}
            />)}
            <Redirect to='/posts'/>
        </Switch>
            :
            <Switch>
                {publicRoutes.map(route => <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />)}
                <Redirect to='/login'/>
            </Switch>
    );
};

export default AppRouter;