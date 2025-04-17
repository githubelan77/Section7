import React from 'react'
import "./Lab2.css"
const Lab2 = () => {
  return (

    <div className='container'>
      <div className='header'>
        <div className='heading'>KL univeristy</div>
        <div className='menu'>
          <span>Home</span>
          <span>Portfolio</span>
          <span>About</span>
          <span>Login</span>
        </div>
      </div>

      <div className='content'>
        <div className='logo'>
          <img width={100} height={100} src="https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?ga=GA1.1.2033398525.1735192585&semt=ais_hybrid" />
        </div>
        <div className='details'>
          <p>project name</p>
          <p>domain</p>
          <p>batch</p>
          <p>year</p>
        </div>
      </div>

      <div className='footer'>
        <div className='s_footer'>
          <i class="fa fa-facebook"></i>
          <i class="fa fa-twitter"></i>
          <i class="fa fa-instagram"></i>
          <i class="fa fa-linkedin"></i>
        </div>
      </div>
    </div>

  )
}

export default Lab2; 
