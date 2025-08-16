import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { ChangeEvent } from 'react';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
    const { cart } = useCart();
    const cartItemCount = cart.length;

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <header className="bg-white shadow-md p-4">
            <nav className="container mx-auto flex items-center justify-between flex-wrap">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Digital Shop
                </Link>
                <div className="flex-grow max-w-lg mx-4">
                    <input
                        type="text"
                        placeholder="Pesquisar produtos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative text-gray-600 hover:text-gray-800 transition-colors">
                        <ShoppingCartIcon className="h-6 w-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;