import React, { Component } from 'react'
import defaultImg from '../images/room-1.jpeg'
import StyledHero from '../components/StyledHero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom'
import { RoomsContext } from '../context';

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: props.match.params.slug,
            defaultImg
        }
    }
    static contextType = RoomsContext;
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        console.log(room)
        if (!room) {
            return <div className="error">
                <h3>No such room could be found...</h3>
                <Link to="./rooms" className="btn-primary">
                    back to rooms
                </Link>
            </div>
        }
        const { name, description, capacity, size, price, extras,
            breakfast, pets, images } = room;
        const [mainImg, ...defaultImages] = images;
        return (
            <>
                <StyledHero img={mainImg || this.state.defaultBcg}>
                    <Banner title={`${name} rooms`}>
                        <Link to="/rooms" className="btn-primary">
                            back to rooms
                   </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImages.map((item, index) => (
                            <img key={index} src={item} alt={name} />
                        ))}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>size : {size} SQFT</h6>
                            <h6>
                                max capacity :
                                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                            </h6>
                            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras </h6>
                    <ul className="extras">
                        {extras.map((item, index) => (
                            <li key={index}>- {item}</li>
                        ))}
                    </ul>
                </section>
            </>
        )
    }
}
