import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Canvas from './Canvas';
import * as handTrack from 'handtrackjs';

export default function ButtonCamera(){

    const modelParams = {
        flipHorizontal: true,   // flip e.g for video 
        imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
        maxNumBoxes: 5,        // maximum number of boxes to detect
        iouThreshold: 0.5,      // ioU threshold for non-max suppression
        scoreThreshold: 0.79,    // confidence threshold for predictions.
    };
    const [isPlay, setPlay]             = useState(false);
    const [colorButton, setColorButton] = useState('success');
    const [videoRef]                    = useState(React.createRef());
    const [stream, setStream]           = useState(null);
    const [isLoadedModel, setLoadedModel] = useState(false);
    const [model, setModel] = useState(null);

    useEffect(() => {
        handTrack.load(modelParams).then( modelIn => {
            setModel(modelIn);
            setLoadedModel(true);
        });
    },[]);
    async function onClickButton(){
        let videoObj = videoRef.current;
        if (isPlay) {
            await handTrack.stopVideo(videoObj);
            setPlay(false);
            setColorButton('success');
        } else {
            // navigator.mediaDevices.getUserMedia({ video: true, audio: false }) 
            //     .then((stream) => {                                            // function(stream) {} not work. Have to use (stream) => {}
            //         console.log("Camera OK");
            //         videoObj.srcObject = stream;
            //         videoObj.play();
            //         setStream(stream);
            // })
            //     .catch(function(err) {
            //         console.log("An error occurred! " + err);
            // });
            let a = await handTrack.startVideo(videoObj);
            // console.log(a);
            setPlay(true);
            setColorButton('danger');
        }
    }



    return (
        <div>
            <Button 
                variant={colorButton}
                onClick={onClickButton}
            >
                {isPlay ? 'Stop' : 'Start'}
            </Button>
            <br></br>
            <h1>{!isLoadedModel ? 'Model is loading' : 'Model is loaded'}</h1>
            <video ref={videoRef}></video>
            {isPlay ? <Canvas videoRef={videoRef} model={model} />: ''}
        </div>
    );
}