import React from 'react'
import { RiCloseFill } from 'react-icons/ri'

const Modal = ({ children, show, close }) => {
  if (!show) return null

  return (
    <div className="modal">
      <div className="container_add">
        <i
        onClick={close}>
        <RiCloseFill/>
        </i>
        {children}
      </div>
    </div>
  )
}

export default Modal 