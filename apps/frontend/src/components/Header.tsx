import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css'; 

const Header = () => {
    const { cart } = useCart();

    return (
        <header className="main-header">
            <nav>
                <Link to="/" className="logo">Digital Shop</Link>
                <div className="cart-icon">
                    <Link to="/cart">
                        🛒 <span className="cart-count">{cart.length}</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;