import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const NavBar = () => {
  
  
  return (
    <div className='nav_bar_container'>
      <button>Start a new conersation</button>
      <hr/>
       <h4>Chatbot</h4>
      <h4>Photo Genrator</h4>
      <h4>Code Debugg</h4>
      <h4>Content Creator</h4>
    </div>
  )
}

export default NavBar