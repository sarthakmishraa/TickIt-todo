// TodoList.tsx

import React from "react";
import { Todo } from '../Model';
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return(
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div className={`Todos ${snapshot.isDraggingOver? 'dragactive':''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="TodosHeading">Tasks left</span>
              {
                todos?.map((todo, index) =>(
                  <SingleTodo index={index} todo={todo} todos={todos} key={todo.id} setTodos={setTodos}></SingleTodo>
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
        
      </Droppable>
      
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (

          <div className={`Todos ${snapshot.isDraggingOver? 'dragcomplete':'remove'}`} ref={provided.innerRef} {...provided.droppableProps}>
          <span className="TodosHeading">Tasks done</span>
            {
              completedTodos?.map((todo, index) =>(
                <SingleTodo index={index} todo={todo} todos={completedTodos} key={todo.id} setTodos={setCompletedTodos}></SingleTodo>
              ))
            }
            {provided.placeholder}
        </div>
        )}
        
      </Droppable>
    </div>

    // <div className="Todos">
    //   {todos.map(todo=>(
    //     <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}></SingleTodo>
    //   ))}
    // </div>
  )
}

export default TodoList;