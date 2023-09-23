import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Viewticket = () => {

    let [ticketlist, setticketlist] = useState("")
   

    useEffect(() => {
        setTimeout(() => {
            let getdata = JSON.parse(localStorage.getItem("token"))
            setticketlist(getdata)
            // setlist(getdata)
            console.log(getdata);
        }, 1000);


    }, [])

    return (
        <div>
            <Navbar />
            <h1>Ticket Details</h1>
            <div>


                {ticketlist.data && (

                    <div>

                        {ticketlist.data.bookticket.map((show, i) => (
                            <div key={i} className="details">
                                <div>
                                    <table className='tabledata'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>from</th>
                                                <th>to</th>
                                                <th>date</th>
                                                <th>price</th>
                                                <th>seats</th>
                                                <th>time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="product-list"></tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{show.from}</td>
                                            <td>{show.to}</td>
                                            <td>{show.date}</td>
                                            <td>{show.price}</td>
                                            <td>{show.seats}</td>
                                            <td>{show.starttime}</td>

                                        </tr>
                                    </table>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>


        </div>
    )
}

export default Viewticket