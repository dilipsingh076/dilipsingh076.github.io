import React, { useContext } from "react";
import GitHubCalendar from "react-github-calendar";
import { ThemeContext } from '../../ContextProvider/ThemeContext';

const Calendar = () => {
  const { newTheme } = useContext(ThemeContext);
  const github = {
    margin: "auto",
    border: "5px solid #A3E900",
    padding: "20px",
    borderRadius: "10px",
  };

  return (
    <div className="github" style={{color:"rgb(253, 245, 247)"}} >
      <h1 style={{color:newTheme.title}}>Days I Code</h1>

      <div
        w={["100%", "100%", "65%"]}
        style={github}
        className="github_Calender"
      >
        <GitHubCalendar
          style={{ margin: "auto" }}
          username="dilipsingh076"
          year={new Date().getFullYear()}
        />
      </div>
      
      <div>
        <h1 style={{color:newTheme.title}}>My Github Stats</h1>
        <div>
          <img
            src="https://github-readme-stats.vercel.app/api?username=dilipsingh076&show_icons=true&&countprivate=true&theme=react&hide_title=true"
            alt="GitHub stats"
            width="80%"
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
