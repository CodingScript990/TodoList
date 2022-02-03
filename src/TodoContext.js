import React, { useReducer, createContext, useContext, useRef } from "react";

// initial list
const initialTodos = [];

// todo state (create, toggle, remove)
function todoReducer(state, action) {
  // switch(action type === exception)
  switch (action.type) {
    // create
    case "CREATE":
      return state.concat(action.todo); // state => action.todo
    // toggle
    case "TOGGLE":
      return state.map(
        // state => map(todo/action)
        (todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo)
      );
    // remove
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id); // state => filter todo
    // error
    default:
      throw new Error(`Unhandled cation type: ${action.type}`);
  }
}

// todo context
const TodoStateContext = createContext();
// todo dispatch context
const TodoDispatchContext = createContext();
// todo id add
const TodoNextIdContext = createContext();

// todo provider fucntion (state, dispatch, id)
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5); // todo add id
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// [Component 최적화를 위한 작업]
// todo customer => useStateHook(StateContext)
export function useTodoState() {
  const context = useContext(TodoStateContext);
  // expection => error msg
  if (!context) {
    throw new Error("Can't find TodoProvider");
  }
  return context;
}

// todo customer => useStateHook(DispatchContext)
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Can't find TodoProvider");
  }
  return context;
}

// todo customer => useStateHook(NextIdContext)
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Can't find TodoProvider");
  }
  return context;
}
