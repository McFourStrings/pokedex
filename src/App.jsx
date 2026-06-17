import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Pokedex from './pages/Pokedex';
import Gen1 from './pages/Gen1';
import Gen2 from './pages/Gen2';
import Gen3 from './pages/Gen3';
import Gen4 from './pages/Gen4';
import Gen5 from './pages/Gen5';
import Gen6 from './pages/Gen6';
import Gen7 from './pages/Gen7';
import Gen8 from './pages/Gen8';
import Gen9 from './pages/Gen9';
import Mega from './pages/Mega';
import SearchResults from './pages/SearchResult';
import PokeDetail from './pages/PokeDetail';





import './App.css'

function App() {


  return (
    <div>
        <NavBar />
        <Routes>
           <Route path="/" element={<Pokedex />} />
          <Route path='/gen1' element={<Gen1 />} />
          <Route path='/gen2' element={<Gen2 />} />
          <Route path='/gen3' element={<Gen3 />} />
          <Route path='/gen4' element={<Gen4 />} />
          <Route path='/gen5' element={<Gen5 />} />
          <Route path='/gen6' element={<Gen6 />} />
          <Route path='/gen7' element={<Gen7 />} />
          <Route path='/gen8' element={<Gen8 />} />
          <Route path='/gen9' element={<Gen9 />} />
          <Route path='/mega' element={<Mega />} />
          <Route path='/pokemon/:id' element={<PokeDetail />} />
          <Route path='/search/:name' element={<SearchResults />} />









        </Routes>

    </div>
  )
}

export default App
