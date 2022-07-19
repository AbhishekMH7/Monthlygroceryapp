import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Additems from './Components/Additems'
import Grocerylist from './Components/Grocerylist'
import Updatetask from './Components/Updatetask'

function App() {
  const [itemlist , setItemlist ] = useState([])
  const [tasktoUpdate , setTasktoUpdate] = useState({})
  const [showPopup,setShowPopup] = useState(false)
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks').then(res => {
       setItemlist(res.data)
    }).catch(err => console.log(err))
  },[])

  const addItem = (newItem) => {
    setItemlist([...itemlist, newItem ])
}
  const taskComplete = item => {
  const newList = [...itemlist]
  newList.forEach(data => {
    if(data._id === item._id){
      data.isPurchased = item.isPurchased
    }
  })
  setItemlist(newList)
}
const removeTask = item => {
  const newList = itemlist.filter(data => !(data._id === item._id))
  setItemlist(newList)
}
const updatetask = item => {
  const newList = [...itemlist]
  newList.forEach(data => {
    if(data._id === item._id){
      data.item = item.item
    }
  })
  setItemlist(newList)
}

  return (
    <div>
      <Additems addItem = {addItem}> </Additems>
      <Grocerylist itemlist = { itemlist } taskComplete = {taskComplete} removeTask = {removeTask} tasktoUpdate = {task => setTasktoUpdate(task)} showPopup = {() => setShowPopup(!showPopup)}></Grocerylist>
      {/* {showPopup && <Updatetask task = {tasktoUpdate} updatetask = {updatetask} removePopup = {() => setShowPopup(!showPopup)}/>} */}
      {showPopup && < Updatetask task = {tasktoUpdate} updatetask = {updatetask} removePopup = {() => setShowPopup(!showPopup)}></Updatetask>}
    </div>
  )
}

export default App
