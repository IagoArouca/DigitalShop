import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart } =useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0)

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 ">Seu carrinho</h2>

            {cart.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 text-lg mb-4">Seu carrinho está vazio</p>
                    <Link to="/" className="text-blue-500 hover:underline">Voltar para a loja</Link>
                </div>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item._id} className="flex item-center justify-between border-b py-4">
                            <div className="flex items-center">
                                <img src="{item.imageUrl}" alt="{item.name}" className="w-20" />
                                <div>
                                    <p className="font-semibold text-lg">{item.name}</p>
                                    <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                                </div>

                            </div>

                        </div>
                    ))}
                    <div className="mt-8 pt-4 border-t-2 border-gray-200">
                        <div className="flex justify-between items-center font-bold text-2xl">
                            <p>Total:</p>
                            <p>R$ {total.toFixed(2)}</p>
                        </div>
                        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-xl hover:bg-blue-700 transition-colors">
                            Finalizar compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;