import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderSmall from '../components/headerSmall/HeaderSmall';
// import Navbar from '../components/navigation/NavBar';
import './AboutPage.css'; // Make sure to create this CSS file and use the code below
import WomanHuggingDog from '../assets/woman-hugging-dog.png';
import Rectangle1 from '../assets/Rectangle1.png';
import Rectangle2 from '../assets/Rectangle2.png'
import Rectangle3 from '../assets/Rectangle3.png';
import Rectangle4 from '../assets/Rectangle4.png';
import Rectangle5 from '../assets/Rectangle5.png';
import Rectangle6 from '../assets/Rectangle6.png';
import Rectangle7 from '../assets/Rectangle7.png';
import RectangleNav from "../assets/rectangle-nav.png";


// const AboutPage = () => {
//     return (
//         <div>
//             <Navbar />
//             <div className="about-page">
//                 <Container>
//                     <Row className="about-elements">
//                         {/* Column for the text content */}
//                         <Col md={6}>
//                             <h1 className="title">Welcome To Furry Footsteps!</h1>
//                             <p className="description">
//                                 We're your one-stop destination for premium pet care services. From grooming and training to daycare and boarding, we offer everything your furry friend needs to thrive. Our experienced team provides personalized care tailored to your pet's unique needs, ensuring they feel safe and loved every step of the way. Join the Furry Footsteps family today and give your pet the exceptional care they deserve.
//                             </p>
//                         </Col>
//
//                         {/* Column for the image and decorative shapes */}
//                         <Col md={6} className="about-container">
//                             {/* All the rectangle images */}
//                             <img src={Rectangle1} className="rectangle rectangle-1" alt="Decorative Shape" />
//                             {/* ...other rectangles... */}
//                             {/* The woman and dog image */}
//                             <div className="woman-hugging-dog">
//                                 <img src={WomanHuggingDog} alt="Woman hugging dog" />
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </div>
//     );
// };
//
// export default AboutPage;

const AboutPage = () => {
    return (
        <div>
            {/*<Navbar />*/}
            <div className="rectangle-4">
                <img src={Rectangle4} alt="Decorative Shape" />
            </div>
            <HeaderSmall />
            <div className="about-page">
                <Container>
                    <Row className="about-elements">
                        <Col md={6}>
                            <h1 className="title">Welcome To Furry Footsteps!</h1>
                            <p className="description">
                                We're your one-stop destination for premium pet care services. From grooming and training to daycare and boarding, we offer everything your furry friend needs to thrive. Our experienced team provides personalized care tailored to your pet's unique needs, ensuring they feel safe and loved every step of the way. Join the Furry Footsteps family today and give your pet the exceptional care they deserve.
                            </p>
                            <div className="rectangle-3">
                                <img src={Rectangle3} alt="Decorative Shape" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="about-container">
                                <img src={Rectangle5} className="rectangle rectangle-5" alt="Decorative Shape" />
                                <img src={Rectangle6} className="rectangle rectangle-6" alt="Decorative Shape" />
                                <img src={Rectangle7} className="rectangle rectangle-7" alt="Decorative Shape" />
                                <img src={Rectangle1} className="rectangle rectangle-1" alt="Decorative Shape" />
                                <img src={Rectangle2} className="rectangle rectangle-2" alt="Decorative Shape" />
                            </div>
                            <div className="woman-hugging-dog">
                                <img src={WomanHuggingDog}  alt="Woman hugging dog" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default AboutPage;