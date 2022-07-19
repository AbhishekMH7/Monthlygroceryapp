import "./Grocerylist.css"
import React from 'react'
import axios from 'axios'

import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'

function Grocerylist(props) {
const itemlist = props.itemlist.map((item, index) => {
    const taskComplete = item => {
        axios.put(`http://localhost:8000/api/tasks/${item._id}` , {
            _id : item._id,
            item: item.todo,
            isPurchased : !item.isPurchased
        }).then(res => props.taskComplete(res.data)).catch(err => console.log(err))
    }
    const removeTask = id => {
        axios.delete(`http://localhost:8000/api/tasks/${id}`).then(res => props.removeTask(res.data)).catch(err => console.log(err))
    } 
    return <li key = {index}>
      <div style = {{display : 'flex'}}>
               <button className = {item.isPurchased ? 'isComplete' : 'checkicon'}>Check</button>
               <p className = {item.isPurchased ? 'taskcomplete' : ''} onClick = {() => {
                   taskComplete(item)
               }}>{item.todo}</p>
            </div>
            <div>
                <button className = 'edit' onClick = {() => {
                    props.tasktoUpdate(item)
                    props.showPopup()
                }}>Edit</button>
                <button className = 'close' onClick = {() => {
                    removeTask(item._id)
                }}>Close</button>
            </div>
    </li>
})
  return (
    <div className = 'tasklist'>
        <ul>
         {itemlist}
        </ul>
    </div>
  )
}

export default Grocerylist