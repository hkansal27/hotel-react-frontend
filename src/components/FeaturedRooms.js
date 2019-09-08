import React, { Component } from 'react'
import { RoomsContext } from '../context';

import Loading from './Loading';
import Room from './Room';
import Title from './Title';

export default class FeaturedRooms extends Component {
    static contextType = RoomsContext;
    render() {
        let { loading, featuredRooms } = this.context;
        let rooms = featuredRooms.map(item => {
            return <Room key={item.id} room={item} />
        });
        return (
            <section>
                <div className="featured-rooms">
                    <Title title="featured rooms" />
                    <div className="featured-rooms-center">
                        {loading ? <Loading /> : rooms}
                    </div>
                </div>
            </section>
        )
    }
}
