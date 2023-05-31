import { useContext } from "react"
import {ThemeContext} from "../../ContextProvider/ThemeContext"
import styles from "./Button.module.css"
export const Button =({text,handleButton,padding})=>{
    const {newTheme}  = useContext(ThemeContext);

return(
    <button
    style={{
				color: `${newTheme.title}`,
				background: `${newTheme.linkHover}`,
				padding: `${padding}`,
			}}
			className={styles.buttonComponent}
     onClick={()=> handleButton()} >
        <span>{text}</span>
    </button>
)
}