import React from 'react';
import '../../CSS/contacts.css'
import {contactsImages} from "../../utils/constants";

const Contacts = () => {
    return (
        <>
            <section className="page__header">
                <div className="page__container">
                    <h1 className="page__title">Contacts</h1></div>
            </section>
            <section className="contacts">
                <h5 className="contact__subtitle">Our Location and Contact Information</h5>
                <h3 className="contact__title">Let Us Help You with Your Questions and Concerns
                </h3>
                <p className="contact__text">You can reach us by phone, email, or through our online contact form.
                    Our team is
                    committed to providing exceptional customer service and will respond to your inquiries promptly.
                    Don't hesitate
                    to contact us - we are here to help you!</p>
                <div className="contacts__container">
                    <ul>
                        <li className="contact__item">
                            <img src={contactsImages[0]}/>
                            <h4>oll@investing.com</h4>
                            <h6>Online 24 hours</h6>
                        </li>
                        <li className="contact__item">
                            <img src={contactsImages[1]}/>
                            <h4>+972 53 111111</h4>
                            <h6>Support 24/7</h6>
                        </li>
                        <li className="contact__item">
                            <img src={contactsImages[2]}/>
                            <h4>Prof. Menakhem Plaut St 10, Rehovot</h4>
                            <h6>Sun - Fr: 8.00 - 18.00</h6>
                        </li>
                    </ul>
                </div>
            </section>
            <div className="map"></div>
        </>
    );
};

export default Contacts;