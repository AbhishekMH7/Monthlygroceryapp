import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import axios from'axios';

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(arr);
  const [error, setError] = useState("");

  const getItems=()=>{
    axios.get('http://localhost:3001/grocery/getall').then(res => {
       setList(res.data)
    }).catch(err => console.log(err));
    return [list];
  }

  const handleSubmit = () => {
    axios.post('http://localhost:3001/grocery/add', {
            item : item,
            isPurchased : false
        }).then(res => {
            setItem("")
            console.log(res.data)
        }).catch(err => console.log(err))
  };

  React.useEffect(() => {
    getItems()
  }, []);

  var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date()
  var monthName = months[date.getMonth()]; 
  console.log(monthName);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="App">
      <p className="bckg">Monthly Grocery Planning App</p><br></br>
      <h1 className="product-month">Plan for the month of {monthName}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={item}
          placeholder="Add shopping item"
          onChange={handleChange}
        />
          <button className="btn" type="submit">
            Add Item
          </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div>
        {list.map((c, id) => (
          <Item
            key={id}
            id={c._id}
            item={c.item}
            list={list}
            setList={setList}
            complete={c.complete}
            setItem={setItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
