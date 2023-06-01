import React, { useState } from "react";
import { ThemeContext } from "../../ContextProvider/ThemeContext";
import styles from "./Contact.module.css";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import emailjs from "@emailjs/browser"
import { useRef } from "react";
const Contact = () => {
  const { newTheme } = React.useContext(ThemeContext);
  const formRef = useRef()
  const [done, setdone] = useState(false)
  const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_o72x9vu', 'template_bn9vl9l', formRef.current, 'FgXUGcCtIftp_Rwoj')
      .then((result) => {
        console.log(result.text);
        setLoading(false);
        setdone(true);
        toast.success('Message sent successfully!');
         // Clear form fields
        formRef.current.reset();
      })
      .catch((error) => {
        console.log(error.text);
        setLoading(false);
        toast.error('Failed to send message. Please try again.');
      });
  };

  return (
    <footer className={styles.footer} id="contact">
      <ToastContainer />
      <div className={styles.container}>
        <h1 style={{ color: `${newTheme.title}` }}>Get in Touch</h1>
        <p style={{ color: `${newTheme.para}` }} className={styles.paragraph}>
          Building immersive digital experiences from front-end to back-end. Empowering businesses with innovative full stack solutions that elevate user engagement and drive results.
        </p>
        <div className={styles.wrapper} >
          <div className={styles.wrapper_left} >
            <h1 className={styles.title} >Contact Information</h1>
            <div className={styles.info} >
              <div className={styles.item} >
                <i class="fa fa-regular fa-phone fa-rotate-90"></i><span>+91 7665 135 229</span>
              </div>
              <div className={styles.item} >
                <i class="fa fa-light fa-envelope"></i> <span>dilipsinghf@gamil.com</span>
              </div>
              <div className={styles.item} >
                <i class="fa fas fa-map-marker"></i><span>Thane, Maharastra</span>
              </div>
              <div className={styles.mapDiv} >
                <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377068.6008836475!2d72.7610361234961!3d19.218330937827362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c89a2788b9f7%3A0x57731573bdc6bdf8!2sThane%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1621574942983!5m2!1sen!2sin" loading="lazy" ></iframe>
              </div>
            </div>

          </div>
          <div className={styles.wrapper_right}  >

            <form ref={formRef} onSubmit={handleSubmit} >
              <input required type="text" placeholder="Name" name="user_name" />
              <input required type="text" placeholder="Subject" name="user_subject" />
              <input required type="email" placeholder="email" name="user_email" />
              <textarea rows={"5"} placeholder="Message" name="message" />
              <button type="submit" className={styles.submitButton}>
                {loading ? (
                  <ClipLoader color="#ffffff" loading={loading} size={20} />
                ) : (
                  'Submit'
                )}
              </button>
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
        Designed and build by Dilip Singh, 2021 All rights reserved.
      </div>
    </footer>
  );
};

export default Contact;
