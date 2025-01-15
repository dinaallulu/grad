import { useState } from "react";
import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
    Stack,
    Paper,
    IconButton,
    Divider,
    Alert,
    Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";

const CarouselCreator = ({ onAddCarousel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [carouselData, setCarouselData] = useState({
        images: [],
        captions: [],
    });
    const [error, setError] = useState("");
    const [currentCaption, setCurrentCaption] = useState("");

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            handleAddImage(imageUrl);
        }
    };

    const [urlInput, setUrlInput] = useState(""); // Controlled input state

    const handleUrlInput = (e) => {
        const input = e.target.value.trim();

        if (!input) return;

        let validUrl;
        try {
            validUrl = new URL(input);
        } catch (err) {
            setError("Please enter a valid URL");
            return;
        }

        // Add the image immediately to show a preview
        handleAddImage(validUrl.href);
        setUrlInput(""); // Clear the input field
        setError(""); // Clear any error messages

        // Validate the image in the background
        const img = new Image();
        img.onerror = () => {
            // If image fails to load, remove it from the carousel
            setCarouselData(prevData => ({
                images: prevData.images.filter(img => img !== validUrl.href),
                captions: prevData.captions.filter((_, index) => prevData.images[index] !== validUrl.href)
            }));
            setError("Invalid image URL or image failed to load");
        };
        img.src = validUrl.href;
    };

    const handleAddImage = (image) => {
        setCarouselData((prevData) => ({
            ...prevData,
            images: [...prevData.images, image],
            captions: [...prevData.captions, currentCaption],
        }));
        setCurrentCaption("");
    };

    const handleCreateCarousel = (e) => {
        e.preventDefault();
        if (carouselData.images.length < 2) {
            setError("Please add at least 2 images");
            return;
        }

        // Create carousel content block
        onAddCarousel({
            type: "carousel",
            content: {
                images: carouselData.images,
                captions: carouselData.captions
            }
        });

        setIsOpen(false);
        setCarouselData({ images: [], captions: [] });
    };

    const handleDeleteImage = (indexToDelete) => {
        setCarouselData((prevData) => ({
            images: prevData.images.filter((_, index) => index !== indexToDelete),
            captions: prevData.captions.filter((_, index) => index !== indexToDelete),
        }));
    };

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: 800,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        maxHeight: "90vh",
        overflow: "auto",
        "& .MuiInputBase-root": {
            boxShadow: "none !important",
        },
        "& .MuiOutlinedInput-root": {
            boxShadow: "none !important",
        },
        "& .MuiInput-root": {
            boxShadow: "none !important",
        },
        "& .MuiInputBase-input": {
            boxShadow: "none !important",
        },
    };

    return (
        <div>
            <Button
                variant="contained"
                // startIcon={<AddPhotoAlternateIcon />}
                onClick={handleOpenModal}
            >
                Create Carousel
            </Button>

            <Modal
                open={isOpen}
                onClose={handleCloseModal}
                aria-labelledby="carousel-modal-title"
            >
                <Box sx={modalStyle}>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        id="carousel-modal-title"
                    >
                        Create Carousel
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <form onSubmit={handleCreateCarousel}>
                        <Stack spacing={3}>
                            <Typography variant="h6">
                                Add Images ({carouselData.images.length} added)
                            </Typography>

                            {error && <Alert severity="error">{error}</Alert>}

                            <Paper sx={{ p: 2 }}>
                                <Stack spacing={2}>
                                    {/* File Upload Section */}
                                    <Box>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: "none", boxShadow: "none !important" }}
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                startIcon={<AddPhotoAlternateIcon />}
                                                fullWidth
                                            >
                                                Upload Local Image
                                            </Button>
                                        </label>
                                    </Box>

                                    {/* URL Input Section */}
                                    <TextField
                                        fullWidth
                                        name="imageUrl"
                                        placeholder="Paste image URL"
                                        size="small"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        onBlur={handleUrlInput}
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            const pastedText = e.clipboardData.getData('text');
                                            setUrlInput(pastedText);
                                            handleUrlInput({ target: { value: pastedText } });
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <LinkIcon sx={{ mr: 1, color: "action.active" }} />
                                            ),
                                        }}
                                    />

                                    {/* Caption Input */}
                                    <TextField
                                        fullWidth
                                        label="Caption"
                                        value={currentCaption}
                                        onChange={(e) => setCurrentCaption(e.target.value)}
                                        placeholder="Enter caption for next image"
                                        size="small"
                                        sx={{ "& .MuiOutlinedInput-root": { boxShadow: "none" } }}
                                    />
                                </Stack>
                            </Paper>

                            {/* Preview Section */}
                            {carouselData.images.length > 0 && (
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Preview
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "10px",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {carouselData.images.map((img, index) => (
                                            <Box item xs={12} sm={6} md={4} key={index}>
                                                <Paper
                                                    elevation={2}
                                                    sx={{
                                                        p: 1,
                                                        position: "relative",
                                                        width: 100,
                                                        height: 150,
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            position: "absolute",
                                                            right: 8,
                                                            top: 8,
                                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                            "&:hover": {
                                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                            },
                                                        }}
                                                        onClick={() => handleDeleteImage(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <img
                                                        src={img}
                                                        alt={`Preview ${index + 1}`}
                                                        style={{
                                                            width: "100%",
                                                            height: 100,
                                                            objectFit: "cover",
                                                            borderRadius: 4,
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ mt: 1, textAlign: "center" }}
                                                    >
                                                        {carouselData.captions[index]}
                                                    </Typography>
                                                </Paper>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            )}

                            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                                <Button onClick={handleCloseModal}>Cancel</Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={carouselData.images.length < 2}
                                >
                                    Create Carousel
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default CarouselCreator;
