import React from 'react'
import { FaYoutube } from "react-icons/fa";

function LandingPage() {
    return (
        <>
            <div className="app">
                <FaYoutube style={{ fontSize: '7rem', color: 'red'}} /><br />
                <span style={{ fontSize: '2rem' }}>YeonTube와 함께라면 당신도 크리에이터!</span>
            </div>
        </>
    )
}

export default LandingPage
