// import React from 'react';
import PropTypes from "prop-types";
// import Divider from '../components/Divider';

const TextCard = ({
    heading,
    textContent,
    backgroundImage,
    fontColor,
    backgroundColor,
    width,
    height,
}) => {
    const cardStyle = {
        backgroundColor: backgroundColor || "#071754",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        color: fontColor || "#000",
        padding: "2rem 1.4rem",
        borderRadius: "1rem",
        boxShadow: `#000 0px 1px 4px`,
        width: width,
        height: height, //this is temporary
        textAlign: "-webkit-left;",
    };

    return (
        <div className="textCard" style={cardStyle}>
            <h2>{heading}</h2>
            {/* <Divider color="#eff4ef" thickness="1px" margin="4px" rounded={true} /> */}

            <p>{textContent}</p>
        </div>
    );
};

//Prototypes for the card
TextCard.propTypes = {
    heading: PropTypes.string.isRequired,
    textContent: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default TextCard;
