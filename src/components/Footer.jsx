// import React from 'react'
import instaImg1 from "../assets/instagram-1.jpg"
import instaImg2 from "../assets/instagram-2.jpg"
import instaImg3 from "../assets/instagram-3.jpg"
import instaImg4 from "../assets/instagram-4.jpg"
import instaImg5 from "../assets/instagram-5.jpg"
import instaImg6 from "../assets/instagram-6.jpg"

const Footer = () => {
  return (
    <>
    <footer className="section__container footer__container">
        <div className="footer__col">
            <h4>CONTACT INFO</h4>
            <p>
                <span><i className="ri-map-pin-fill"></i></span>
                844101, Hajipur, Vaishali, Bihar
            </p>
            <p>
                <span><i className="ri-mail-fill"></i></span>
                <a href="mailto:kumarvaibhav844101@gmail.com">kumarvaibhav844101@gmail.com</a>
            </p>
            <p>
                <span><i className="ri-phone-fill"></i></span>
                +91 7061964038
            </p>
        </div>

        <div className="footer__col">
            <h4>COMPANY</h4>
            <a href="/">Home</a>
            <a href="/">About Us</a>
            <a href="/">Work With Us</a>
            <a href="/">Our Blog</a>
            <a href="/">Terms & Conditions</a>
        </div>

        <div className="footer__col">
            <h4>USEFUL LINK</h4>
            <a href="/">Help</a>
            <a href="/">Track your Order</a>
            <a href="/">Men</a>
            <a href="/">Women</a>
            <a href="/">Dresses</a>
        </div>

        <div className="footer__col">
            <h4>INSTAGRAM</h4>
            <div className="instagram__grid">
                <img src={instaImg1} alt="" />
                <img src={instaImg2} alt="" />
                <img src={instaImg3} alt="" />
                <img src={instaImg4} alt="" />
                <img src={instaImg5} alt="" />
                <img src={instaImg6} alt="" />
            </div>
        </div>
    </footer>

    <div className="footer__bar">
        copyright @ 2024 by Glamora. All rights reversed.
    </div>
    </>
  )
}

export default Footer