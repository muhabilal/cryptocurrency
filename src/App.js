import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Exchanges />} />
        <Route path='/coins' element={<Coins />} />
        <Route path='/coins/:id' element={<CoinDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;