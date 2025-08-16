import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header';
import CartPage from './components/CartPage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const url = searchTerm 
                    ? `${API_BASE_URL}/api/products?query=${searchTerm}`
                    : `${API_BASE_URL}/api/products`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (e) {
                console.error("Failed to fetch products:", e);
                setProducts([]); 
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    return (
        <div className="bg-gray-100 min-h-screen">

            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main className="container mx-auto p-4">
                <Routes>
                   
                    <Route 
                        path="/" 
                        element={<ProductList products={products} loading={loading} />} 
                    />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;