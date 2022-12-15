import React from "react";
import ReactDOM from "react-dom";
import classes from "./modal.module.css";
const Backdrop = (props) => {
  function handleBackdropClick(e) {
    props.onCartToggle();
  }
  return <div className={classes.backdrop} onClick={handleBackdropClick}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCartToggle={props.onCartToggle} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};
export default Modal;
