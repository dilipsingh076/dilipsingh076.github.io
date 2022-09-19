
import React from "react";
import { ThemeContext } from "../../ContextProvider/ThemeContext";
// import WindowSize from "../../Utils/WindowSize";
import styles from "./About.module.css"


const About = () => {
  const { newTheme } = React.useContext(ThemeContext);

  return (
    <>
      
      <div className={styles.container} style={{ boxShadow: `3px 3px 5px ${newTheme.line}` }} >

        <div className={styles.first}><iframe title="gif" src={"https://giphy.com/embed/qgQUggAC3Pfv687qPC"}   ></iframe></div>

        <div className={styles.second}>
          <h1 style={{ color: `${newTheme.title}` }} className={styles.heading}>
            About Me
          </h1>
          <div className={styles.borderBottom} />
          <p style={{ color: `${newTheme.para}` }} className={styles.aboutMe}>
            Hello! My name is Dilip singh and I like to build websites/application that
            serves the world and always want to enhance my knowledge & adpot new
            technologies that make impact on people. My interest in web
            development started when I joined Masai School to learn full stack
            Web-Development — taught me alot about HTML, CSS javascript & React. <br />
            <br /> Fast Forwarding to today, I built a number of web applications
            and major projects. Learned a great deal about teamwork, leadership,
            and communication. After months of rigorous training, here I am
            <span style={{ color: `#00a0a0` }}>
              {" "}
              looking for an opportunity as a full stack web developer
            </span>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default About;




{/* <div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/qgQUggAC3Pfv687qPC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/dommespace-domme-space-programador-qgQUggAC3Pfv687qPC">via GIPHY</a></p> */ }