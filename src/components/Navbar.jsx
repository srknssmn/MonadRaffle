import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import useSetAccount from '../hooks/useSetAccount'
import {parseAddress} from '../utils/parseAddress'

import { logout } from '../store/slicers/accounts';

import { IoMdSwap } from "react-icons/io";
import { MdWaves } from "react-icons/md";
import { LiaBalanceScaleLeftSolid } from "react-icons/lia";
import { TbStars } from "react-icons/tb";
import { FaHatWizard } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { FaFaucetDrip } from "react-icons/fa6";
import { FaRegGrinStars } from "react-icons/fa";

function Navbar() {

    const {account} = useSelector(state => state.accounts)
    const {connectAccount} = useSetAccount();
    const dispatch = useDispatch();

    const [menuBarActive, setMenuBarActive] = useState(false) 
    const [user, setUser] = useState('') 

    const [hidden, setHidden] = useState(true)

    function myFunction() {
        if(menuBarActive == false) {
            setMenuBarActive(true)
        } else {
            setMenuBarActive(false)
        }
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('wallet')))
        if(user) {
            connectAccount();
        }
    }, [user])

  return (
        <div>
            <section className="w-full lg:px-20">
                <header id="header" className="py-4 lg:py-4 text-lighty font-gabriela">
                    <div className="container flex justify-between space-x-4 lg:space-x-16 items-center">
                        <NavLink to="/home" className="flex flex-col items-center ml-1 lg:ml-4">
                            <p className="text-2xl lg:text-3xl font-bold tracking-widest text-transparent bg-gradient-to-r bg-clip-text from-blue-800 to-gray-800 uppercase">HuntersRaffle</p>
                        </NavLink>
                        <div className="block md:hidden pr-4 text-white">
                            <div id="menubutton" className="containerSec" onClick={myFunction}>
                                <div className="bar1"></div>
                                <div className="bar2"></div>
                                <div className="bar3"></div>
                            </div>
                        </div>
                        <nav className="hidden md:flex lg:flex justify-between flex-1 pl-10">
                            <div className="flex items-center lg:text-md space-x-2 lg:space-x-8 drop-shadow-xl text-white">
                                <NavLink to="/raffles" className={({ isActive }) => isActive ? 'flex flex-row items-center space-x-1 px-8 font-semibold group border-2 border-blue-200 rounded-xl py-1 text-blue-800' : 'flex flex-row items-center space-x-1 px-8 font-semibold text-gray-600 hover:text-blue-800 transition duration-500 group hover:bg-blue-200 rounded-xl py-1'}>
                                    <p className='rounded-lg transition duration-500 px-1 py-1'><IoMdSwap /></p>
                                    <p className='uppercase font-semibold'>Raffles</p>
                                </NavLink>
                                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'flex flex-row items-center space-x-1 px-8 font-semibold group border-2 border-blue-200 rounded-xl py-1 text-blue-800' : 'flex flex-row items-center space-x-1 px-8 font-semibold text-gray-600 hover:text-blue-800 transition duration-500 group hover:bg-blue-200 rounded-xl py-1'}>
                                    <p className='rounded-lg transition duration-500 px-1 py-1'><MdDashboard /></p>
                                    <p className='uppercase font-semibold'>Dashboard</p>
                                </NavLink>
                            </div>
                            <p className="text-white"></p>
                            <div className="flex flex-row space-x-1 items-center">
                                <NavLink to="/mint" className={({ isActive }) => isActive ? 'flex flex-row items-center space-x-1 px-8 font-semibold group rounded-xl py-1 text-blue-800' : 'flex flex-row items-center space-x-1 px-8 font-semibold text-gray-600 hover:text-blue-800 transition duration-500 group hover:bg-blue-200 rounded-xl py-1'}>
                                    <p className='rounded-lg transition duration-500 px-1 py-1'><FaRegGrinStars /></p>
                                    <p className='uppercase'>Mint NFT</p>
                                </NavLink>
                                <button onClick={() => {connectAccount()}} className='flex flex-row items-center space-x-1 py-1 text-center font-semibold justify-center text-gray-600 hover:text-blue-800 tracking-widest px-2 hover:bg-gray-300 rounded-lg transition duration-500'>
                                    <p className=' px-1 py-1'><LuWallet /></p>
                                    <p>{account ? parseAddress(account) : "Connect Wallet"}</p>
                                </button>
                                {account ?
                                    <button onClick={() => {dispatch(logout())}} className='text-red-700 hover:text-gray-400 transition duration-700 text-lg'><FiLogOut /></button>
                                : ""}
                            </div>
                        </nav>
                    </div> 
                    <header id="menubar" className={`${menuBarActive ? "text-white font-gemunu uppercase change pt-2" : "text-white font-gemunu uppercase hidden pt-2"}`}>
                        <nav className="">
                            <div className="flex flex-col items-end space-y-1 pr-2">
                                <NavLink to="/raffles" className='text-black hover:text-gega-melon transition duration-500 tracking-widest'>Raffles</NavLink>
                                <NavLink to="/dashboard" className='text-black hover:text-gega-melon transition duration-500 tracking-widest'>Dashboard</NavLink>
                                <NavLink to="/create" className='text-black hover:text-gega-melon transition duration-500 tracking-widest'>Create</NavLink>
                                <div>
                                    <button onClick={() => {connectAccount()}} className='flex flex-row items-center space-x-1 py-1 text-center font-semibold justify-center text-gray-600 hover:text-blue-800 tracking-widest px-2 hover:bg-gray-300 rounded-lg transition duration-500'>
                                        <p className=' px-1 py-1'><LuWallet /></p>
                                        <p>{account ? parseAddress(account) : "Connect Wallet"}</p>
                                    </button>
                                    {account ?
                                        <button className='text-black' onClick={() => {dispatch(logout())}}>LogOut</button>
                                    : ""}
                                </div>
                            </div>
                        </nav>
                    </header>
                </header>
            </section>
        </div> 
  )
}

export default Navbar