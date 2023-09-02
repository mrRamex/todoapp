import './App.css';
import { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";

function App() {

  const [newItem, setNewItem] = useState("")
  const [items, setItems] = useState([])

  const [showEdit, setShowEdit] = useState(-1)
  const [updatedText, setUpdatedText] = useState('')

  //Adds a new item to the list array
  const addItem = () => {
    // ! Check for empty otem
    if (!newItem) {
      alert("Press enter an item")
      return
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    }

    // Add new item to items array
    setItems((oldList) => [...oldList, item])

    // Reset newItem back to original state
    setNewItem("")
  }

  // Deletes an item based onn the 'item.id' key
  const deleteItem = (id) => {
    const newArray = items.filter(item => item.id !== id)
    setItems(newArray)
  }

  // Edit an item text after creating it.
  const editItem = (id, newText) => {
    //Get the current item
    const currentItem = items.filter((item) => item.id === id)

    //Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    }

    deleteItem(id)

    //Replace item in the item list
    setItems((oldList) => [...oldList, newItem])
    setUpdatedText("")
    setShowEdit(-1)
  }

  return (
    <div className="App">
      {/*1. Header */}
      <div className='header'>
        <h1>My Todo List</h1>
      </div>


      <div className='form'>
        <div className='add-item'>
          {/*2. Add new item (input)*/}
          <input
            type="text"
            placeholder='Add an item...'
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />

          {/* Add (button) */}
          <button onClick={() => addItem()}>Add</button>
        </div>


        {/*3. List of todos (unordered list)*/}
        <div className='wrapp'>
          <ul>
            {items.map((item) => {
              return(
                <div className='item'>
                  <li key={items.key} onClick={() => setShowEdit(item.id)}>
                    {item.value}

                    <AiOutlineDelete size={20} color='black' className="delete-btn" onClick={() => deleteItem(item.id)}/> 
                  </li>

                  {showEdit === item.id ? (
                    <div>
                      <input type="text" 
                        value={updatedText} 
                        onChange={(e) => setUpdatedText(e.target.value)}
                      />

                      <button onClick={() => editItem(item.id, updatedText)}>
                        Update
                      </button>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
