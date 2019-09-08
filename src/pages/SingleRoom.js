import React, { Component } from 'react'
import { RoomsContext } from '../context';

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    static context = RoomsContext;
    render() {
        console.log(this.context);

        return (
            <div>
                hello from single room page
            </div>
        )
    }
}
