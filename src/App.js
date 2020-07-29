import React from 'react';
import logo from './logo.svg';
import './App.css';
import FindPokemon from "./FindPokemon";

function App() {
return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
         Pokemon Party Generator
        </h1>
      </header>
      <FindPokemon />
    </div>
  );
}

export default App;
