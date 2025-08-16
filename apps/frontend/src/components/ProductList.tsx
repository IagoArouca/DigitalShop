import { useState, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState<string>(''); 

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
      } catch (e: any) {
        console.error("Failed to fetch products:", e);
        setError("Erro ao carregar produtos. Verifique se o backend está rodando e acessível.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300); 

    return () => clearTimeout(debounceTimer);

  }, [searchTerm]); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Carregando produtos...</p>}
      {error && <p className="text-center text-red-500">Erro: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500">Nenhum produto encontrado. Tente uma pesquisa diferente!</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">R$ {product.price.toFixed(2)}</p>
              <Link 
                to={`/products/${product._id}`} 
                className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;