import { useSelector, useDispatch } from 'react-redux';
import { resetPurchases } from '../store/moneySlice';
import { formatMoney } from '../utils/formatMoney';

function Receipt() {
  const dispatch = useDispatch();
  const { products, totalSpent, statistics, history } = useSelector(state => state.money);

  if (products.length === 0) return null;

  return (
    <div className="receipt">
      <h2>Satın Alınanlar</h2>
      <div className="purchased-items">
        {products.map(item => (
          <div key={item.id} className="receipt-item">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
            <span>{formatMoney(item.total)}</span>
          </div>
        ))}
      </div>

      <div className="statistics">
        <div className="stat-card">
          <h3>En Çok Alınan</h3>
          {statistics.mostBought && (
            <p>{statistics.mostBought.name} (x{statistics.mostBought.quantity})</p>
          )}
        </div>
        <div className="stat-card">
          <h3>En Pahalı Alım</h3>
          {statistics.mostExpensive && (
            <p>{statistics.mostExpensive.productName} ({formatMoney(statistics.mostExpensive.price)})</p>
          )}
        </div>
        <div className="stat-card">
          <h3>Toplam İşlem</h3>
          <p>{statistics.totalTransactions}</p>
        </div>
      </div>

      <div className="history-list">
        <h3>İşlem Geçmişi</h3>
        {history.slice().reverse().map((item, index) => (
          <div key={index} className="history-item">
            <span>{item.type === 'purchase' ? '🛒' : '💰'} {item.productName}</span>
            <span>{formatMoney(item.price)}</span>
          </div>
        ))}
      </div>

      <button 
        className="reset-button"
        onClick={() => dispatch(resetPurchases())}
      >
        Sıfırla
      </button>
    </div>
  );
}

export default Receipt; 