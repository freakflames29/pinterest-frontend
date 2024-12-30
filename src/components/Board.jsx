import React, {useMemo, useState} from 'react';
import IMG from '../assets/images/placeholder.webp'
// import {get} from "axios";

const Board = (props) => {

    const [counter, setCounter] = useState(0)

    function getImageList() {
        const imgList = []
        if (props.pins.length > 0) {

            if (props.pins.length >= 3) {


                for (let i = 0; i < 3; i++) {
                    imgList.push(props.pins[i]?.image)
                }
            } else {
                for (let i = 0; i < props.pins.length; i++) {
                    imgList.push(props.pins[i]?.image)
                }
            }
        }

        if (imgList.length < 3) {
            while (imgList.length !== 3) {
                imgList.push(IMG)
            }
        }

        console.log("Image List", imgList.length)
        return imgList
    }

    //caching
    const boardCovers = useMemo(()=>getImageList(),[props.pins.length])
    //
    console.log(boardCovers)

    // const imgList = []
    // if (props.pins.length > 0) {
    //
    //     if (props.pins.length >= 3) {
    //
    //
    //         for (let i = 0; i < 3; i++) {
    //             imgList.push(props.pins[i]?.image)
    //         }
    //     } else {
    //         for (let i = 0; i < props.pins.length; i++) {
    //             imgList.push(props.pins[i]?.image)
    //         }
    //     }
    // }
    //
    // if (imgList.length < 3) {
    //     while (imgList.length !== 3) {
    //         imgList.push(IMG)
    //     }
    // }

    // console.log("Image List", imgList.length)

    // !
    // DONE


    return (
        <div className="board__card">
            <div className="board__overlay"></div>

            <div className="board__img">
                <div className="board__cover">
                    <img src={boardCovers[0]} alt="coverimg" className="cover__img"/>
                </div>
                <div className="board__right">
                    <div className="board__right__top">
                        <img src={boardCovers[1]} alt="small top" className="small__img small__top"/>

                    </div>
                    <div className="board__right__down">
                        <img src={boardCovers[2]} alt="small bottom" className="small__img small__down"/>

                    </div>
                </div>
            </div>


            <div className="borad__title">
                <h1>{props?.name} {counter}</h1>
                <p>{props.pins.length} pins</p>


            </div>

            <button onClick={() => setCounter(counter + 1)}>inc</button>
        </div>
    );
};

export default Board;