import React, { useState, useEffect } from "react";
import Meal from "./Meal";
import classes from "./MealSummary.module.css";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetch(
      "https://react-backend-d4c31-default-rtdb.firebaseio.com/restaurantFood.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let foodArray = [];
        for (const key in data) {
          foodArray.push({ id: key, ...data[key] });
        }
        setMeals(foodArray);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.message);
        setIsLoading(false);
        console.log({ err, msg: "------Error fetching the meals------------" });
      });
  }, []);
  return (
    <section id={classes["meals-container"]}>
      {!isLoading &&
        !isError &&
        meals.map((meal) => {
          return <Meal key={meal.id} item={meal} />;
        })}

      {isLoading && <h1>Loading .....</h1>}
      {isError && !isLoading && (
        <>
          <h1>Error Ocurred...</h1>
          <h1>{isError}</h1>
        </>
      )}
    </section>
  );
};

export default AvailableMeals;
