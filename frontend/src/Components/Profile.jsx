import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('');


const Profile = () => {

    let [singleuser, setsingleuser] = useState("")
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: null,
    });

    let navigate = useNavigate()




    useEffect(() => {



        setTimeout(() => {
            let retrivedata = JSON.parse(localStorage.getItem("token"))
            setsingleuser(retrivedata)
        }, 1000)



    }, [])



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };



    let Profileedit = async (e) => {
        e.preventDefault()


        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('image', formData.image);

        try {
            const response = await axios.put('http://localhost:4200/api/bus/updateprofile', data, {
                headers: {
                    'Cookie': 'JSESSIONID=67AA1C331E5507A16C0744FEC261739E',
                    'Content-Type': 'multipart/form-data',
                },
            });
            setsingleuser(response.data); // Assuming the response contains updated user data
            localStorage.setItem("token", JSON.stringify(response.data))
            closeModal();
            navigate("/profile")

        } catch (error) {
            console.error(error.response.data.message);

            alert(error.response.data.message)

        }

    }


    let logout = () => {


        localStorage.removeItem("token")
       
        navigate("/")
    }


    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }



    return (
        <div className='mainprofile' >
            <Navbar />

            <div className="cover-page">
                <img src="https://static.vecteezy.com/system/resources/previews/010/200/115/original/internet-service-for-book-and-buy-bus-ticket-travel-and-tourism-concept-tourist-planning-trip-online-passengers-buying-tickets-for-bus-in-mobile-app-vector.jpg" alt="" />
            </div>

            {singleuser &&
                <div className="profile">
                    <img src={singleuser.data.image} alt='add image' />

                    <h5>Name:{singleuser.data.name}</h5>
                    <h5>Email:{singleuser.data.email}</h5>

                    <button onClick={openModal} >Edit Profile</button>

                    <button onClick={logout} >logout</button>
                    <Link to="/ticketbook" ><button >Book Ticket</button></Link>
                    <div className='view'>
                <Link to="/viewticket"  ><button >View Ticket</button></Link>
            </div>
                </div>}
            


            <div className='maineditprofile'>

                {/* <button onClick={openModal}>Open Modal</button> */}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Profile</h2>
                    {/* <button onClick={closeModal}>close</button> */}
                    <div className='profileinput' >
                        <form>
                            <input type="text" name='name' placeholder='Enter your name' value={formData.name} onChange={handleInputChange} required />
                            <input type="email" name='email' placeholder='Enter your email' value={formData.email} onChange={handleInputChange} required />
                            <input type="file" name="image" id="" accept="image/*" onChange={handleImageChange} required />
                            {/* <button>tab navigation</button>
    <button>stays</button> */}
                            <button onClick={closeModal}>Close</button>
                            <button onClick={Profileedit} >Submit</button>
                        </form>
                    </div>
                </Modal>

            </div>

        </div>

    )

}

export default Profile