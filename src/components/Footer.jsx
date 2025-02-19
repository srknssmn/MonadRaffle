import React from 'react'
import { Link } from 'react-router-dom';
import { BiWorld } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Footer() {
    return (
      <div className='my-auto w-full bg-darkBlue'>
        <footer className="bg-gray-900 shadow w-full">
            <div className="w-full mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                      <p className="text-2xl lg:text-3xl font-bold tracking-widest text-transparent bg-gradient-to-r bg-clip-text uppercase from-blue-800 to-gray-200">
                        <Link to="/home">HuntersRaffle</Link>
                      </p>
                    </div>
                    <div className='lg:mr-6'>
                      <ul className="flex flex-row space-x-2 lg:space-x-4 text-2xl items-center justify-start lg:justify-center">
                          <li>
                            <Link to="https://coinhunterstr.com/" target="_blank" className='hover:text-gray-500 text-blue-400 transition duration-500'>
                                <BiWorld />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://twitter.com/CoinHuntersTR" target="_blank" className='hover:text-gray-500 text-blue-400 transition duration-500'>
                                <FaSquareXTwitter />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://www.youtube.com/@CoinHuntersTR" target="_blank" className='hover:text-gray-500 text-blue-400 transition duration-500'>
                                <FaYoutube />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://t.me/CoinHuntersTR" target="_blank" className='hover:text-gray-500 text-blue-400 transition duration-500'>
                                <FaTelegram />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://github.com/CoinHuntersTR" target="_blank" className='hover:text-gray-500 text-blue-400 transition duration-500'>
                                <FaGithub />
                            </Link>
                          </li>
                      </ul>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="https://coinhunterstr.com/" target="_blank" className='hover:underline'>CoinHunters™</Link>. All Rights Reserved.</span>
            </div>
        </footer>
      </div> 
    )
  }
  
  export default Footer