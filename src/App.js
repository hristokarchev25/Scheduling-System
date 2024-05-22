/* import logo from './azzurroLogo.jpg';
import './App.css'; */
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" exact component={About} />
        <Route path="/questions" exact component={Questions} />
        <Route component={Error} /> */}
      </Routes>
      {/*  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
    </>
  );
}

export default App;
