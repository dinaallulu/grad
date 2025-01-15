import PropTypes from "prop-types";

const Tab = ({ activeTab, setActiveTab }) => {
    const tabStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px",
        // backgroundColor: '#f8f9fa',
        border: "3px solid #ddd",
    };
    const tabElementStyle = {
        border: "none",
        backgroundColor: "transparent",
        padding: "1px 10px",
        fontSize: "1rem",
        cursor: "pointer",
    };
    const activeTabStyle = {
        color: "#007bff",
        border: "none",
        BiFontFamily: "600",
        padding: "1px 10px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        "&:hover": {
            transform: "scale(1.1)",
        },
    };
    return (
        <div style={tabStyle}>
            <button
                onClick={() => setActiveTab("personal")}
                style={
                    activeTab === "personal" ? activeTabStyle : tabElementStyle
                }
                className={activeTab === "personal" ? "active" : ""}
            >
                Personal Info
            </button>
            <button
                onClick={() => setActiveTab("customization")}
                style={
                    activeTab === "customization"
                        ? activeTabStyle
                        : tabElementStyle
                }
                className={activeTab === "customization" ? "active" : ""}
            >
                Layout
            </button>
            <button
                onClick={() => setActiveTab("AddPage")}
                style={
                    activeTab === "AddPage" ? activeTabStyle : tabElementStyle
                }
                className={activeTab === "AddPage" ? "active" : ""}
            >
                Content
            </button>
        </div>
    );
};

Tab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};

export default Tab;
