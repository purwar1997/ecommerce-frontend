import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { fetchLoggedInUserAsync } from './app/slices/userSlice';
import store from './app/store';
import App from './App';
import './index.css';

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  await store.dispatch(fetchLoggedInUserAsync(2)).unwrap();

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})();