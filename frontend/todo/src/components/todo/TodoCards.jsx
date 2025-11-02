import React from "react";
import "./Todo.css";
import { MdDelete } from "react-icons/md";
import { MdBrowserUpdated } from "react-icons/md";

const TodoCards = ({ title, body, id, delid, display, updateId, tobeupdate, taskId }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{body.split("", 77).join("") + (body.length > 77 ? "..." : "")}</p>
      </div>

      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={() => {
            display("block");
            tobeupdate(taskId);
          }}
        >
          <MdBrowserUpdated className="card-icons" /> Update
        </div>

        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => {
            delid(taskId || id);
          }}
        >
          <MdDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
