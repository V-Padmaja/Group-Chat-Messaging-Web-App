import React from "react";

function Form(props) {
  return (
    
    <form>
      <div>
      <input 
        placeholder="Username..."
        type="text"
        value={props.username}
        onChange={props.onChange}
      />
      <button onClick={props.connect}><b>Connect</b></button></div>
    </form>
  );
};

export default Form;