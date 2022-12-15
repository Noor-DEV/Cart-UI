import React, { useState } from "react";
import Meal from "./Meal";
import classes from "./MealSummary.module.css";
const DEFAULT_ITEMS = [
  {
    id: "m1",
    title: "Sushi",
    description: "Finest fish and veggies",
    price: 22.49854,
  },
  {
    id: "m2",
    title: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    title: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    title: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];
const AvailableMeals = () => {
  const [availabelMeals] = useState(DEFAULT_ITEMS);
  return (
    <section id={classes["meals-container"]}>
      {availabelMeals.map((meal) => {
        return <Meal key={meal.id} item={meal} />;
      })}
    </section>
  );
};

export default AvailableMeals;
