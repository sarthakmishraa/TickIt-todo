// InputField.tsx

import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return(
    <form className="Input" onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}>
      <input type="input" placeholder="Enter your task" className="InputBox" value={todo} onChange={(e) => setTodo(e.target.value)} ref={inputRef}></input>
      <button type="submit" className="InputButton">Enter</button>
    </form>
  )
}

export default InputField;