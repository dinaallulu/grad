import DownloadButton from "../../utils/DownloadButton";
import ConferencePreview from "../TemplatePreviews/conferencePreview";
import editorStyles from "../../../css/ui/e3.module.css";
import SectionManager from "../ContentBlocks/conferenceSectionManager";
import { useState } from "react";

function Editor3() {
    const [sections, setSections] = useState([]);

    const handleAddSection = (sectionId, sectionConfig, editIndex = null) => {
        setSections((prev) => {
            // If editIndex is provided, update the existing section
            if (editIndex !== null) {
                return prev.map((section, index) =>
                    index === editIndex
                        ? { id: sectionId, config: sectionConfig }
                        : section
                );
            }
            // Otherwise, add a new section
            return [...prev, { id: sectionId, config: sectionConfig }];
        });
    };

    const handleDeleteSection = (index) => {
        setSections((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpdateSection = (sectionIndex, newConfig) => {
        setSections((prevSections) => {
            const updatedSections = [...prevSections];
            updatedSections[sectionIndex] = {
                ...updatedSections[sectionIndex],
                config: newConfig,
            };
            return updatedSections;
        });
    };

    return (
        <>
            <div className={editorStyles.container}>
                <div className={editorStyles.e3ContainerHeader}>
                    <div>
                        <h3>Edit Your Website</h3>
                        <p>Template: Conference</p>
                    </div>
                    <DownloadButton />
                </div>
                <div className={editorStyles.e3Container}>
                    <div className={editorStyles.sectionManager}>
                        <SectionManager
                            onAddSection={handleAddSection}
                            sections={sections}
                        />
                    </div>

                    <div className={editorStyles.preview}>
                        <ConferencePreview
                            sections={sections}
                            onDeleteSection={handleDeleteSection}
                            onUpdateSection={handleUpdateSection}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Editor3;
