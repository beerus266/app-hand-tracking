import React ,{ Component } from 'react';

class ButtonTurnCamera extends Component {
    constructor() {
        super();
        this.state = {
            statusStart: true ,
            stream: null
        };
        this.videoRef = React.createRef();
        this.onButtonClick = this.onButtonClick.bind(this); // it 's necessary to make 'this' work in callback (1)
    }

    componentDidMount() {

    }
    onButtonClick(){  // callback (1)
        this.setState({ statusStart: !this.state.statusStart});

        const videoObj = this.videoRef.current;
        if (this.state.statusStart){
            navigator.mediaDevices.getUserMedia({ video: true, audio: false }) 
                .then((stream) => {                                            // function(stream) {} not work. Have to use (stream) => {}
                    console.log("Camera OK");
                    videoObj.srcObject = stream;
                    videoObj.play();
                    console.log(this);
                    this.setState({
                        stream: videoObj.srcObject
                    });
                })
                .catch(function(err) {
                    console.log("An error occurred! " + err);
                });
        } else {
            // videoObj.pause();
            // videoObj.srcObject.stop();
            this.state.stream.getTracks().forEach(track => track.stop());
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.onButtonClick}>{this.state.statusStart ? 'Stop': 'Start'} {this.props.name}</button>
                <br></br>
                <video ref={this.videoRef}></video>
            </div>
        );
    }
}

export default ButtonTurnCamera;