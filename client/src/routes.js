import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import RegistrationPage from './pages/RegistrationPage';
import MainPage from './pages/MainPage';
export const useRoutes = isAutentificated => {
    if (isAutentificated) {
        return (
            <Switch>
                <Route path='/Admin'>
                    <AdminPage />
                </Route>
                <Route path='/'>
                    <Redirect to='/Admin' />
                </Route>
                <Redirect to='/Admin' />
            </Switch>
        )
    }
    else
    return (
        <Switch>
            <Route path='/Login'>
                <LoginPage></LoginPage>
            </Route>
            <Route path='/Registration'>
                <RegistrationPage></RegistrationPage>
            </Route>
            <Route path='/'>
                <MainPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}