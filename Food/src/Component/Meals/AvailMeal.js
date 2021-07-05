import React,{useEffect,useState} from "react";
import Card from "../UI/Card";
import classes from "./AvailMeal.module.css";
import MealItem from "./Meal/MealItem";


const AvailMeal = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState();

  useEffect(()=>{

    const fetchMeals= async () =>{
      const response =  await fetch('https://meallist-769cc-default-rtdb.firebaseio.com/meals.json')
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json()


      const loadedData = []

      for(const key in responseData){
        loadedData.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
      }
      setMeals(loadedData)
      setIsLoading(false)
      

    }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  },[])
  
  if(isLoading){
    return(
      <section >
        <h2 className={classes.loadingClass}>Loading...</h2>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }


const mealList = meals.map((meal) => (
  
    <MealItem
    id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  
));

  return (
      <section className={classes.meals}>
    <Card>
          
        <ul>{mealList}</ul>
    </Card>

      </section>
  );
};

export default AvailMeal;
