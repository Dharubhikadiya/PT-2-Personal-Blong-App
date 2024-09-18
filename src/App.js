import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blogapp from './Blog App/Blogapp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogapp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
