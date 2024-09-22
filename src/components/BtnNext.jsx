import React from "react";

export default function BtnNext({ dispatch }) {
  return (
    <button
      className="btn btn-next"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
