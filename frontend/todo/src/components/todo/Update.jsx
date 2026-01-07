import React from "react";
import {  toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Update = ({ display, update, updateArray }) => {
  const [Input, setInput] = useState({ title: "", body: "" });

  useEffect(() => {
    if (update) {
      setInput({ title: update.title || "", body: update.body || "" });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const submit = async () => {
    if (!update || !update._id) {
      toast.error("No task selected for update");
      return;
    }
    if (updateArray) {
      try {
        const response = await axios.put(`${API_BASE_URL}/api/v2/updateTask/${update._id}`, {
          title: Input.title,
          body: Input.body,
          id: sessionStorage.getItem("id")
        });
        toast.success("Your Task Is Updated Successfully");
        // Update local state
        updateArray(response.data.updatedTask);
        display("none");
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task");
      }
    } else {
      // Update temp task
      const tempTasks = JSON.parse(localStorage.getItem("tempTasks") || "[]");
      const index = tempTasks.findIndex(task => task._id === update._id);
      if (index !== -1) {
        tempTasks[index] = { ...tempTasks[index], title: Input.title, body: Input.body };
        localStorage.setItem("tempTasks", JSON.stringify(tempTasks));
        toast.success("Task Updated Temporarily");
        // Update local state
        updateArray(tempTasks[index]);
        display("none");
      } else {
        toast.error("Task not found");
      }
    }
  };
  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h1>Update Your Task</h1>
      <input type="text"name="title" className="todo-input my-4 w-100 p-3" value={Input.title}onChange={change} />
      <textarea name="body" className="todo-input w-100 p-3" value={Input.body} onChange={change}/>
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>Update</button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={()=>{
            display("none")
          }}        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
