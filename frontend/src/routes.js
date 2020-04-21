import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
}from 'react-router-dom';

import Main from './pages/Main';
import NotFound from "./pages/NotFound";
import Products from './pages/ProductsList'
import ProductsList from './pages/CreateProduct'
import DeleteRoute from './pages/DeleteRoute/'

const RouteConfig = () => (
    <Router>
        <Switch>
            <Route exact path="/products" component={Main}/>
            <Route exact path="/" component={() => <Redirect to={{ pathname : '/products' }} />} />
            <Route exact path="/products/:id" component={Products}/>

            <Route path="/create-product" component={ProductsList} />
            <Route path="/delete-product/:id" component={DeleteRoute} />

            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

export default RouteConfig;
