import React, { Component } from 'react'

class TrafficLight extends Component {

    constructor(){
        super();
        this.state = {color: 0};

    }
    componentDidMount() {
        this.changeLight = setInterval(() => {
            this.setState({
                color: this.getColorLight(this.state.color)
            });
        }, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.changeLight);
    }
    getColorLight (imedColor) {
        switch(imedColor){
            case 0 : return 1;
            case 1 : return 2;
            case 2 : return 0;
        }
    }
    render () {
        return (
            <div>This is TrafficLight {this.state.color}</div>
        )
    }
}

export default TrafficLight;