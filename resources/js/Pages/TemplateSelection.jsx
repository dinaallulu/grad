import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import personalWebsite from "../../assets/personalWebsiteTemplate.png";
import groupLabWebsite from "../../assets/grouplabTemplateImg.png";
import conferenceWebsite from "../../assets/ConfrenceTemplateWebsite.png";
import animationData from "../../assets/animationJSON/workInProgress.json";
import "../../css/styles/TemplateSelection.css";
import Lottie from "react-lottie";
import Divider from "../components/Divider";

function TemplateSelection() {
    const [templates, setTemplates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch templates from the backend
        fetch("/templates")
            .then((response) => response.json())
            .then((data) => setTemplates(data))
            .catch((error) =>
                console.error("Error fetching templates:", error)
            );
    }, []);

    // const templates = [
    //     {
    //         id: 1,
    //         name: "Personal website",
    //         type: "image",
    //         image: personalWebsite,
    //     },
    //     {
    //         id: 2,
    //         name: "Group lab website",
    //         type: "image",
    //         image: groupLabWebsite,
    //     },
    //     {
    //         id: 3,
    //         name: "Conference website",
    //         type: "image",
    //         image: conferenceWebsite,
    //     },
    // ];

    const handleTemplateClick = (templateId) => {
        navigate(`/editor/${templateId}`);
    };

    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice",
    //     },
    // };

    return (
        <div className="template-selection-container">
            <Navbar />
            <h1>Choose the type for Highlighting Your Work:</h1>
            <Divider
                color={"#071754"}
                thickness={"2px"}
                margin={"20px 1rem"}
                rounded={"50px"}
            />
            <div className="template-grid">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="template-item"
                        onClick={() => handleTemplateClick(template.id)}
                    >
                        {/* {template.type === "image" ? (
                            <img src={template.image} alt={template.name} />
                        ) : (
                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={350}
                            />
                        )} */}

                        <img
                            src={template.image}
                            alt={template.name}
                        />
                        <p>{template.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemplateSelection;
