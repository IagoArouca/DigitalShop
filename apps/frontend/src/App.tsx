import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header'; 
import CartPage from './components/CartPage';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;