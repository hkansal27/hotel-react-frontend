import React from 'react'
import Hero from '../components/Hero';

import Banner from '../components/Banner';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <Hero hero="defaultHero">
                <Banner title="luxurious rooms" subtitle="delux rooms starting from $299">
                    <Link to="/rooms" className="btn-primary">
                        our rooms
                    </Link>
                </Banner>
            </Hero>
        </div>
    )
}
