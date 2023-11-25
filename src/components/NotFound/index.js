import React from 'react'
import { MdOutlineErrorOutline } from "react-icons/md";
import "./index.css"

function NotFound() {
  return (
    <div className='not-found-container'>
      <MdOutlineErrorOutline className='not-found-icon'/>
     <h3>Not Found</h3>
    </div>
  )
}

export default NotFound
