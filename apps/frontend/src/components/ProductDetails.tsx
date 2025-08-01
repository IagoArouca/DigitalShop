import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

  if (loading) return <p>Carregando detalhes do produto...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="product-details-container">
      <Link to="/">← Voltar para a lista de produtos</Link>
      <div className="product-details-card">
        <img src={product.imageUrl} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Preço: R$ {product.price.toFixed(2)}</p>
        <p>Categoria: {product.category}</p>
      </div>
    </div>
  );
}

export default ProductDetails;