import { Link } from 'react-router-dom';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

interface ProductListProps {
    products: Product[];
    loading: boolean;
}

function ProductList({ products, loading }: ProductListProps) {
    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-center text-gray-500">Carregando produtos...</p>}
            
            {!loading && products.length === 0 && (
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