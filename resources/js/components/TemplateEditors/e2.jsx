import { useState } from "react";
import { Box, Paper } from "@mui/material";
import E1 from "./e1"; // Import E1 component
// import GroupLabPreview from "../TemplatePreviews/groupLabPreview";
import "../../../css/ui/groupLabTemplate.css";

function E2() {
    const [template, setTemplate] = useState({
        name: "",
        description: "",
        bio: "",
        // profileImage: "",
        logoImage: "",
        headerImage: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
        },
        contact: {
            email: "",
            phoneNumber: "",
            workingHours: "",
        },
        socialLinks: {
            facebook: "",
            linkedin: "",
            github: "",
            googleScholar: "",
        },
        content: "",
    });

    const [styles, setStyles] = useState({
        font: "Arial",
        color: "#000000",
        backgroundColor: "#FFFFFF",
    });

    // Handler to receive updates from E1
    const handleTemplateUpdate = (newData) => {
        setTemplate((prevTemplate) => ({
            ...prevTemplate,
            ...newData,
            logoImage: newData.logoImage || prevTemplate.logoImage,
        }));

        // Update styles if they're included in the newData
        if (newData.styles) {
            setStyles(newData.styles);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Paper
                sx={{
                    p: 2,
                    height: "100vh",
                    overflow: "auto",
                    background: "transparent",
                }}
            >
                <h2>Group Lab Template Editor</h2>
                <E1
                    template={template}
                    styles={styles}
                    onUpdate={handleTemplateUpdate}
                />
                {/* Uncomment and add the preview if needed */}
                {/* <GroupLabPreview formData={template} /> */}
            </Paper>
        </Box>
    );
}

export default E2;
