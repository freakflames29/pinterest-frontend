import React from 'react';

const BoadCreateModal = (props) => {
    const modalClose = ()=>{

        props.toggleFun()
    }
    return (
        <div className={"modal__container"} onClick={modalClose}>
            <div className="modal__box">
                <h1>Create Board</h1>
                <div className="modal__input">

                    <label htmlFor="board">Name</label>
                    <input type="text" placeholder={"Like 'Places to go' or 'Recipes to make'"} className={"form__field"} id={"board"}/>
                    <button className={"btn btn__red"}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default BoadCreateModal;