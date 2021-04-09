import React, { Component } from 'react';

class TodoItem extends Component {
    render() {

        return (
            <div className="TodiItem">
                <p> Go to School and {this.props.title} {this.props.time}</p>
            </div>
        )
    }
}

export default TodoItem;