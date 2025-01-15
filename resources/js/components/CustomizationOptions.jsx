import PropTypes from "prop-types";
// import  './ui/customization.module.css'

function CustomizationOptions({ styles, setStyles }) {
    const handleThemeChange = (theme) => {
        setStyles(theme);
    };

    const themeStyle = {
        width: "100%",
        padding: "5px 10px",
        fontSize: "15px",
        marginBottom: "10px",
    };
    const themes = [
        { color: "#000000", backgroundColor: "#FFFFFF", hoverColor: "#A52422" }, //needed light mode
        { color: "#d5deeb", backgroundColor: "#050923", hoverColor: "#8ba3d4" }, //  dark blue => bg: #050923 color: #d5deeb
        { color: "#F1F0E8", backgroundColor: "#080906", hoverColor: "#37E6B8" }, // dark green => bg: #080906 color : #F1F0E8
        { color: "#4a3e37", backgroundColor: "#DEE2E3", hoverColor: "#F88812" }, //light green => bg: #E9EED9 color: #4a3e37
        { color: "#F0F0F0", backgroundColor: "#333333", hoverColor: "#028090" }, // gray
    ];

    const handleFontChange = (e) => {
        setStyles({ ...styles, font: e.target.value });
    };

    const fonts = [
        "Arial",
        "Georgia",
        "Times New Roman",
        "Helvetica",
        "Courier New",
    ];

    return (
        <div>
            <select onChange={handleFontChange} style={themeStyle}>
                {fonts.map((font, index) => (
                    <option key={index} value={font}>
                        {font}
                    </option>
                ))}
            </select>
            <div>
                {/* <label>Theme</label> */}
                <select
                    name="theme"
                    value={JSON.stringify(styles)}
                    style={themeStyle}
                    onChange={(e) =>
                        handleThemeChange(JSON.parse(e.target.value))
                    }
                >
                    {themes.map((theme, index) => (
                        <option key={index} value={JSON.stringify(theme)}>
                            Theme {index + 1}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

CustomizationOptions.propTypes = {
    styles: PropTypes.shape({
        font: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        hoverColor: PropTypes.string.isRequired,
    }).isRequired,
    setStyles: PropTypes.func.isRequired,
};

export default CustomizationOptions;
