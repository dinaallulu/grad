// component to add the syllabus to the page
// add info
// add comments
// add links to youtube playlists

import { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Typography,
    Grid,
    IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TextEditor from "../functions/TextEditor";

function TeachingBlockManager({ onAddBlock }) {
    const [open, setOpen] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [courseData, setCourseData] = useState({
        courseName: "",
        description: "",
        youtubeLink: "",
        syllabusLink: "",
        contactLink: "",
    });

    const handleInputChange = (field) => (event) => {
        setCourseData({
            ...courseData,
            [field]: event.target.value,
        });
    };

    const handleSubmit = () => {
        onAddBlock({
            type: "teaching",
            content: courseData,
        });
        setOpen(false);
        setCourseData({
            courseName: "",
            description: "",
            youtubeLink: "",
            syllabusLink: "",
            contactLink: "",
        });
    };

    const handleEditorSave = (content) => {
        setCourseData({
            ...courseData,
            description: content,
        });
        setEditorOpen(false);
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Teaching</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    Add Course Card
                </Button>
            </AccordionDetails>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        boxShadow: "none",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                    },
                }}
            >
                <DialogTitle>
                    Add Course Content
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Course Name"
                                value={courseData.courseName}
                                onChange={handleInputChange("courseName")}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        boxShadow: "none",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => setEditorOpen(true)}
                                sx={{ mt: 1 }}
                            >
                                {courseData.description
                                    ? "Edit Description"
                                    : "Add Description"}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="YouTube Playlist Link"
                                value={courseData.youtubeLink}
                                onChange={handleInputChange("youtubeLink")}
                                InputProps={{
                                    startAdornment: (
                                        <YouTubeIcon color="error" />
                                    ),
                                }}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        boxShadow: "none",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Syllabus Link"
                                value={courseData.syllabusLink}
                                onChange={handleInputChange("syllabusLink")}
                                InputProps={{
                                    startAdornment: (
                                        <ArticleIcon color="primary" />
                                    ),
                                }}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        boxShadow: "none",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Contact Link"
                                value={courseData.contactLink}
                                onChange={handleInputChange("contactLink")}
                                InputProps={{
                                    startAdornment: (
                                        <ContactMailIcon color="action" />
                                    ),
                                }}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        boxShadow: "none",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                fullWidth
                            >
                                Add Course
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <TextEditor
                    open={editorOpen}
                    onClose={() => setEditorOpen(false)}
                    onSave={handleEditorSave}
                    existingContent={courseData.description}
                />
            </Dialog>
        </Accordion>
    );
}

export default TeachingBlockManager;
