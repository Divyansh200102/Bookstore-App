// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import BookDetails from './components/BookDetails';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <ToastContainer/>
          <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/book/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
     
  );
}

export default App;