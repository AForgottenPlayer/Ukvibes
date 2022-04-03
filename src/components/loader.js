import React from 'react'
import LoaderImage from "../images/loader.svg"

export default function Loader() {
  return (
    <div style={{height: "60vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <img src={LoaderImage} alt="loader"/>
    </div>
  )
}
