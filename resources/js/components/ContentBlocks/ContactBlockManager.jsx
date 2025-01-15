import { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

function ContactBlockManager({ onAddBlock }) {
    const [open, setOpen] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
        },
        phone: "",
        email: "",
        workingHours: [{ days: "", hours: "" }],
        socialMedia: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
        },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (field, value) => {
        setContactInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSocialMediaChange = (platform, value) => {
        setContactInfo((prev) => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [platform]: value,
            },
        }));
    };

    const addWorkingHours = () => {
        setContactInfo((prev) => ({
            ...prev,
            workingHours: [...prev.workingHours, { days: "", hours: "" }],
        }));
    };

    const removeWorkingHours = (index) => {
        setContactInfo((prev) => ({
            ...prev,
            workingHours: prev.workingHours.filter((_, i) => i !== index),
        }));
    };

    const handleWorkingHoursChange = (index, field, value) => {
        setContactInfo((prev) => ({
            ...prev,
            workingHours: prev.workingHours.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleAddressChange = (field, value) => {
        setContactInfo((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    const handleSubmit = () => {
        onAddBlock({
            type: "contact",
            content: contactInfo,
        });
        handleClose();
        setContactInfo({
            address: {
                street: "",
                city: "",
                state: "",
                zipCode: "",
            },
            phone: "",
            email: "",
            workingHours: [{ days: "", hours: "" }],
            socialMedia: {
                facebook: "",
                twitter: "",
                instagram: "",
                linkedin: "",
            },
        });
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Contact Info
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Contact Information</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Address
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Street Address"
                                        value={contactInfo.address.street}
                                        onChange={(e) =>
                                            handleAddressChange(
                                                "street",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter street address"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        value={contactInfo.address.city}
                                        onChange={(e) =>
                                            handleAddressChange(
                                                "city",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter city"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        value={contactInfo.address.state}
                                        onChange={(e) =>
                                            handleAddressChange(
                                                "state",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter state"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="ZIP Code"
                                        value={contactInfo.address.zipCode}
                                        onChange={(e) =>
                                            handleAddressChange(
                                                "zipCode",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter ZIP code"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={contactInfo.phone}
                                onChange={(e) =>
                                    handleInputChange("phone", e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={contactInfo.email}
                                onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                Working Hours
                            </Typography>
                            {contactInfo.workingHours.map((hours, index) => (
                                <Grid
                                    container
                                    spacing={2}
                                    key={index}
                                    sx={{ mb: 2 }}
                                >
                                    <Grid item xs={5}>
                                        <TextField
                                            fullWidth
                                            label="Days"
                                            value={hours.days}
                                            onChange={(e) =>
                                                handleWorkingHoursChange(
                                                    index,
                                                    "days",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., Mon - Fri"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            fullWidth
                                            label="Hours"
                                            value={hours.hours}
                                            onChange={(e) =>
                                                handleWorkingHoursChange(
                                                    index,
                                                    "hours",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., 9:00 AM - 5:00 PM"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            onClick={() =>
                                                removeWorkingHours(index)
                                            }
                                            disabled={index === 0}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button
                                startIcon={<AddIcon />}
                                onClick={addWorkingHours}
                            >
                                Add Hours
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                Social Media Links
                            </Typography>
                            <Grid container spacing={2}>
                                {Object.keys(contactInfo.socialMedia).map(
                                    (platform) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            key={platform}
                                        >
                                            <TextField
                                                fullWidth
                                                label={
                                                    platform
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    platform.slice(1)
                                                }
                                                value={
                                                    contactInfo.socialMedia[
                                                        platform
                                                    ]
                                                }
                                                onChange={(e) =>
                                                    handleSocialMediaChange(
                                                        platform,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`Enter ${platform} URL`}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Add Contact Block
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

ContactBlockManager.propTypes = {
    onAddBlock: PropTypes.func.isRequired,
};

export default ContactBlockManager;
