import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Header.css';
import Navbar from '../navigation/NavBar';
import WomanWithDog from '../../assets/womanWithDog.png';
import RectangleBottom from '../../assets/rectangle-bottom.png';
import RectangleMiddle from '../../assets/rectangle-middle.png';
import RectangleNav from '../../assets/rectangle-nav.png';

const Header = () => {

    return (
        <div>
            <div className="rectangle-nav">
                <img src={RectangleNav} alt="rectangle-nav" />
            </div>
            <Navbar></Navbar>
            <div className="header-page">
                <Container>
                    <Row className="banner-elements">
                        <Col md={6}>
                            <div className="rectangle-middle">
                                <img src={RectangleMiddle} alt="rectangle-middle" />
                            </div>
                            <h1 className="title">Thousands more fun!</h1>
                            <p className="description">
                                Having a pet means you have more joy, a new friend,
                                a happy person who will always be with you to have fun.
                            </p>
                            <button className="explore-button">Explore Now</button>
                            <div className="rectangle-bottom">
                                <img src={RectangleBottom} alt="rectangle-bottom" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="woman-with-dog"><img src={WomanWithDog} alt="woman" /></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Header;
