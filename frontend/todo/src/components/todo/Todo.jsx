import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import "./Todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const Todo = () => {
  const [Input, setInput] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const [toupdateArray, setToupdateArray] = useState(null);
  const { user, isLoggedIn } = useSelector((state) => state);
  const id = user?._id;

  const getTempTasks = () => {
    const temp = localStorage.getItem("tempTasks");
    return temp ? JSON.parse(temp) : [];
  };

  const saveTempTasks = (tasks) => {
    localStorage.setItem("tempTasks", JSON.stringify(tasks));
  };

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const handleSubmit = async () => {
    if (Input.title === "" || Input.body === "") {
      toast.error("Title or Body Should Not be empty");
    } else {
      if (id) {
        try {
          const response = await axios.post("http://localhost:8080/api/v2/addTask", {
            title: Input.title,
            body: Input.body,
            id: id
          });
          console.log(response);
          const newTask = { title: Input.title, body: Input.body, _id: response.data.list._id };
          setArray([...Array, newTask]);
          setInput({ title: "", body: "" });
          toast.success("Task Added Successfully");
        } catch (error) {
          console.error("Error adding task:", error);
          toast.error("Failed to add task");
        }
      } else {
        const newTask = { title: Input.title, body: Input.body, _id: Date.now().toString() };
        const updatedArray = [...Array, newTask];
        setArray(updatedArray);
        saveTempTasks(updatedArray);
        setInput({ title: "", body: "" });
        toast.success("Task Added Temporarily");
      }
    }
  };


  const del = async(cardId) => {
    if(id){
      try {
        await axios.delete(`${window.location.origin}/api/v2/deleteTask/${cardId}`, { data: { id: id } });
        const updatedArray = Array.filter((item) => item._id !== cardId);
        setArray(updatedArray);
        toast.success("Task Deleted Successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      }
    } else {
      const updatedArray = Array.filter((item) => item._id !== cardId);
      setArray(updatedArray);
      saveTempTasks(updatedArray);
      toast.success("Task Deleted Temporarily");
    }
  };

  const dis = (value) => {
    const modal = document.getElementById("todo-update");
    modal.style.display = value === "none" ? "none" : "block";
  };
const update = (value) => {
  setToupdateArray(Array.find(item => item._id === value));
}

  const saveTempToDB = async (tempTasks) => {
    if (tempTasks.length > 0) {
      try {
        for (const task of tempTasks) {
          await axios.post(`${window.location.origin}/api/v2/addTask`, {
            title: task.title,
            body: task.body,
            id: id
          });
        }
        localStorage.removeItem("tempTasks");
        toast.success("Temporary tasks saved to account");
      } catch (error) {
        console.error("Error saving temp tasks:", error);
        toast.error("Failed to save temporary tasks");
      }
    }
  };

  const updateArray = (updatedTask) => {
    setArray((prevArray) =>
      prevArray.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (id) {
        // Save temp tasks to DB if any
        const tempTasks = getTempTasks();
        await saveTempToDB(tempTasks);

        // Fetch user's tasks
        try {
          const res = await axios.get(`${window.location.origin}/api/v2/getTask/${id}`);
          setArray(res.data.list);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to load tasks");
        }
      } else {
        // Clear tasks on logout
        setArray([]);
      }
    };

    fetchTasks();
  }, [id]);
   

  return (
    <div className="todo">
      <ToastContainer />
      <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
        <div className="d-flex flex-column todo-input-div w-100 p-2">
          <input
            type="text"
            placeholder="TITLE"
            className="my-2 p-2 todo-input"
            onClick={show}
            name="title"
            value={Input.title}
            onChange={handleChange}
          />
          <textarea
            id="textarea"
            type="text"
            placeholder="BODY"
            name="body"
            className="p-2 todo-input"
            value={Input.body}
            onChange={handleChange}
          />
        </div>

        <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
          <button className="home-btn px-2 py-1" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>

      <div className="todo-body">
        <div className="container-fluid">
          <div className="row">
            {Array.map((item, index) => (
              <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={item._id || index}>
                <TodoCards
                  title={item.title}
                  body={item.body}
                  id={index}
                  taskId={item._id}
                  delid={del}
                  display={dis}
                  updateId={index}
                  tobeupdate={update}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="todo-update " id="todo-update">
        <div className="container update">
          <Update display={dis} update={toupdateArray} updateArray={updateArray} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
