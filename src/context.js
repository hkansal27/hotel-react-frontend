import React, { Component } from 'react';
import items from './data';

let RoomsContext = React.createContext();
// <RoomContext.Provider value="" />

class RoomsProvider extends Component {
    state = {
        rooms: [],
        featuredRooms: [],
        sortedRooms: [],
        loading: true
    };

    componentDidMount() {
        let rooms = this.formatRooms(items);
        let featuredRooms = rooms.filter(item => item.featured === true);

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false
        })
    }

    formatRooms(items) {
        let tempRooms = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(item => {
                return item.fields.file.url;
            });
            let room = { ...item.fields, images, id };
            return room;
        });
        return tempRooms;
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };

    render() {
        return (
            <RoomsContext.Provider value={{ ...this.state, getRoom: this.getRoom }} >
                {this.props.children}
            </RoomsContext.Provider>
        )
    }
};
const RoomsConsumer = RoomsContext.Consumer;

export { RoomsContext, RoomsProvider, RoomsConsumer };
