import React, {useEffect, useState} from 'react';
import Card from '../UI/Card';
import MealItem from './MealsItems/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  // - seEfeect shoukld not return promoise it should be async function so use  a function
  //inside it which will be asyn 
  //- async function is alway return a promise so if i throw an error inside it the promise
  // let this function to reject so the best solution use then catch which related to promise

    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch('https://meals-3c964-default-rtdb.firebaseio.com//meals.json');
        const responseData = await response.json();
  
        const loadedMeals = [];
  
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
  
        setMeals(loadedMeals);
      };
  
      fetchMeals();
    }, []);
  
    const mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );
  };
  
  export default AvailableMeals;