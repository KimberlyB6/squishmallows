import '../css/Music.css';
import React from 'react';

const Music = () => {
    return (
        <section className="music-cards">
            <div className="card">
                <div className="card-img">
                    <img src="images/music/Music Squish.png" alt = "Music Squish"/>
                </div>
                <div className="card-title">Afrobeat x Guitar & Big Brass By: YellowBirdBeats </div>
                <audio controls>
                    <source src="images/music/afrobeat-x-guitar-amp-big-brass-chill-music-champagne-flute-321930.mp3" type="audio/mpeg"/>
                </audio>
            </div>
            <div className="card">
                <div className="card-img">
                    <img src="images/music/owl music.png" alt = "Owl Music"/>
                </div>
                <div className="card-title">Chill-hop Vibey Guitar By: OneSevenBeatxs</div>
                <audio controls>
                    <source src="images/music/chill-hop-vibey-guitar-ambient-love-type-beatprod-by-onesevenbeatxs-338350.mp3" type="audio/mpeg"/>
                </audio>
            </div>
            <div className="card">
                <div className="card-img">
                    <img src="images/music/penguin.png" alt = "Penguin Music"/>
                </div>
                <div className="card-title">Chill Lofi Music By: SigmaMusicArt</div>
                <audio controls>
                    <source src="images/music/chill-lofi-music-interior-lounge-256260.mp3" type="audio/mpeg"/>
                </audio>
            </div>
            <div className="card">
                <div className="card-img">
                    <img src="images/music/sleep.png" alt = "Sleep Music"/>
                </div>
                <div className="card-title">Good Night Lofi Cozy Chill Music By: FASSounds</div>
                <audio controls>
                    <source src="images/music/good-night-lofi-cozy-chill-music-160166.mp3" type="audio/mpeg"/>
                </audio>
            </div>
            <div className="card">
                <div className="card-img">
                    <img src="images/music/desserts.png" alt = "Desserts Music"/>
                </div>
                <div className="card-title">Lofi Chill Jazz By: SigmaMusicArt</div>
                <audio controls>
                    <source src="images/music/lofi-chill-jazz-272869.mp3" type="audio/mpeg"/>
                </audio>
            </div>
            <div className="card">
                <div className="card-img">
                    <img src="images/music/guitar.png" alt = "Guitar Music"/>
                </div>
                <div className="card-title">Lofi Chill By: BoDleasons</div>
                <audio controls>
                    <source src="images/music/lofi-chill-smooth-chill-lofi-for-vlogs-and-background-music-159456.mp3" type="audio/mpeg"/>
                </audio>
            </div>
        </section>
    );
}

export default Music;