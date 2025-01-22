import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Receipt from './components/Receipt';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <ProductList />
        <Receipt />
      </div>
    </Provider>
  );
}

export default App; 