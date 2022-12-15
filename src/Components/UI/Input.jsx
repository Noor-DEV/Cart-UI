import React from "react";
import classes from "../Meals/MealSummary.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className="form-control">
      <label htmlFor={props.input.id} className={classes.label}>
        {props.label}
      </label>
      <input
        ref={ref}
        {...props.input}
        max="10"
        min="1"
        step="1"
        defaultValue="1"
        className={classes.btn}
      />
    </div>
  );
});
export default Input;
