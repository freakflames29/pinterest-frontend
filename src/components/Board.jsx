import React from 'react';
import IMG from '../assets/images/capy.jpeg'

const Board = (props) => {
    const imgList = []

    if (props.pins.length > 0) {
        // imgList
        for (let i = 0; i < props.pins.length; i++) {
            imgList.push(props.pins[i]?.image)
        }
    }

    if (imgList.length < 3) {
        while (imgList.length !== 3) {
            imgList.push(IMG)
        }
    }
    console.log("Image List", imgList)


    return (
        <div className="board__card">


            <div className="board__img">
                <div className="board__cover">
                    <img src={imgList[0]} alt="coverimg" className="cover__img"/>
                </div>
                <div className="board__right">
                    <div className="board__right__top">
                        <img src={imgList[1]} alt="coverimg" className="small__img small__top"/>

                    </div>
                    <div className="board__right__down">
                        <img src={imgList[2]} alt="coverimg" className="small__img small__down"/>

                    </div>
                </div>
            </div>
            <div className="borad__title">
                <h1>{props?.name} </h1>
                <p>{props.pins.length} pins</p>
            </div>
        </div>
    );
};

export default Board;