import react from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  SignIn,
  SignUp,
  Home,
  Menu,
  PrivateRoute,
  UserDashBoard,
  AdminRoute,
  AdminDashBoard,
  AddCategory,
  AddProduct,
  Shop,
  Product,
  Cart,
  Orders,
  Profile,
  ManageProducts,
  UpdateProduct
} from "./imports";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signIn" exact render={(props) => <SignIn />} />
        <Route path="/signUp" exact render={(props) => <SignUp />} />
        <Route path="/" exact render={(props) => <Home />} />
        <Route path="/shop" exact render={(props) => <Shop />} />
        <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} />
        <Route path="/product/:productId" component={Product} />{" "}
        {/*Watch out for this in packachange cant access react router props in \"render\" version of declaration*/}
        <Route path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
