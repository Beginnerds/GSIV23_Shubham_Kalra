import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./SearchBar.module.css";
import { colors } from "../../util/colors";

export default function SearchBar({setQuery}) {

  if(!setQuery || typeof setQuery != "function"){
    console.error("Invalid setQuery passed.")
  }

  const [timeoutTag,setTimeoutTag] = useState(null);

  // send value at .5s intervals so as not to spam too many search requests
  function onValueChange(data){
    console.log(data);
    if(timeoutTag){
      clearTimeout(timeoutTag);
    }

    let t = setTimeout(()=>{
      setQuery.call(this,data.target.value)
    },500)

    setTimeoutTag(t);
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer} style={{backgroundColor:colors.disabled}}>
        <span className={styles.searchIconContainer}>
          <SearchIcon />
        </span>
        <input onChange={onValueChange} className={styles.input} type="text" placeholder="Search" style={{backgroundColor:colors.disabled}}/>
      </div>

      <HomeIcon />
    </div>
  );
}
