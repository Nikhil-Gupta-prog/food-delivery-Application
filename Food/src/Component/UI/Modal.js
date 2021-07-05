import React, { Fragment } from 'react';
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";


const Backdrop =(props) =>{
   return <div className={classes.backdrop } onClick={props.onHide} />
}

const ModalOverlay = (props) =>{
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}


const Modal = (props) => {
    const portalElem = document.getElementById('overlays');
    return (
       <Fragment>
           {ReactDOM.createPortal(<Backdrop onHide={props.onHide}/>,portalElem)}
           {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElem)}
       </Fragment>
    )
}

export default Modal
