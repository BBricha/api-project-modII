import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const NavBar = () => {
  
  
  return (
    <div className='nav_bar_container'>
      <button>Start a new conersation</button>
      <hr/>
       <Link to='/chatbot'><h3>Chatbot</h3></Link>
       <Link to='/photogenerate'><h3>Photo Genrator</h3></Link>
       <Link to='/chatbot'><h3>Code Debugg</h3></Link>
       <Link to='/chatbot'><h3>Content Creator</h3></Link>
      
    </div>
  )
}

export default NavBar