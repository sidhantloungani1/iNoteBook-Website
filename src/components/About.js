import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  
    const a = useContext(noteContext)
    
    return (  
    <div>
        My name is {a.name}
    </div>
  )
}

export default About
