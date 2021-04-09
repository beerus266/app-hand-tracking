import React, {createRef, useEffect, useState } from 'react';

export default function Canvas({ videoRef, model}){

    // const canvasRef = createRef(null);
    const [canvasRef] = useState(createRef(null));
    let goToRight = null;
    let x = 0;
    useEffect(() => {
        if (canvasRef.current && videoRef.current ) {
            const interval = setInterval(() => {
                const ctx = canvasRef.current?.getContext('2d');
                model.detect(videoRef.current).then(predictions => {
                    if (canvasRef.current){
                        model.renderPredictions(predictions, canvasRef.current, ctx, videoRef.current);
                        predictions.map(prediction => {      // bbox = [x, y, width, height]
                            if (predictions){
                                // console.log(predictions, typeof(predictions));
                                if ( x < predictions[0].bbox[0]) {
                                    goToRight = true;
                                    console.log("RIGHT");
                                } else {
                                    goToRight = false;
                                    console.log("LEFT");
                                }
                                x = predictions[0].bbox[0];
                            }
                        });
                    }
                });
            }, 0);
  
                return () => clearInterval(interval)
            } else {
                console.log("no canvas");
            }
    },[]);

    function runDetection(ctx){
        model.detect(videoRef.current).then(predictions => {
            console.log(predictions, canvasRef.current, ctx, videoRef.current);
            model.renderPredictions(predictions, canvasRef.current, ctx, videoRef.current);
            console.log(predictions.length);
        });
    }

    return (
            <canvas ref={canvasRef} width="420" height="300" />
    );
}