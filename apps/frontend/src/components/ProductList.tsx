import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/products`);
                if (!response.ok) {
                    throw new Error (`HTTP error! status: ${response.status}`);
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (e: any) {
                console.error("Failed to fetch products:", e);
                setError("Erro ao carregar produtos. Verifique se o backend está rodando e acessível.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list-container">
            {loading && <p> Carregando produtos...</p>}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            {!loading && !error && products.length === 0 && (
                <p>Nenhum produto disponivel.</p>
            )}
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>Preço: R$ {product.price.toFixed(2)}</p>
                        <Link to={`/products/${product._id}`}>Ver Detalhes</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;