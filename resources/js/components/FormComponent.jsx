import { useState } from "react";
import PropTypes from "prop-types";
// import { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from "@mui/material";

// import Modal from './Modal'; // Import the Modal component
import styles from "../../css/ui/form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
// import SocialLinksManager from "./SocialLinks";

function FormComponent({ formData, setFormData }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (
            name === "twitter" ||
            name === "github" ||
            name === "linkedin" ||
            name === "gmail" ||
            name === "orcid" ||
            name === "researchGate" ||
            name === "googleScholar" ||
            name === "youtube"
        ) {
            setFormData({
                ...formData,
                socialLinks: { ...formData.socialLinks, [name]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setFormData({ ...formData, profileImage: reader.result });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    logoImage: file,
                    logoImagePreview: reader.result,
                    profileImage: file,
                    profileImagePreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };


    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newLink, setNewLink] = useState({ type: "twitter", url: "" });

    // Functions to open and close the modal
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    // Function to handle adding the social media link
    const handleAddSocialLink = () => {
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [newLink.type]: newLink.url,
            },
        });
        closeDialog();
    };

    return (
        <form className={styles.formContainer} encType="multipart/form-data">
            <div className={styles.imageUpload}>
                <label htmlFor="profileImage">
                    <span className={styles.imageIcon}>
                        <FontAwesomeIcon icon={faFileImage} />
                        upload logo image
                    </span>
                </label>
                <input
                    id="profileImage"
                    type="file"
                    name="imgInfo"
                    accept="image/*"
                    // onChange={handleImageUpload}
                    onChange={(e) => handleImageUpload(e, "logoImage")}
                    style={{ display: "none" }}
                />
            </div>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
            />
            <Button variant="contained" color="primary" onClick={openDialog}>
                Add Social Media Link
            </Button>

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Add Social Media </DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Social Media Type"
                        value={newLink.type}
                        onChange={(e) =>
                            setNewLink({ ...newLink, type: e.target.value })
                        }
                        fullWidth
                        margin="dense"
                    >
                        <MenuItem value="twitter">Twitter</MenuItem>
                        <MenuItem value="github">GitHub</MenuItem>
                        <MenuItem value="linkedin">LinkedIn</MenuItem>
                        <MenuItem value="gmail">Gmail</MenuItem>
                        <MenuItem value="orcid">ORCID</MenuItem>
                        <MenuItem value="researchGate">ResearchGate</MenuItem>
                        <MenuItem value="googleScholar">
                            Google Scholar
                        </MenuItem>
                        <MenuItem value="youtube">Youtube</MenuItem>
                    </TextField>
                    <TextField
                        label="URL"
                        value={newLink.url}
                        onChange={(e) =>
                            setNewLink({ ...newLink, url: e.target.value })
                        }
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddSocialLink} color="primary">
                        Add Link
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}

FormComponent.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        socialLinks: PropTypes.shape({
            twitter: PropTypes.string,
            github: PropTypes.string,
            linkedin: PropTypes.string,
            gmail: PropTypes.string,
            orcid: PropTypes.string,
            researchGate: PropTypes.string,
            youtube: PropTypes.string,
        }).isRequired,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
};

export default FormComponent;
