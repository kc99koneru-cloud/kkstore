import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const Home = lazy(() => import('../pages/Home.jsx'));
const Products = lazy(() => import('../pages/Products.jsx'));
const ProductDetails = lazy(() => import('../pages/ProductDetails.jsx'));
const Cart = lazy(() => import('../pages/Cart.jsx'));
const Orders = lazy(() => import('../pages/Orders.jsx'));
const ReachUs = lazy(() => import('../pages/ReachUs.jsx'));
const Login = lazy(() => import('../pages/Login.jsx'));
const Register = lazy(() => import('../pages/Register.jsx'));
const Checkout = lazy(() => import('../pages/Checkout.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/reach-us" element={<ReachUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/orders"
          element={(
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={(
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
