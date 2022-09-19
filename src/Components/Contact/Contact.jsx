import React, { useState } from "react";
import { ThemeContext } from "../../ContextProvider/ThemeContext";
import styles from "./Contact.module.css";
import phone from "../../assets/phone.png"
import email from "../../assets/email.png"
import map from "../../assets/map.png"
import emailjs from "@emailjs/browser"
import { useRef } from "react";
const Contact = () => {
  const { newTheme } = React.useContext(ThemeContext);
  const formRef = useRef()
  const [done,setdone] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_o72x9vu', 'template_bn9vl9l', formRef.current, 'lpvfFWv7lnVoBlpqa')
      .then((result) => {
        console.log(result.text);
        setdone(true)
      }, (error) => {
        console.log(error.text);
      });
  }
 
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <h1 style={{ color: `${newTheme.title}` }}>Get in Touch</h1>
        <p style={{ color: `${newTheme.para}` }} className={styles.paragraph}>
          I'm actively looking for any new opportunities, in full-stack web
          development.
        </p>

        {/* <p style={{ color: `#00a0a0`, lineHeight: ``, fontSize: `20px` }}>
          
          Email: dilipsinghf@gmail.com
        </p>

        <p style={{ color: `#00a0a0`, fontSize: `20px` }}>
          Mobile: +91-<span style={{ color: `#00a0a0`, fontSize: `20px`, textDecoration: `underline` }} >7665135229</span>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
        </p>
        <p style={{ color: `#00a0a0`, fontSize: `20px` }}>
          Location: Thane, Maharastra, India {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
        </p> */}
        <div className={styles.wrapper} >
          <div className={styles.wrapper_left} >
            <h1 className={styles.title} >Take A Coffee & Chat With Me...</h1>
            <div className={styles.info} >
              <div className={styles.item} >
                <img src={phone} alt="phone" className={styles.icon} /> +91 7665 135 229
              </div>
              <div className={styles.item} >
                <img src={email} alt="phone" className={styles.icon} /> dilipsinghf@gamil.com
              </div>
              <div className={styles.item} >
                <img src={map} alt="phone" className={styles.icon} /> Thane, Maharastra
              </div>
            </div>

          </div>
          <div className={styles.wrapper_right}  >

            <form ref={formRef} onSubmit={handleSubmit} >
              <input type="text" placeholder="Name" name="user_name" />
              <input type="text" placeholder="Subject" name="user_subject" />
              <input type="email" placeholder="email" name="user_email" />
              <textarea rows={"5"} placeholder="Message" name="message" />
              <button  >Submit  </button>
              {done && "Thank you..."} 
            </form>
          </div>

        </div>

        <div
          style={{ color: `${newTheme.title}` }}
          className={styles.contactOptions}
        >
          <a
            href="tel:7665135229"
            aria-label="GitHub"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fas fa-phone-alt" />
          </a>
          <a
            href="mailto: dilipsinghf@gamil.com"
            aria-label="email"
            target="_blank"
            rel="noreferrer"
          >
            <i className="far fa-envelope"></i>
          </a>

          <a
            href="https://github.com/dilipsingh076"
            aria-label="GitHub"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fab fa-github" />
          </a>

          <a
            href="https://www.linkedin.com/in/dilip-singh-35a377219/"
            aria-label="Linkedin"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>
      <div style={{ background: `${newTheme.line}` }} className={styles.line} />
      <div style={{ color: `${newTheme.para}` }} className={styles.copyright}>
        Designed and build by Dilip Singh, 2022 All rights reserved.
      </div>
    </footer>
  );
};

export default Contact;
