import React from 'react';
import emailjs from "emailjs-com";
import "./contact_style.css";
import pur1 from "./612.jpg";
import m1 from "./1612.jpg";
 

export default function Contact(){

function sendEmail(e){
        e.preventDefault();

            emailjs.sendForm('service_r5g39yb','template_ud20j7l', e.target, 'user_K83XbX60nfBfF33nMBaiX'
            ).then(res => {
                console.log("email enviado com sucesso")
                console.log(res);
            }).catch(err => console.log('Failed',err));
            e.target.reset()
    }


        return (
        <>
          <h1 className="about_text"> About Us</h1>
            <div className='descriçao'></div>
                <div className='grid1'>
                <div className='img-wrapper'>
                    <img className='zoom blur' src={pur1} alt=""/>
                    <div className='content fade'>  A plataforma UkVibes nasceu com o objetivo  de criar um novo método de ouvir música gratuitamente, facilitando a procura de músicas sem interrupções de anúncios. </div>
                </div>
                <div className='img-wrapper'>
                    <img className=' zoom blur' src={m1} alt=""/>
                    <div className='content fade'>Se tiveres alguma dúvida, por favor entre em contacto connosco </div>
                </div>
                </div>

                        <div className='container-border'>
                            <h1>Contact us</h1>

                            <form onSubmit={sendEmail}>
                            <div className='form-group'>
                                <label> Your Name</label>
                                <input 
                                    type='text' 
                                    name='name' 
                                    placeholder='Your Name'
                                    className='input_contact' required />
                            </div>

                            <div className='form-group'>
                                <label>Subject</label>
                                <input 
                                    type='text' 
                                    name='subject' 
                                    placeholder='Subject'
                                    className='input_contact' required />
                            </div>

                            <div className='form-group'>
                                <label>Your E-mail</label>
                                <input 
                                type='email' 
                                name='user_email' 
                                placeholder='Your E-mail Adress'
                                className='input_contact' />
                            </div>

                            <div className='form-group'>
                                <label>Your Message</label>
                                <textarea 
                                    name='message' 
                                    rows='5'
                                    placeholder='Your Message'
                                    className='textcontact'/>
                                <button 
                                    type='Submit'
                                    className='contact_button'
                                    >Send</button>
                            </div>
                            </form>
                        </div>       
            <footer>
                <div className='faixa'>
                        <h1>Contact</h1>
                            <a>Juary Júnior</a>
                            <a href="mailto: aluno218076@epad.edu.pt">aluno218076@epad.edu.pt</a>
                            <a>+351 987456321</a>    
                        <a>
                     &copy;{new Date().getFullYear()}  UKVIBES | All Rights Reserved 
                        </a>
                </div>
            </footer>
            </>


      );
    
};

