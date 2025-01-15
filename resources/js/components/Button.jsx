// import React from 'react';
import PropTypes from "prop-types";

const Button = ({ text, color, fontColor, filled, onClick }) => {
    const buttonStyle = {
        color: filled ? fontColor : fontColor,
        backgroundColor: filled ? color : "transparent",
        border: filled ? `2px solid ${color}` : `2px dotted ${"#071754"}`,
        cursor: "pointer",
        marginTop: "2rem",
        marginRight: "1rem",
        padding: "15px 30px",
        borderRadius: "20px",
        fontSize: "16px",
        fontWeight: 800,
    };

    const hoverStyle = {
        backgroundColor: filled ? "#ecc309" : color,
        color: filled ? color : "#071754",
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            onMouseOver={(e) =>
                Object.assign(e.currentTarget.style, hoverStyle)
            }
            onMouseOut={(e) =>
                Object.assign(e.currentTarget.style, buttonStyle)
            }
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fontColor: PropTypes.string.isRequired,
    filled: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    filled: true,
    onClick: () => {},
};

export default Button;
