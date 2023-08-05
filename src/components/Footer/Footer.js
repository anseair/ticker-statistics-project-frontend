import React from 'react';
import '../../CSS/footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer__container ">
            <ul className="footer__contact">
                <li>oll@investing.com</li>
                <li>+972 53 111111</li>
            </ul>
            <span className="footer__logo logo">
            Stock<span className="logo__part--them-light">Stat</span></span>
            </div>
        </footer>
    );
};

export default Footer;