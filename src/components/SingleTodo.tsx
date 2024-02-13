// SingleTodo.tsx

import React, { useState, useRef, useEffect } from "react";
import { Todo } from '../Model';
import { RiEdit2Fill, RiDeleteBin7Fill } from "react-icons/ri";
import { FaCheckSquare } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({index, todo, todos, setTodos}: Props) => {

  const [edit, setEdit] = useState<boolean>(false);

  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
        todos.map((todo) => todo.id === id ? {...todo, isDone:!todo.isDone}: todo)
      )
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => ( todo.id === id ? {...todo, todo: editTodo} : todo))
      );
      setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return(
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form className={`SingleTodo ${snapshot.isDragging ? 'drag' : ""}`} onSubmit={(e) => {handleEdit(e, todo.id)}} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {
            edit ? (
              <input ref={inputRef} value={editTodo} onChange={(e) => {setEditTodo(e.target.value)}} className="SingleTodoText"></input>
            ):(
                  todo.isDone ? (
                  <s className="SingleTodoText">{todo.todo}</s>
                ):
                (
                  <span className="SingleTodoText">{todo.todo}</span>
                )
            )
          }

          <div>
            <span className="Icon" onClick={ () => {
              if (!edit && !todo.isDone){
                setEdit(!edit);
              }
            }}>
            <RiEdit2Fill />
            </span>
            <span className="Icon" onClick={() => {handleDelete(todo.id)}}>
            <RiDeleteBin7Fill />
            </span>
            <span className="Icon" onClick={() => {handleDone(todo.id)}}>
            <FaCheckSquare />
            </span>
          </div>
      </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;