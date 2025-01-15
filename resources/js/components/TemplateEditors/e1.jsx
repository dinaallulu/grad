import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormComponent from "../FormComponent";
import PreviewComponent from "../TemplatePreviews/PreviewComponent";
import CustomizationOptions from "../CustomizationOptions";
import DownloadButton from "../../utils/DownloadButton";
import Tab from "../Tab";
import editorStyles from "../../../css/ui/editor.module.css";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import TextEditor from "../functions/TextEditor";
// import ContentBlock from "../functions/ContentBlock";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageUploadModal from "../functions/ImageUploader";
import CarouselCreator from "../functions/carousel";
import ContentBlockManager from "../ContentBlocks/ContentBlockManager";
import PublicationsPeopleBlockManager from "../ContentBlocks/PublicationsPeopleBlockManager";
import TeachingBlockManager from "../ContentBlocks/TeachingBlockManager";
import GroupLabPreview from "../TemplatePreviews/groupLabPreview";
import ContactBlockManager from "../ContentBlocks/ContactBlockManager";
import axios from "axios";

function Editor() {
    const navigate = useNavigate();
    const { templateId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        logoImage: "",
        headerImage: "",
        socialLinks: {
            facebook: "",
            twitter: "",
            github: "",
            linkedin: "",
            gmail: "",
            orcid: "",
            googleScholar: "",
            researchGate: "",
            youtube: "",
        },
    });

    const [styles, setStyles] = useState({
        font: "Arial",
        color: "#000",
        backgroundColor: "#FFFFFF",
    });

    const [activeTab, setActiveTab] = useState("personal");
    const [pages, setPages] = useState([
        {
            id: 1,
            title: "Home",
            path: "./home",
            content: "<h1>Welcome to Home</h1>",
        },
    ]);
    const [content, setContent] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState("Home");

    const [formState, setFormState] = useState({
        title: "",
        path: "",
        content: "",
    });

    const [editingPageId, setEditingPageId] = useState(null);
    const [selectedPageId, setSelectedPageId] = useState(1);
    const [hideHome, setHideHome] = useState(true);

    const [isContentEditorOpen, setIsContentEditorOpen] = useState(false);
    const [editingContent, setEditingContent] = useState("");

    const handleDownload = () => {
        navigate("/dashboard");
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleCheckboxChange = (event) => {
        setHideHome(event.target.checked);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSavePage = () => {
        const formattedPath = `./${formState.title
            .replace(/\s+/g, "-")
            .toLowerCase()}`;

        if (editingPageId) {
            setPages(
                pages.map((page) =>
                    page.id === editingPageId
                        ? {
                              ...page,
                              title: formState.title,
                              path: formattedPath,
                              content: formState.content,
                          }
                        : page
                )
            );
            setEditingPageId(null);
        } else {
            const newPage = {
                id: Date.now(),
                title: formState.title,
                path: formattedPath,
                content: formState.content,
            };
            setPages([...pages, newPage]);
        }
        setFormState({ title: "", path: "", content: "" });
    };

    const handleDeletePage = (id) => {
        setPages(pages.filter((page) => page.id !== id));
        if (selectedPageId === id) {
            setSelectedPageId(null);
            setSelectedPage("");
        }
        setContent(content.filter((item) => item.page !== id));
    };

    const handleEditPage = (id) => {
        const page = pages.find((page) => page.id === id);
        setFormState({
            title: page.title,
            path: page.path.replace("./", ""),
            content: page.content,
        });
        setEditingPageId(id);
    };

    const handleSelectPage = (e) => {
        const selectedId = parseInt(e.target.value, 10);
        setSelectedPageId(selectedId);
        const page = pages.find((p) => p.id === selectedId);
        setSelectedPage(page ? page.title : "");
    };

    const navigationPages = hideHome
        ? pages.filter((page) => page.title !== "Home")
        : pages;

    const displayPages = pages;

    const handleOpenContentEditor = () => {
        setEditingContent("");
        setIsContentEditorOpen(true);
    };

    const handleSaveContent = (newContent) => {
        if (!selectedPageId) {
            alert("Please select a page before adding content.");
            return;
        }
        const newContentBlock = {
            id: Date.now(),
            content: newContent,
            pageId: selectedPageId,
        };
        setContent((prevContent) => [...prevContent, newContentBlock]);
        setIsContentEditorOpen(false);
    };

    const handleUpdateContent = (blockId, updatedContent) => {
        setContent((prevContent) =>
            prevContent.map((block) =>
                block.id === blockId
                    ? { ...block, content: updatedContent }
                    : block
            )
        );
    };

    const handleDeleteContent = (blockId) => {
        setContent((prevContent) =>
            prevContent.filter((block) => block.id !== blockId)
        );
    };

    const handleAddImageToContent = (image) => {
        if (!selectedPageId) {
            alert("Please select a page before adding an image.");
            return;
        }
        const newContentBlock = {
            id: Date.now(),
            content: `<div class="image-container" style="position: relative; display: inline-block;">
                            <img src="${
                                image.src
                            }" alt="Uploaded" style="width: ${
                image.width
            }; height: ${image.height};" />
                    ${
                        image.caption
                            ? `<figcaption style="text-align: center; margin-top: 8px;">${image.caption}</figcaption>`
                            : ""
                    }
                        <div class="image-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.5);">
                            <button class="delete-btn" style="margin: 5px;">Delete</button>
                        </div>
                    </div>`,
            pageId: selectedPageId,
        };
        setContent((prevContent) => [...prevContent, newContentBlock]);
    };

    const handleAddContentBlock = (layoutConfig) => {
        if (!selectedPageId) {
            alert("Please select a page before adding content.");
            return;
        }

        const newContentBlock = {
            id: Date.now(),
            type: layoutConfig.type,
            content: layoutConfig.content,
            pageId: selectedPageId,
        };

        setContent((prevContent) => [...prevContent, newContentBlock]);
    };

    const handleAddCarousel = (carouselConfig) => {
        if (!selectedPageId) {
            alert("Please select a page before adding a carousel.");
            return;
        }

        const newContentBlock = {
            id: Date.now(),
            type: carouselConfig.type,
            content: carouselConfig.content,
            pageId: selectedPageId,
        };

        setContent((prevContent) => [...prevContent, newContentBlock]);
    };

    const handleContactUpdate = () => {
        if (!selectedPageId) {
            alert("Please select a page before adding contact information.");
            return;
        }
    };

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setFormData((prev) => ({
    //                 ...prev,
    //                 headerImage: reader.result,
    //             }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleImageUpload = (event, field) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                [field]: file, // Set the field (headerImage or logoImage) to the uploaded file
            }));
        }
    };

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    console.log("CSRF Token:", csrfToken);

    const handleSave = async () => {
        const formDataObj = new FormData();

        // Append form data
        formDataObj.append("typeID", templateId);
        formDataObj.append("userID", 38); // Replace with userID
        if (formData.headerImage)
            formDataObj.append("labHeaderImg", formData.headerImage);
        if (formData.logoImage)
            formDataObj.append("imgInfo", formData.logoImage);
        formDataObj.append("name", formData.name);
        formDataObj.append("position", formData.bio);
        formDataObj.append("fontLayout", styles.font);
        formDataObj.append("themeLayout", styles.color);
        // SocialLinks
        formDataObj.append(
            "socialLinks",
            JSON.stringify(formData.socialLinks || {})
        );

        // Debug FormData content
        for (let pair of formDataObj.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await axios.post("/editor", formDataObj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (response.data.success) {
                alert("Data saved successfully!");
                navigate("/dashboard");
            } else {
                alert("Failed to save data. Please try again.");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("An error occurred while saving. Please try again.");
        }
    };

    return (
        <div>
            <div className={editorStyles.headerContainer}>
                <div>
                    <h3>Edit Your Website</h3>
                    <p>Template: {templateId}</p>
                </div>
                <div>
                    {/* Save Button */}
                    <Button
                        style={{
                            border: "none",
                            backgroundColor: "rgb(7, 23, 84)",
                            color: "rgb(236, 242, 255)",
                            padding: "10px 15px",
                            marginRight: "10px",
                            marginBottom: "12px",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            borderRadius: "5px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            transition: "transform 0.2s",
                        }}
                        onClick={handleSave}
                    >
                        <i class="far fa-save"></i>
                    </Button>
                    <DownloadButton
                        formData={formData}
                        styles={styles}
                        content={content}
                        pages={pages}
                        navigationPages={
                            hideHome
                                ? pages.filter((page) => page.title !== "Home")
                                : pages
                        }
                        onDownload={handleDownload}
                    />
                </div>
            </div>

            <div className={editorStyles.editorContainer}>
                <div>
                    <div className="tabContainer">
                        <Tab
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                    <div className={editorStyles.formSection}>
                        {activeTab === "personal" && (
                            <>
                                <FormComponent
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                                <div style={{ marginTop: "20px" }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="header-image-upload"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="header-image-upload">
                                        <Button
                                            variant="contained"
                                            component="span"
                                        >
                                            Upload Header Image
                                        </Button>
                                    </label>
                                </div>
                            </>
                        )}
                        {activeTab === "customization" && (
                            <CustomizationOptions
                                styles={styles}
                                setStyles={setStyles}
                            />
                        )}
                        {activeTab === "AddPage" && (
                            <>
                                <div>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <div style={{ position: "relative" }}>
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Page Title"
                                                value={formState.title}
                                                onChange={handleChange}
                                                className={editorStyles.input}
                                            />
                                            {formState.title && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleSavePage}
                                                    style={{
                                                        position: "absolute",
                                                        right: "8px",
                                                        top: " 37%",
                                                        transform:
                                                            "translateY(-50%)",
                                                        minWidth: "auto",
                                                        padding: "4px 8px",
                                                    }}
                                                >
                                                    {editingPageId
                                                        ? "Save"
                                                        : "+"}
                                                </Button>
                                            )}
                                        </div>
                                    </FormControl>

                                    <FormControl fullWidth sx={{ mb: 1 }}>
                                        <InputLabel>
                                            Select Page to Edit
                                        </InputLabel>
                                        <Select
                                            value={selectedPageId || ""}
                                            onChange={handleSelectPage}
                                            label="Select Page to Edit"
                                            endAdornment={
                                                selectedPageId && (
                                                    <>
                                                        <Button
                                                            size="small"
                                                            onClick={() =>
                                                                handleEditPage(
                                                                    selectedPageId
                                                                )
                                                            }
                                                            sx={{
                                                                minWidth:
                                                                    "auto",
                                                                mr: 1,
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                handleDeletePage(
                                                                    selectedPageId
                                                                )
                                                            }
                                                            sx={{
                                                                minWidth:
                                                                    "auto",
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                    </>
                                                )
                                            }
                                        >
                                            <MenuItem value="">
                                                {/* <em>Select a page</em> */}
                                            </MenuItem>
                                            {pages.map((page) => (
                                                <MenuItem
                                                    key={page.id}
                                                    value={page.id}
                                                >
                                                    {page.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {selectedPage === "Home" && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={hideHome}
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                    color="primary"
                                                />
                                            }
                                            label="hide Home Navigation Link"
                                        />
                                    )}
                                    <div
                                        className={editorStyles.contentButtons}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOpenContentEditor}
                                            disabled={!selectedPageId}
                                        >
                                            Add Content
                                        </Button>

                                        <ImageUploadModal
                                            selectedPageId={selectedPageId}
                                            onAddImage={handleAddImageToContent}
                                        />

                                        <CarouselCreator
                                            onAddCarousel={handleAddCarousel}
                                        />

                                        <ContactBlockManager
                                            onAddBlock={handleAddContentBlock}
                                        />
                                    </div>
                                    <ContentBlockManager
                                        onAddBlock={handleAddContentBlock}
                                    />
                                    <PublicationsPeopleBlockManager
                                        onAddBlock={handleAddContentBlock}
                                    />
                                    <TeachingBlockManager
                                        onAddBlock={handleAddContentBlock}
                                    />
                                </div>

                                <div>
                                    <TextEditor
                                        open={isContentEditorOpen}
                                        onClose={() =>
                                            setIsContentEditorOpen(false)
                                        }
                                        onSave={handleSaveContent}
                                        existingContent={editingContent}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={editorStyles.previewSection}>
                    {templateId === "2" ? (
                        <GroupLabPreview
                            formData={formData}
                            styles={styles}
                            navigationPages={navigationPages}
                            pages={displayPages}
                            content={content}
                            onUpdateContent={handleUpdateContent}
                            onDeleteContent={handleDeleteContent}
                            selectedPageId={selectedPageId}
                            onContactUpdate={handleContactUpdate}
                        />
                    ) : (
                        <PreviewComponent
                            formData={formData}
                            styles={styles}
                            navigationPages={navigationPages}
                            pages={displayPages}
                            content={content}
                            onUpdateContent={handleUpdateContent}
                            onDeleteContent={handleDeleteContent}
                            selectedPageId={selectedPageId}
                            onContactUpdate={handleContactUpdate}
                        />
                    )}
                </div>
            </div>

            {/* Quill Modal */}
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <TextEditor onSave={handleSaveContent} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Editor;
