import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import products from '../data/products';

function ProductList() {
  const { budget } = useSelector(state => state.money);
  
  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          canBuy={budget >= product.price}
        />
      ))}
    </div>
  );
}

export default ProductList; 