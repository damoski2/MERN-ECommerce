import react from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import{ SignIn, SignUp, Home, Menu, PrivateRoute, UserDashBoard, AdminRoute, AdminDashBoard, AddCategory, AddProduct } from './imports';

const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signIn" exact render={(props)=> <SignIn /> } /> 
                <Route path="/signUp" exact render={(props)=> <SignUp /> } /> 
                <Route path="/" exact render={(props)=> <Home /> } />
                <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
                <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
                <AdminRoute path="/create/category" component={AddCategory} />
                <AdminRoute path="/create/product" component={AddProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes