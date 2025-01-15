import { useNavigate } from "react-router-dom";
import { FaUser, FaHammer, FaInfo } from "react-icons/fa";
import "../../css/styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    const handleHome = () => {
        navigate("/");
    };
    const handleBuild = () => {
        navigate("/templates");
    };

    const handleInfoPage = () => {
        navigate("/infoPage");
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={handleHome}>
                Website Builder
            </div>
            <div className="nav-icons">
                <FaHammer className="user-icon" onClick={handleBuild} />
                <FaInfo className="user-icon" onClick={handleInfoPage} />
                <FaUser className="user-icon" onClick={handleDashboard} />
            </div>
        </nav>
    );
}

export default Navbar;
