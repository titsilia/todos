import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { addTodo, deleteTodo, toggleTodo } from "./todo/todo";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const todoItems = useSelector((store) => store.todos);

  const idInput = useRef();

  const [valueInput, setValueInput] = useState("");

  const getValue = (event) => {
    setValueInput(event.target.value);
  };

  const addItem = () => {
    dispatch(addTodo(valueInput));
    idInput.current.value = "";
    setValueInput("");
  };

  const deleteItem = (event) => {
    dispatch(deleteTodo(event.target.parentElement.dataset.id));
  };

  const toggleItem = (event) => {
    dispatch(toggleTodo(event.target.parentElement.dataset.id));
  };

  return (
    <div className="App">
      <section className="control_elems">
        <input
          className="control_elems__input"
          ref={idInput}
          onInput={getValue}
          type="text"
        />
        <button className="control_elems__button" onClick={addItem}>
          Нада делать
        </button>
      </section>

      <section className="todo">
        <div className="todo__container">
          {todoItems.map((item) => (
            <>
              {!item.isComplete ? (
                <div className="todo_items" key={item.id} data-id={item.id}>
                  <input
                    type="checkbox"
                    checked={item.isComplete}
                    onChange={toggleItem}
                  />
                  <p className="todo_items_todoItem">{item.content}</p>
                  <span className="todo_items_cross" onClick={deleteItem}>
                    &times;
                  </span>
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
        <div className="todo__container">
          {todoItems.map((item) => (
            <>
              {item.isComplete ? (
                <div className="todo_items" key={item.id} data-id={item.id}>
                  <input
                    type="checkbox"
                    checked={item.isComplete}
                    onChange={toggleItem}
                  />
                  <p className="todo_items_todoItem">{item.content}</p>
                  <span className="todo_items_cross" onClick={deleteItem}>
                    &times;
                  </span>
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
