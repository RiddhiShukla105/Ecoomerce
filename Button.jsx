import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'

const Button = ({onClick,name,icon}) => {
  return (
    <div>
      <button onClick={onClick} className='btn'>{icon}{name}</button>
    </div>
  )
}

export default Button
