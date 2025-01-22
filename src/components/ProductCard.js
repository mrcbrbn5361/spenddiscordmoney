import { useDispatch, useSelector } from 'react-redux';
import { buyProduct, sellProduct } from '../store/moneySlice';
import { formatMoney } from '../utils/formatMoney';

function ProductCard({ product, canBuy }) {
  const dispatch = useDispatch();
  const purchasedProducts = useSelector(state => state.money.products);
  
  const purchasedItem = purchasedProducts.find(item => item.id === product.id);
  const quantity = purchasedItem ? purchasedItem.quantity : 0;

  const handleBuy = () => {
    dispatch(buyProduct(product));
  };

  const handleSell = () => {
    dispatch(sellProduct(product));
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img 
          src={process.env.PUBLIC_URL + product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = process.env.PUBLIC_URL + '/images/discord-logo.png';
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{formatMoney(product.price)}</p>
      </div>
      <div className="button-group">
        <button 
          className="buy-button"
          onClick={handleBuy}
          disabled={!canBuy}
        >
          Satın Al
        </button>
        <div className="quantity">{quantity}</div>
        <button 
          className="sell-button"
          onClick={handleSell}
          disabled={quantity === 0}
        >
          Sat
        </button>
      </div>
    </div>
  );
}

export default ProductCard; 