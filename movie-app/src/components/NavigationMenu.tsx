// NavigationMenu.tsx
import React from 'react';

const NavigationMenu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <a className="navbar-brand fw-bold" href="/">Movie & Actor</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/movies">Movies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/actors">Actors</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationMenu;
