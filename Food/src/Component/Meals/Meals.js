import React, { Fragment } from 'react';
import AvailMeal from './AvailMeal';
import MealSummary from './MealSummary';

const Meals = () => {
    return (
       <Fragment>
           <MealSummary />
           <AvailMeal />
       </Fragment>
    )
}

export default Meals
