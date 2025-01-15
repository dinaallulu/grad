// import React from 'react';
import PropTypes from "prop-types";

const Divider = ({ color, thickness, margin, rounded }) => {
    const dividerStyle = {
        backgroundColor: color,
        height: thickness,
        margin: `${margin} 0`,
        borderRadius: rounded ? "50%" : "0",
    };

    return <div style={dividerStyle}></div>;
};

Divider.propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.string,
    margin: PropTypes.string,
    rounded: PropTypes.bool,
};

Divider.defaultProps = {
    color: "#000", // Default color black
    thickness: "2px", // Default thickness
    margin: "20px", // Default margin
    rounded: false, // Default no rounded edges
};

export default Divider;
