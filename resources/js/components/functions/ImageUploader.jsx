import { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    IconButton,
    MenuItem,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Margin } from "@mui/icons-material";

const ImageUploaderModal = ({ onAddImage }) => {
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [presetDimensions, setPresetDimensions] = useState("");
    const [caption, setCaption] = useState("");

    const presetOptions = [
        { label: "Small (150x150)", width: "150px", height: "150px" },
        { label: "Medium (300x300)", width: "300px", height: "300px" },
        { label: "Large (600x600)", width: "600px", height: "600px" },
        { label: "Full Width", width: "100%", height: "auto" },
        // { label: "Centered", width: "50%", height: "auto", margin: " 10px auto" },
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handlePresetChange = (value) => {
        setPresetDimensions(value);
        const selected = presetOptions.find((option) => option.label === value);
        if (selected) {
            setWidth(selected.width);
            setHeight(selected.height);
        }
    };

    const handleAddImage = () => {
        if (imageUrl) {
            onAddImage({
                src: imageUrl,
                width,
                height,
                caption
            });
            handleClose();
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Add Image
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Upload Image
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant="body1">Upload from Local:</Typography>
                        <Button variant="outlined" component="label" fullWidth>
                            Choose File
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </Button>
                        <Typography variant="body1">Or paste an image URL:</Typography>
                        <TextField
                            fullWidth
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <Typography variant="body1">Set Dimensions:</Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Width"
                                type="text"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Height"
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                fullWidth
                            />
                        </Stack>
                        <TextField
                            select
                            label="Preset Dimensions"
                            value={presetDimensions}
                            onChange={(e) => handlePresetChange(e.target.value)}
                            fullWidth
                        >
                            {presetOptions.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Typography variant="body1">Image Caption (optional):</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter image caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            multiline
                            rows={2}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddImage}
                        disabled={!imageUrl}
                    >
                        Add Image
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ImageUploaderModal.propTypes = {
    onAddImage: PropTypes.func.isRequired,
};

export default ImageUploaderModal;
