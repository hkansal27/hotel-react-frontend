import React, { Component } from 'react';
import items from './data';

let RoomsContext = React.createContext();
// <RoomContext.Provider value="" />

class RoomsProvider extends Component {
    state = {
        rooms: [],
        featuredRooms: [],
        sortedRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    componentDidMount() {
        let rooms = this.formatRooms(items);
        let featuredRooms = rooms.filter(item => item.featured === true);
        //
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
        });
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

    handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                [name]: value
            },
            this.filterRooms
        );
    };
    filterRooms = () => {
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state;

        let tempRooms = [...rooms];
        // transform values
        // get capacity
        capacity = parseInt(capacity);
        price = parseInt(price);
        // filter by type
        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        // filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        //filter by size
        tempRooms = tempRooms.filter(
            room => room.size >= minSize && room.size <= maxSize
        );
        //filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        this.setState({
            sortedRooms: tempRooms
        });
    };

    render() {
        return (
            <RoomsContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }} >
                {this.props.children}
            </RoomsContext.Provider>
        )
    }
};
const RoomsConsumer = RoomsContext.Consumer;


export { RoomsContext, RoomsProvider, RoomsConsumer };


export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomsConsumer>
                {value => <Component {...props} context={value} />}
            </RoomsConsumer>
        );
    };
}
