import React from "react";
import "./Item.css";
import axios from'axios';

const Item = ({
  id,
  item,
  list,
  setList,
  complete,
}) => {
  //Delete Item
  const remove = (id) => {
    console.log(id);
    axios.delete('http://localhost:3001/grocery/deleteGroceryItem', {
      data: {
        _id: id
      }
    }).then(res => {
      console.log(res.data)
  }).catch(err => console.log(err));
    setList(list.filter((item) => item._id !== id));
  };

  //Mark Item completed
  const handleComplete = (id) => {
    console.log(id);

    axios.put('http://localhost:3001/grocery/updatePurchaseStatus',{
                _id : id
            }).then(res => {
                console.log(res.data)
            }).catch(err => console.log(err))
            setList(
              list.map((item) => {
                if (item._id === id) {
                  return {
                    ...item,
                    complete: !item.complete,
                  };
                }
                return item;
              })
            );
  };

  return (
    <div className="item">
      <input
        type="text"
        value={item}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: "black",
          fontSize: "20px",
        }}
        className={complete ? "complete" : ""}
      />
      <button className="btnP" onClick={() => handleComplete(id)}>Purchased</button>
      <button  onClick={() => remove(id)}>x</button>
    </div>
  );
};
export default Item;
