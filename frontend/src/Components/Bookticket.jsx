import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'


const Bookticket = () => {

    let [ticket, setticket] = useState()
    let navigate = useNavigate()



    let email = useRef()
    let from = useRef()
    let to = useRef()
    let seats = useRef()
    let starttime = useRef()
    let price = useRef()
    let date = useRef()

    useEffect(() => {
        setTimeout(() => {
            let getdata = JSON.parse(localStorage.getItem("token"))
            setticket(getdata)
            console.log(getdata);
        }, 1000);


    }, [])


    let ticketbook = () => {



        let data = JSON.stringify({
            email: email.current.value,
            bookticket: {
                from: from.current.value,
                to: to.current.value,
                seats: seats.current.value,
                starttime: starttime.current.value,
                price: price.current.value,
                date: date.current.value
            }
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:4200/api/bus/bookbus',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'JSESSIONID=67AA1C331E5507A16C0744FEC261739E'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert(response.data.message)
                localStorage.setItem("token", JSON.stringify(response.data))

            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.message)
            });
        navigate("/ticketbook")
    }

    return (
        <div>
            <Navbar />
            <h1>Book Your Trip</h1>
            <div className='book-page'>

                <div className='input-div'>


                    <form action="" >
                        {ticket ? <div><input type="hidden" name='email' placeholder='Verify your email' ref={email} value={ticket.data.email} /> </div> :
                            <div><input type="text" name='email' placeholder='Verify your email' ref={email} /> </div>}

                        <input type="text" placeholder='From' name='from' ref={from} required />
                        <input type="text" placeholder='To' name="to" ref={to} required />
                        <input type="number" name="seats" placeholder='Number of seats' id="" ref={seats} required />
                        <input type="time" name="starttime" placeholder='Starttime' ref={starttime} id="" required />
                        <input type="number" name="price" placeholder='Price' id="" ref={price} required />
                        <input type="date" name="date" id="" ref={date} required />
                        <input type="submit" value="Submit" onClick={ticketbook} className='button' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Bookticket