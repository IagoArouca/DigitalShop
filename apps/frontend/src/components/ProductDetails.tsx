import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
        setError("ID do produto não fornecido.");
        setLoading(false);
        return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (e: any) {
        console.error("Failed to fetch product:", e);
        setError("Erro ao carregar os detalhes do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error('Falha ao adicionar produto ao carrinho');
        }

        const data = await response.json();
        addToCart(product);
        alert(data.message);
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-8">Carregando detalhes do produto...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!product) return <p className="text-center text-gray-500 mt-8">Produto não encontrado.</p>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← Voltar para a lista de produtos</Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full md:w-1/2 h-64 md:h-auto object-cover" 
        />
        <div className="p-6 md:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-gray-900 mb-4">R$ {product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">Categoria: {product.category}</p>
          <button 
            onClick={handleAddToCart} 
            className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;