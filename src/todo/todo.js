import { configureStore } from "@reduxjs/toolkit";

// types
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

// action-creators
let idContent = 0;

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: ++idContent,
    content,
    isComplete: false,
  },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

// reducer
const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      console.log(action.payload);
      console.log(state.todos);

      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case DELETE_TODO: {
      console.log(action.payload);

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== +action.payload),
      };
    }

    case TOGGLE_TODO: {
      const id = +action.payload;
      const found = state.todos.find((todo) => todo.id === id);

      const newTodo = {
        ...found, 
        isComplete: !found.isComplete,
      }

      const newTodos = state.todos.map((todo) => todo.id === id ? newTodo : todo);

      return {
        ...state,
        todos: newTodos,
      };
    }

    default:
      return state;
  }
};

// store
export const store = configureStore({
  reducer: reducer,
});
