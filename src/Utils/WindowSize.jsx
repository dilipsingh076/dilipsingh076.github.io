import { useLayoutEffect, useState } from "react";


function WindoSize(){
    const [size,setSize] = useState([0,0]);

    useLayoutEffect(()=>{
        function updateSize(){
            setSize([window.innerWidth,window.innerHeight])
        }
        window.addEventListener("resize",updateSize);
        updateSize();
        return ()=> window.removeEventListener("resize",updateSize)
    },[])
    return size;
}
export default WindoSize;