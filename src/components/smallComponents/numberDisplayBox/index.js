import React from 'react'
import "./index.scss"
export default function NumberDisplayBox(props) {
  return (
    <div className="numberContainer">
        <h3 className="numberContainer__header">{props.header}</h3>
        <p className="numberContainer__content">{props.number}</p>
    </div>
  )
}
