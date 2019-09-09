import React from "react";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomsContainer({ context }) {
    const { loading, sortedRooms, rooms } = context;
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    );
}

export default withRoomConsumer(RoomsContainer);

// import React, { Component } from 'react'
// import RoomFilter from './RoomFilter'
// import RoomList from './RoomList'


// import { RoomsConsumer } from '../context';

// export default class RoomContainer extends Component {
//     render() {
//         return (
//             <RoomsConsumer>
//                 {value => {
//                     console.log(value)
//                     return (
//                         <>
//                             hello from room RoomContainer
//                             < RoomFilter />
//                             <RoomList />
//                         </>)
//                 }}
//             </RoomsConsumer>
//         )
//     }
// }
