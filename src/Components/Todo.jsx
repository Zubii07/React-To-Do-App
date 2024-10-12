import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";

const Todo = () => {
  const [todoList, settodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const InputRef = useRef();

  const Add = () => {
    const inputText = InputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    settodoList((prev) => [...prev, newTodo]);
    InputRef.current.value = "";
  };
  const deleteTodo = (id) => {
    settodoList((prevTodos) => {
      return prevTodos.filter((Todo) => Todo.id !== id);
    });
  };
  const toggle = (id) => {
    settodoList((prevTodos) => {
      return prevTodos.map((Todo) => {
        if (Todo.id === id) {
          return { ...Todo, isComplete: !Todo.isComplete };
        }
        return Todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }),
    [todoList];
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/*-------Title------*/}
      <div className="flex items-center-mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">Todo List</h1>
      </div>

      {/*-------Input Box------*/}
      <div className=" flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={InputRef}
          className="bg-transparent border-0 outline-none flex-1 h-10 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={Add}
          className="border-none rounded-full bg-orange-600 w-28 h-10 text-white text-lg font-medium cursor-pointer"
        >
          ADD
        </button>
      </div>

      {/*-------Todo List------*/}
      <div>
        {todoList.map((items, index) => {
          return (
            <Todoitems
              key={index}
              text={items.text}
              id={items.id}
              isComplete={items.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
