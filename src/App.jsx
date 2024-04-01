import { useState,useEffect } from "react"
import Navbar from "./assets/components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


export default function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([]) //todo is an array which is used to store
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      settodos(todos)
    }
  }, [])
  
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  


  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newTodos)
    saveToLS()
  }
  const handleCheckBox=(e) => {
    console.log(e,e.target)
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    // newTodos[index] = { ...newTodos[index], isCompleted: !newTodos[index].isCompleted };
    settodos(newTodos)
    saveToLS()
  }
  
  const handleDelete=(e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newTodos)
    saveToLS()
    
  }
  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}]);
    console.log(todos)
    settodo("")
    saveToLS()
  }
  const handleChange=(e)=>{
    settodo(e.target.value)
    
  }
  const toggleFinished=()=>{
    setshowFinished(!showFinished)
  }
  return ( 
    <div>
      <Navbar />
      <div className="containter mx-auto my-5 rounded-xl bg-violet-100 p-5 w-3/4 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value = {todo} type="text" className="w-1/2" name = "changing"/>
          <button onClick = {handleAdd} disabled = {todo.length<=3} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold disabled:bg-violet-200
           text-white rounded-md mx-6">Save</button>
        </div>
        {/* <input type="checkbox" checked = {showFinished} onClick = {toggleFinished} name="finsish" id="" /> Show Finished */}
        <input type="checkbox" onClick = {toggleFinished} name="finsish" id="" /> Show Finished
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5"> No Todos to display</div>}
          {todos.map(item=>{
          return (showFinished || !item.isCompleted) && <div key = {item.id} 
          className="todo flex  my-3 justify-between px-1 w-2/4">
            <div className="flex gap-5">
            <input name = {item.id}  onChange = {handleCheckBox} type="checkbox" checked = {item.isCompleted}  />

            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex">
              <button onClick = {(e)=>{handleEdit(e,item.id)}} className = 'bg-violet-800 hover:bgviolet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick = {(e)=>{handleDelete(e,item.id)}} className = 'bg-violet-800 hover:bgviolet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteForever /></button>
            </div>
          </div>
                    })}
        </div>
      </div>
    </div>
  )
}

