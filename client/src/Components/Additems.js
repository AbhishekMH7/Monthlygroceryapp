import './Additems.css'
import React, {useState} from 'react'
import axios from 'axios'

function Additems(props) {
 const [item, setItem] = useState("")
 const additems = () => {
    console.log(item)
    if(item.trim() === ''){
        return
    } else {
        axios.post('http://localhost:8000/api/tasks', {
            item : item,
            isPurchased : false
        }).then(res => {
            setItem("")
            props.addItem(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }
 }
  return (
    <div className = 'addtask'>
        <input type = 'text' placeholder= 'Add Item . . . ' value = {item} onChange = {event => setItem(event.target.value)} ></input>
        <button onClick = {() => additems()}>Enter</button>
    </div>
  )
}

export default Additems