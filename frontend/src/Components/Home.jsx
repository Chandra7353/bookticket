import React from 'react'
import Navbar from './Navbar'
import HomeBanner from "../Assets/booking.jpg"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className='mainhome' >
      <Navbar />
      <div className="homepage">
        <div className="homebody">
          <img src={HomeBanner} alt="" />
        </div>
        <div className="hometext">
          <h1>Book Your Trip Now</h1>
          <p>Bus ticket booking is very easy & convenient on bookBus. To book bus tickets, you can download the bookBus app or visit bookbus.in</p>
          <Link to="/ticketbook" ><button  >Book Ticket</button></Link>
        </div>

      </div>
    </div>
  )
}

export default Home