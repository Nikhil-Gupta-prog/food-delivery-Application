import React, { Fragment } from 'react'
import classes from "./Header.module.css";
import HeaderCartbutton from './HeaderCartbutton';
import image from "../../assests/meals.jpg"

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <div>Logo</div>
               <HeaderCartbutton onClick={props.onShowCart} />
            </header>
   
            <div className={classes['main-image']}>
        <img src={image} alt='A table full of delicious food!' />
      </div>
        </Fragment>
    )
}

export default Header
