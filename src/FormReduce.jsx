import React, { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "RESET":
      return { name: "", email: "" };
  }
}
export default function FormReduce() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  }
  return (
    <>
      <input
        value={state.name}
        type="text"
        name="name"
        onChange={handleChange}
      />
      <input
        value={state.email}
        type="email"
        name="email"
        onChange={handleChange}
      />
      <p>
        Name:{state.name} Email:{state.email}
      </p>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </>
  );
}
