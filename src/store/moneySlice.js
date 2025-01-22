import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budget: 420000000,
  products: [],
  totalSpent: 0,
  history: [], // İşlem geçmişi
  statistics: {
    mostBought: null,
    mostExpensive: null,
    totalTransactions: 0
  }
};

export const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    buyProduct: (state, action) => {
      const { id, price, name } = action.payload;
      const existingProduct = state.products.find(item => item.id === id);
      
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.total += price;
      } else {
        state.products.push({
          id,
          name,
          quantity: 1,
          total: price
        });
      }
      
      // İşlem geçmişine ekle
      state.history.push({
        type: 'purchase',
        productName: name,
        price: price,
        date: new Date().toISOString()
      });
      
      // İstatistikleri güncelle
      state.statistics.totalTransactions += 1;
      updateStatistics(state);
      
      state.budget -= price;
      state.totalSpent += price;
    },
    
    sellProduct: (state, action) => {
      const { id, price, name } = action.payload;
      const existingProduct = state.products.find(item => item.id === id);
      
      if (existingProduct) {
        existingProduct.quantity -= 1;
        existingProduct.total -= price;
        
        if (existingProduct.quantity === 0) {
          state.products = state.products.filter(item => item.id !== id);
        }
        
        // İşlem geçmişine ekle
        state.history.push({
          type: 'sale',
          productName: name,
          price: price,
          date: new Date().toISOString()
        });
        
        // İstatistikleri güncelle
        state.statistics.totalTransactions += 1;
        updateStatistics(state);
        
        state.budget += price;
        state.totalSpent -= price;
      }
    },
    
    resetPurchases: (state) => {
      state.budget = initialState.budget;
      state.products = [];
      state.totalSpent = 0;
      state.history = [];
      state.statistics = {
        mostBought: null,
        mostExpensive: null,
        totalTransactions: 0
      };
    }
  }
});

// İstatistikleri güncelleyen yardımcı fonksiyon
const updateStatistics = (state) => {
  // En çok alınan ürünü bul
  if (state.products.length > 0) {
    state.statistics.mostBought = state.products.reduce((prev, current) => 
      (prev.quantity > current.quantity) ? prev : current
    );
  }
  
  // En pahalı alımı bul
  if (state.history.length > 0) {
    state.statistics.mostExpensive = state.history.reduce((prev, current) => 
      (prev.price > current.price) ? prev : current
    );
  }
};

export const { buyProduct, sellProduct, resetPurchases } = moneySlice.actions;
export default moneySlice.reducer; 