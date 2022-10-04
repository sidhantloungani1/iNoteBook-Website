import React from 'react'

export default function Alert(props) {

  const capitalize = (word) => {
    if(word === "danger"){

      word = "error"

    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);

  }

  return (
    props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
      {capitalize(props.alert.type)} : {props.alert.message}
    </div>
  )
}
