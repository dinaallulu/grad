// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/styles/Home.css";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie";
import animationData from "../../assets/animationJSON/setting_on_a_desk_color_change.json";
import Button from "../components/Button";
import whyImg from "../../assets/WhyIMG.jpeg";
import pattern from "../../assets/starryNight.png";
import TextCard from "../components/textCard";
import FAQItem from "../components/functions/FAQItem";
import faqData from "../utils/faqData";
import {
    Email,
    Facebook,
    Twitter,
    LinkedIn,
    Instagram,
} from "@mui/icons-material";

function Home() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        console.log("Get Started clicked");
        navigate("/templates");
    };

    const handleLogin = () => {
        navigate("./loginpage");
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div>
            <Navbar />
            <div className="home-container">
                <header>
                    <div className="txt">
                        <h1>Build Your Academic Portfolio Effortlessly</h1>
                        <p>
                            Elevate Your Professional Online Presence With
                            Customizable Templates Designed Specifically To
                            Showcase Your achievements, Research, Teaching, and
                            More.
                        </p>

                        <Button
                            text="Get Started"
                            color="#071754"
                            fontColor="#fff"
                            filled={true}
                            onClick={handleGetStarted}
                        />
                        <Button
                            text="Login"
                            color="#ecc309"
                            fontColor="#071754"
                            filled={false}
                            onClick={handleLogin}
                        />
                    </div>
                    <div className="lottie-background">
                        <Lottie
                            options={defaultOptions}
                            height={400}
                            width={400}
                        />
                    </div>
                </header>

                {/* a brief description section */}
                <section className="briefDescription">
                    <p>
                        Build a professional online presence tailored for
                        academics without the need for coding or design
                        experience. Our platform provides an intuitive solution
                        for creating customizable websites that highlight your
                        publications, teaching, research, and collaborations—all
                        in one place.
                    </p>
                </section>

                {/* why choose us section */}
                <section>
                    <div className="whyContainer">
                        <div className="whyImgContainer">
                            <img src={whyImg} alt="a test to see the pic" />
                        </div>
                        <div className="txt">
                            <h3>Lorem ipsum dolor sit.</h3>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Eius, fugit!
                            </p>
                        </div>
                    </div>
                    <div className="whyContainer ">
                        <div className="txt">
                            <h3>Lorem ipsum dolor sit.</h3>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Eius, fugit!
                            </p>
                        </div>
                        <div className="opposite">
                            <img src={whyImg} alt="a test to see the pic" />
                        </div>
                    </div>

                    <div className="whyContainer">
                        <div className="whyImgContainer">
                            <img src={whyImg} alt="a test to see the pic" />
                        </div>
                        <div className="txt">
                            <h3>Lorem ipsum dolor sit.</h3>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Eius, fugit!
                            </p>
                        </div>
                    </div>
                </section>

                {/* <section className="briefDescription">
          <p></p>
        </section> */}

                {/* Templates section */}
                <section id="Templates">
                    <div className="txt">
                        <h2>
                            Explore Our Professional Templates for Academics
                        </h2>
                        <p>
                            Select a template, customize it, and get a polished
                            website that reflects your academic career.
                        </p>
                        <Button
                            text="Get Started"
                            color="#071754"
                            fontColor="#fff"
                            filled={true}
                            onClick={handleGetStarted}
                        />
                    </div>
                    <div className="templateGrid">
                        <div className="columnCard">
                            {/* <div className="tempPic"></div> */}
                            <TextCard
                                heading=""
                                textContent=""
                                fontColor={"#fff"}
                                backgroundColor={"#C4C7E3"}
                                height={"100px"}
                            />

                            <TextCard
                                className="card"
                                heading="Personal Homepage"
                                textContent="Tailor your profile to showcase your unique achievements, whether in publications, courses, or research projects."
                                backgroundImage={pattern}
                                fontColor={"#fff"}
                                height={"200px"}
                            />
                        </div>
                        <div className="columnCard">
                            <TextCard
                                className="card"
                                heading="Group lab Website"
                                textContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. At, tenetur."
                                backgroundImage={pattern}
                                fontColor={"#fff"}
                                height={"200px"}
                            />

                            {/* <div className="tempPic"></div> */}
                            <TextCard
                                heading=""
                                textContent=""
                                fontColor={"#fff"}
                                backgroundColor={"#D2E8E0"}
                                height={"100px"}
                            />
                        </div>
                        <div className="columnCard">
                            {/* <div className="tempPic"></div> */}
                            <TextCard
                                fontColor={"#fff"}
                                backgroundColor={"#FFF3AD"}
                                height={"100px"}
                            />

                            <TextCard
                                className="card"
                                heading="Conference Page"
                                textContent="Perfect for organizing event details, schedules, and speaker profiles, making it easy for attendees to access essential information."
                                backgroundImage={pattern}
                                fontColor={"#fff"}
                                height={"200px"}
                            />
                        </div>
                    </div>
                </section>

                {/* our mission section */}
                <section>
                    <div className="missionAboutUs">
                        <div className="background-pattern"></div>
                        <div className="txtContainer">
                            <span className="subtitle">About us</span>
                            <p className="title">
                                We are driven by the vision of a sustainable
                                future
                            </p>
                            <Button
                                text={"explore Templates ↓"}
                                color="#ecc309"
                                fontColor="#071754"
                                filled={false}
                                onClick={() => navigate("#Templates")}
                            />
                        </div>
                    </div>
                    <div className="ourMission">
                        <p className="subtitle">Our Mission </p>

                        <p className="para">
                            Our mission is to provide an accessible,
                            customizable platform for academics to create their
                            personal and professional websites. We understand
                            the unique requirements of the academic community,
                            where time is precious, and web development skills
                            may not be a priority. By offering an intuitive
                            interface with ready-made templates tailored to
                            academic needs, we empower professors, researchers,
                            and educators to build and maintain professional
                            online profiles independently
                            <br /> <br />
                            Through continuous user feedback, we ensure our
                            platform evolves to meet the standards of academic
                            excellence. We strive to be the most user-friendly
                            and cost-effective academic website builder
                            available, enabling scholars to highlight their
                            achievements, collaborate with peers, and engage
                            with wider audiences.
                        </p>
                    </div>
                </section>

                {/* FAQ and Questions section */}
                <section id="faqSection">
                    <div className="">
                        <p className="subtitle">FAQ</p>
                        <h2 className="subHeading">
                            <strong>Answer to your questions</strong>
                        </h2>
                    </div>

                    <div className="questions">
                        {faqData.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </div>
                </section>

                <section className="briefDescription">
                    <h2>Start Building Today</h2>
                    <Button
                        text="Get Started"
                        color="#071754"
                        fontColor="#fff"
                        filled={true}
                        onClick={handleGetStarted}
                    />
                </section>

                <footer className="footer">
                    <div className="footer-links">
                        <a href="/">Personal homepage builder</a>
                        <a href="/">Lab group website</a>
                        <a href="/">Conference website</a>
                        <a href="/">About</a>
                        <a href="/">Terms to Use</a>
                        <a href="/">Home</a>
                    </div>
                    <div className="social-links">
                        <a
                            href="goTo:johnDoe@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Email />
                        </a>
                        <a
                            href="https://www.facebook.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook />
                        </a>
                        <a
                            href="https://www.twitter.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Twitter />
                        </a>
                        <a
                            href="https://www.instagram.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedIn />
                        </a>
                        <a
                            href="https://www.linkedin.com/yourpage"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram />
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Home;
