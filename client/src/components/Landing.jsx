import { Link } from 'react-router-dom';
import landing from '../img/vglanding.jpg';
import video from '../img/landing.mp4'
import '../css/Landing.css';

const LandingPage = () => {
    return(
        <div>
            <Link to='/home'>
                <button className='content'>Let's play videogames</button>
            </Link>
            <video muted autoPlay loop playsInline className='back-video'>
                <source src={video} type="video/mp4"/>
            </video>
            <a href="#">https://codepen.io/bhadupranjal/pen/vYLZYqQ</a> 
        </div>
    );
};

export default LandingPage;
