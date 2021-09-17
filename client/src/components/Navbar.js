import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () =>{
    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/"><h1>AniNews</h1></Link>
                    </li>
                    <li>
                        <Link to="/tweets"><h2>Tweets</h2></Link>
                    </li>
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;