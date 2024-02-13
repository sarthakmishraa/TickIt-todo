// App.tsx

import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './Model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      setTodo("");
    }
  };
  
  const onDragEnd = (result: DropResult) => {
    // console.log(result);
    const { source, destination } = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;
    
    let add;
    let active = todos;
    let complete = completedTodos;

    if(source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    }
    else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    }
    else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="Heading">Tick It</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}></InputField>
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}></TodoList>
      </div>
    </DragDropContext>
  );
}

export default App;