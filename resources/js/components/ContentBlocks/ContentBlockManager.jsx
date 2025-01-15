import PropTypes from "prop-types";
import { useState } from "react";
import {
    Button,
    // Dialog,
    // DialogTitle,
    // DialogContent,
    DialogActions,
    Grid,
    Paper,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Modal,
    TextField,
    FormControl,
    MenuItem,
    Tabs,
    Tab,
} from "@mui/material";
// import AddIcon from '@mui/icons-material/Add';
import ImageIcon from "@mui/icons-material/Image";
// import TextFieldsIcon from '@mui/icons-material/TextFields';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextEditor from "../functions/TextEditor";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const LAYOUT_OPTIONS = [
    {
        id: "single",
        icon: (
            <Box
                sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                }}
            >
                <ImageIcon sx={{ fontSize: 24 }} />
                <Box
                    sx={{ width: "100%", height: "2px", bgcolor: "grey.300" }}
                />
                <Box
                    sx={{ width: "100%", height: "2px", bgcolor: "grey.300" }}
                />
            </Box>
        ),
    },
    {
        id: "double",
        // title: 'Two Columns',
        icon: (
            <Box
                sx={{
                    p: 0.5,
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.1,
                    }}
                >
                    <ImageIcon sx={{ fontSize: 22 }} />
                    <Box
                        sx={{
                            width: "100%",
                            height: "2px",
                            bgcolor: "grey.300",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.1,
                    }}
                >
                    <ImageIcon sx={{ fontSize: 22 }} />
                    <Box
                        sx={{
                            width: "100%",
                            height: "2px",
                            bgcolor: "grey.300",
                        }}
                    />
                </Box>
            </Box>
        ),
    },
    // {
    //   id: 'featured',
    //   // title: 'Featured Layout',
    //   icon: (
    //     <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
    //       <Box sx={{ flex: 1 }}>
    //         <ImageIcon sx={{ fontSize: 24 }} />
    //       </Box>
    //       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
    //         <ImageIcon sx={{ fontSize: 13 }} />
    //         <ImageIcon sx={{ fontSize: 13 }} />
    //       </Box>
    //     </Box>
    //   )
    // },
    {
        id: "triple",
        // title: 'Three Columns',
        icon: (
            <Box
                sx={{
                    p: 0.5,
                    display: "flex",
                    gap: 0.1,
                    justifyContent: "center",
                }}
            >
                {[1, 2, 3].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.1,
                        }}
                    >
                        <ImageIcon sx={{ fontSize: 24 }} />
                        <Box
                            sx={{
                                width: "100%",
                                height: "4px",
                                bgcolor: "grey.300",
                            }}
                        />
                    </Box>
                ))}
            </Box>
        ),
    },
    // // {
    // //   id: 'alternating',
    // //   // title: 'Alternating',
    // //   icon: (
    // //     <Box sx={{ p: 1, display: 'flex', gap: 1, justifyContent: 'center' }}>
    // //       <ImageIcon sx={{ fontSize: 24 }} />
    // //       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center' }}>
    // //         <Box sx={{ width: '20px', height: '2px', bgcolor: 'grey.300' }} />
    // //         <Box sx={{ width: '20px', height: '2px', bgcolor: 'grey.300' }} />
    // //       </Box>
    // //     </Box>
    //   )
    // },

    {
        id: "gallery",
        // title: 'Gallery Grid',
        icon: (
            <Box
                sx={{
                    p: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 0,
                }}
            >
                {[1, 2, 3, 4].map((i) => (
                    <ImageIcon key={i} sx={{ fontSize: 20 }} />
                ))}
            </Box>
        ),
    },
];

const IMAGE_SIZE_OPTIONS = {
    fullWidth: { width: "100%", height: "auto" },
    small: { width: "200px", height: "200px" },
    medium: { width: "400px", height: "400px" },
    large: { width: "600px", height: "600px" },
};

const IMAGE_ALIGNMENT_OPTIONS = {
    center: "center",
    left: "left",
    right: "right",
};

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

function ContentBlockManager({ onAddBlock }) {
    // const [open, setOpen] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState(null);
    // const [configOpen, setConfigOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [blockContent, setBlockContent] = useState({
        header: "",
        paragraph: "",
        imageUrl: "",
        imageUrl2: "",
        imageUrl3: "",
        imageUrl4: "",
        imageSize: "fullWidth",
        imageAlignment: "center",
        imageSize2: "fullWidth",
        imageAlignment2: "center",
        imageSize3: "fullWidth",
        imageAlignment3: "center",
        imageSize4: "fullWidth",
        imageAlignment4: "center",
        caption: "",
        caption2: "",
        caption3: "",
        caption4: "",
    });
    const [activeTab, setActiveTab] = useState(0);
    const [isQuillOpen, setIsQuillOpen] = useState(false);

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => {
    //   setOpen(false);
    //   setSelectedLayout(null);
    // };

    const handleLayoutSelect = (layout) => {
        setSelectedLayout(layout);
        setModalOpen(true);
    };

    // const handleConfigClose = () => {
    //   setConfigOpen(false);
    //   setSelectedLayout(null);
    // };

    const handleInputChange = (field) => (event) => {
        setBlockContent((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSaveConfig = () => {
        if (selectedLayout && onAddBlock) {
            onAddBlock({
                type: selectedLayout.id,
                content: blockContent,
            });
        }
        setBlockContent({
            header: "",
            paragraph: "",
            imageUrl: "",
            imageUrl2: "",
            imageUrl3: "",
            imageUrl4: "",
            imageSize: "fullWidth",
            imageAlignment: "center",
            imageSize2: "fullWidth",
            imageAlignment2: "center",
            imageSize3: "fullWidth",
            imageAlignment3: "center",
            imageSize4: "fullWidth",
            imageAlignment4: "center",
            caption: "",
            caption2: "",
            caption3: "",
            caption4: "",
        });
        handleModalClose();
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedLayout(null);
        setBlockContent({
            header: "",
            paragraph: "",
            imageUrl: "",
            imageUrl2: "",
            imageUrl3: "",
            imageUrl4: "",
            imageSize: "fullWidth",
            imageAlignment: "center",
            imageSize2: "fullWidth",
            imageAlignment2: "center",
            imageSize3: "fullWidth",
            imageAlignment3: "center",
            imageSize4: "fullWidth",
            imageAlignment4: "center",
            caption: "",
            caption2: "",
            caption3: "",
            caption4: "",
        });
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const isValidContent = () => {
        if (["double", "triple", "gallery"].includes(selectedLayout?.id)) {
            return Object.keys(blockContent)
                .filter((key) => key.startsWith("imageUrl"))
                .some((key) => blockContent[key].trim() !== "");
        }
        return (
            blockContent.header.trim() !== "" &&
            blockContent.paragraph.trim() !== "" &&
            blockContent.imageUrl.trim() !== ""
        );
    };

    const handleImageUpload = async (event, index) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                const suffix = index === 0 ? "" : index + 1;
                setBlockContent((prev) => ({
                    ...prev,
                    [`imageUrl${suffix}`]: base64,
                }));
            } catch (error) {
                console.error("Error converting image:", error);
            }
        }
    };

    const renderImageControls = (index) => {
        const suffix = index === 0 ? "" : index + 1;
        return (
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    label={`Image URL ${index + 1}`}
                    value={blockContent[`imageUrl${suffix}`]}
                    onChange={handleInputChange(`imageUrl${suffix}`)}
                    margin="normal"
                    required
                />
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 1, mb: 2 }}
                    fullWidth
                >
                    Upload Image {index + 1}
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                    />
                </Button>
                <TextField
                    fullWidth
                    label={`Caption (optional)`}
                    value={blockContent[`caption${suffix}`]}
                    onChange={handleInputChange(`caption${suffix}`)}
                    margin="normal"
                    multiline
                    rows={2}
                />
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <TextField
                        select
                        label="Size"
                        value={blockContent[`imageSize${suffix}`]}
                        onChange={handleInputChange(`imageSize${suffix}`)}
                        sx={{ minWidth: 120 }}
                    >
                        {Object.keys(IMAGE_SIZE_OPTIONS).map((size) => (
                            <MenuItem key={size} value={size}>
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Alignment"
                        value={blockContent[`imageAlignment${suffix}`]}
                        onChange={handleInputChange(`imageAlignment${suffix}`)}
                        sx={{ minWidth: 120 }}
                    >
                        {Object.keys(IMAGE_ALIGNMENT_OPTIONS).map(
                            (alignment) => (
                                <MenuItem key={alignment} value={alignment}>
                                    {alignment.charAt(0).toUpperCase() +
                                        alignment.slice(1)}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                </Box>
            </Box>
        );
    };

    const handleQuillSave = (content) => {
        setBlockContent((prev) => ({
            ...prev,
            paragraph: content,
        }));
        setIsQuillOpen(false);
    };

    const renderModalContent = () => {
        const needsTabs = ["double", "triple", "gallery"].includes(
            selectedLayout?.id
        );
        const imageCount =
            selectedLayout?.id === "gallery"
                ? 4
                : selectedLayout?.id === "triple"
                ? 3
                : selectedLayout?.id === "double"
                ? 2
                : 1;

        return (
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    label="Header"
                    value={blockContent.header}
                    onChange={handleInputChange("header")}
                    margin="normal"
                />

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setIsQuillOpen(true)}
                    sx={{ mt: 2, mb: 2 }}
                >
                    Edit Paragraph Content
                </Button>

                <TextEditor
                    open={isQuillOpen}
                    onClose={() => setIsQuillOpen(false)}
                    onSave={handleQuillSave}
                    existingContent={blockContent.paragraph}
                />

                {needsTabs ? (
                    <>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                mb: 2,
                                borderBottom: 1,
                                borderColor: "divider",
                            }}
                        >
                            {[...Array(imageCount)].map((_, index) => (
                                <Tab key={index} label={`Image ${index + 1}`} />
                            ))}
                        </Tabs>

                        {[...Array(imageCount)].map((_, index) => (
                            <Box
                                key={index}
                                role="tabpanel"
                                hidden={activeTab !== index}
                                sx={{ mt: 2 }}
                            >
                                {activeTab === index &&
                                    renderImageControls(index)}
                            </Box>
                        ))}
                    </>
                ) : (
                    renderImageControls(0)
                )}
            </FormControl>
        );
    };

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Add Content Block</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1} sx={{ p: 1 }}>
                        {LAYOUT_OPTIONS.map((layout) => (
                            <Grid item xs={12} sm={6} md={4} key={layout.id}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: 2,
                                        },
                                        height: "70px",
                                    }}
                                    onClick={() => handleLayoutSelect(layout)}
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            p: 2,
                                        }}
                                    >
                                        {layout.icon}
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        maxHeight: "90vh",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        overflow: "auto",
                    }}
                >
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >
                        Configure {selectedLayout?.id} Layout
                    </Typography>

                    {renderModalContent()}

                    <DialogActions sx={{ mt: 2 }}>
                        <Button onClick={handleModalClose}>Cancel</Button>
                        <Button
                            onClick={handleSaveConfig}
                            variant="contained"
                            disabled={!isValidContent()}
                        >
                            Add Block
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </>
    );
}

ContentBlockManager.propTypes = {
    onAddBlock: PropTypes.func.isRequired,
};

export default ContentBlockManager;
