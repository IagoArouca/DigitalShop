import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();

  return (
    <header className="bg-gray-800 text-white p-4 border-b-2 border-blue-500">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold text-white no-underline">
          Digital Shop
        </Link>
        <div className="relative">
          <Link to="/cart" className="text-xl text-white no-underline">
            🛒
            <span className="absolute top-[-10px] right-[-10px] bg-blue-500 text-white rounded-full text-xs px-2 py-1">
              {cart.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;