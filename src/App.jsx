import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Routes, Route} from 'react-router-dom'
import './App.css'
// import './css/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Raffles from './pages/Raffles';
import Raffle from './pages/Raffle'
import CreateRaffle from './pages/CreateRaffle';
import Dashboard from './pages/Dashboard'
import Collection from './pages/Collection';
import AllRaffles from './pages/AllRaffles';
import MintNFT from './pages/MintNFT';
import WrongPath from './pages/WrongPath';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Raffles />} />
        <Route path="/home" element={<Home />} />
        <Route path="/raffles" element={<Raffles />} />
        <Route path="/raffles/:raffleContract" element={<Raffle />} />
        <Route path="/collection/:nftContract" element={<Collection />} />
        <Route path="/allraffles" element={<AllRaffles />} />
        <Route path="/create" element={<CreateRaffle />} />
        <Route path="/mint" element={<MintNFT />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='*' element={<WrongPath></WrongPath>} ></Route>
      </Routes>
      <ToastContainer/>
      <Footer />
    </>
  )
}

export default App