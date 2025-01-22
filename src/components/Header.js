import { useSelector } from 'react-redux';
import { formatMoney } from '../utils/formatMoney';

function Header() {
  const { budget, totalSpent } = useSelector(state => state.money);

  return (
    <header className="header">
      <h1>Discord Parasını Harca</h1>
      <div className="budget-display">
        <div>Kalan Para: {formatMoney(budget)}</div>
        <div className="total-spent">
          Harcanan: {formatMoney(totalSpent)}
        </div>
      </div>
    </header>
  );
}

export default Header; 