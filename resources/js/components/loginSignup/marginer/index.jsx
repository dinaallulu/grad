import PropTypes from "prop-types";
import styled from "styled-components";

const HorizontalMargin = styled.span`
    display: flex;
    width: ${({ margin }) =>
        typeof margin === "string" ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span`
    display: flex;
    height: ${({ margin }) =>
        typeof margin === "string" ? margin : `${margin}px`};
`;

function Marginer(props) {
    const { direction } = props;

    if (direction === "horizontal") return <HorizontalMargin {...props} />;
    else {
        return <VerticalMargin {...props} />;
    }
}

Marginer.propTypes = {
    direction: PropTypes.oneOf(["horizontal", "vertical"]),
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

Marginer.defaultProps = {
    direction: "horizontal",
};

export { Marginer };
