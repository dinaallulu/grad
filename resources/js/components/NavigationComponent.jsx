import PropTypes from "prop-types";

function NavigationComponent({ pages }) {
    return (
        <nav>
            <ul>
                {pages.map((page) => (
                    <li key={page.id}>
                        <a href={page.path}>{page.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
NavigationComponent.propTypes = {
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};
export default NavigationComponent;
