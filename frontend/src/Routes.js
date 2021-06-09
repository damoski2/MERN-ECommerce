import react from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import{ SignIn, SignUp, Home, Menu, PrivateRoute, UserDashBoard, AdminRoute, AdminDashBoard, AddCategory, AddProduct, Shop, Product, Cart } from './imports';

const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signIn" exact render={(props)=> <SignIn /> } /> 
                <Route path="/signUp" exact render={(props)=> <SignUp /> } /> 
                <Route path="/" exact render={(props)=> <Home /> } />
                <Route path="/shop" exact render={(props)=> <Shop /> } /> 
                <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
                <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
                <AdminRoute path="/create/category" component={AddCategory} />
                <AdminRoute path="/create/product" component={AddProduct} />
                <Route path="/product/:productId" component={Product} />               {/*Watch out for this in packachange cant access react router props in \"render\" version of declaration*/}
                <Route path="/cart" component={Cart} />  
            </Switch>
        </BrowserRouter>
    )
}

export default Routes