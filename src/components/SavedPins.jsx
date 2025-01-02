import React from 'react';
import Board from "./Board.jsx";
import {useSelector} from "react-redux";

const SavedPins = (props) => {
    const boardInfo = useSelector(state => state.boardReducer.boards)
    return (

        <div className="boards__container">

            {
               boardInfo.map(board => (
                    <Board name={board.name} key={board.id} pins={board.pins} boardId={board.id}/>
                ))
            }
        </div>

    );
};

export default SavedPins;