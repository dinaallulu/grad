import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    TextField,
    Stack,
    Box,
    Divider,
    Tabs,
    Tab,
    IconButton,
    Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextEditor from "../functions/TextEditor";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZGFuaWlpZGV2IiwiYSI6ImNtMXdubTRjeTBsN3UyanF3a2FyM3d1cW8ifQ.LHBmoFc3PF5lqhz2YxiMFQ";
const searchLocation = async (query) => {
    if (!query) return [];

    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
        )}.json?access_token=${MAPBOX_TOKEN}&types=address,place`
    );
    const data = await response.json();
    return data.features.map((feature) => ({
        label: feature.place_name,
        coordinates: feature.center,
        address: feature.place_name,
    }));
};

function SectionManager({ onAddSection, sections = [] }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [logoType, setLogoType] = useState("upload");
    const [backgroundType, setBackgroundType] = useState("upload");
    const [openEditor, setOpenEditor] = useState(false);
    const [headerConfig, setHeaderConfig] = useState({
        logo: "",
        logoText: "",
        backgroundImage: null,
        backgroundUrl: "",
        maskBackground: true,
        fullHeight: true,
        headerContent: "",
    });
    const [aboutConfig, setAboutConfig] = useState({
        content: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [scheduleConfig, setScheduleConfig] = useState({
        days: [
            {
                date: "",
                events: [
                    {
                        startTime: "",
                        endTime: "",
                        title: "",
                        speaker: "",
                    },
                ],
            },
        ],
    });
    const [speakersConfig, setSpeakersConfig] = useState({
        speakers: [
            {
                name: "",
                role: "",
                image: null,
                imageUrl: "",
                socialLinks: {
                    linkedin: "",
                    twitter: "",
                    instagram: "",
                    facebook: "",
                },
            },
        ],
    });
    const [currentSpeakerTab, setCurrentSpeakerTab] = useState(0);
    const [reservationConfig, setReservationConfig] = useState({
        content: "",
        reservationLink: "",
    });
    const [sectionConfig, setSectionConfig] = useState({
        address: "",
        mapUrl: "",
        image1: null,
        image2: null,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sponsorsConfig, setSponsorsConfig] = useState({
        sponsors: [
            {
                image: null,
                imageUrl: "",
                name: "",
                website: "",
            },
        ],
    });
    const [footerConfig, setFooterConfig] = useState({
        socialLinks: {
            facebook: "",
            instagram: "",
            gmail: "",
            x: "",
        },
    });

    useEffect(() => {
        let active = true;

        if (
            !selectedSection ||
            selectedSection.id !== "venue" ||
            searchQuery === ""
        ) {
            setOptions([]);
            return undefined;
        }

        (async () => {
            setLoading(true);
            const results = await searchLocation(searchQuery);
            if (active) {
                setOptions(results);
            }
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [searchQuery, selectedSection]);

    const availableSections = [
        { id: "navbar", title: "Navigation & Header" },
        { id: "about", title: "About Section" },
        { id: "schedule", title: "Schedule Section" },
        { id: "speakers", title: "Speakers Section" },
        { id: "reservation", title: "Reservation Section" },
        { id: "venue", title: "Venue Section" },
        { id: "sponsors", title: "Sponsors Section" },
        { id: "footer", title: "Footer Section" },
    ];

    const handleOpenModal = (section) => {
        const existingSection = sections.find((s) => s.id === section.id);
        const existingIndex = sections.findIndex((s) => s.id === section.id);

        if (existingSection) {
            if (section.id === "navbar") {
                setHeaderConfig({
                    ...headerConfig,
                    ...existingSection.config,
                });
            } else if (section.id === "about") {
                setAboutConfig({
                    ...aboutConfig,
                    ...existingSection.config,
                });
            }
            setEditIndex(existingIndex);
        } else {
            setEditIndex(null);
        }

        setSelectedSection(section);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSection(null);
        setEditIndex(null);
        setHeaderConfig({
            logo: "",
            logoText: "",
            backgroundImage: null,
            backgroundUrl: "",
            maskBackground: true,
            fullHeight: true,
            headerContent: "",
        });
        setAboutConfig({
            content: "",
        });
        setScheduleConfig({
            days: [
                {
                    date: "",
                    events: [
                        {
                            startTime: "",
                            endTime: "",
                            title: "",
                            speaker: "",
                            description: "",
                        },
                    ],
                },
            ],
        });
        setSpeakersConfig({
            speakers: [
                {
                    name: "",
                    role: "",
                    image: null,
                    imageUrl: "",
                    bio: "",
                    socialLinks: {
                        linkedin: "",
                        twitter: "",
                        instagram: "",
                        facebook: "",
                    },
                },
            ],
        });
        setCurrentSpeakerTab(0);
        setReservationConfig({
            content: "",
            reservationLink: "",
        });
        setSectionConfig({
            address: "",
            mapUrl: "",
            image1: null,
            image2: null,
        });
        setSponsorsConfig({
            sponsors: [
                {
                    image: null,
                    imageUrl: "",
                    name: "",
                    website: "",
                },
            ],
        });
        setFooterConfig({
            socialLinks: {
                facebook: "",
                instagram: "",
                gmail: "",
                x: "",
            },
        });
    };

    const handleAddSection = () => {
        if (selectedSection) {
            if (selectedSection.id === "navbar") {
                const finalConfig = {
                    ...headerConfig,
                    logo:
                        logoType === "text"
                            ? headerConfig.logoText
                            : headerConfig.logo,
                    backgroundImage:
                        backgroundType === "url"
                            ? headerConfig.backgroundUrl
                            : headerConfig.backgroundImage,
                    headerContent: headerConfig.headerContent,
                };
                onAddSection(selectedSection.id, finalConfig, editIndex);
                handleCloseModal();
            } else if (selectedSection.id === "about") {
                onAddSection(selectedSection.id, aboutConfig, editIndex);
                handleCloseModal();
            } else if (selectedSection.id === "schedule") {
                onAddSection(selectedSection.id, scheduleConfig, editIndex);
                handleCloseModal();
            } else if (selectedSection.id === "speakers") {
                onAddSection(selectedSection.id, speakersConfig, editIndex);
                handleCloseModal();
            } else if (selectedSection.id === "reservation") {
                onAddSection(selectedSection.id, reservationConfig, editIndex);
                handleCloseModal();
            } else if (selectedSection.id === "venue") {
                onAddSection(selectedSection.id, sectionConfig, editIndex);
                handleCloseModal();
            } else if (selectedSection.id === "sponsors") {
                onAddSection(selectedSection.id, sponsorsConfig, editIndex);
                handleCloseModal();
            } else if (selectedSection.id === "footer") {
                onAddSection(selectedSection.id, footerConfig, editIndex);
                handleCloseModal();
            }
        }
    };

    const handleEditorSave = (content) => {
        setHeaderConfig({
            ...headerConfig,
            headerContent: content,
        });
        setOpenEditor(false);
    };

    const handleAboutEditorSave = (content) => {
        setAboutConfig({
            ...aboutConfig,
            content: content,
        });
        setOpenEditor(false);
    };

    const getModalContent = () => {
        if (!selectedSection) return null;

        switch (selectedSection.id) {
            case "navbar":
                return (
                    <DialogContent>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Configure your navigation and header section:
                            </Typography>
                            <Divider variant="middle" />
                            {/* Logo Selection */}
                            <Box>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth
                                            label="Logo Text"
                                            value={headerConfig.logoText}
                                            onChange={(e) =>
                                                setHeaderConfig({
                                                    ...headerConfig,
                                                    logoText: e.target.value,
                                                    logo: "",
                                                })
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                            fullWidth
                                            sx={{ padding: "15px" }}
                                        >
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setHeaderConfig({
                                                        ...headerConfig,
                                                        logo: e.target.files[0],
                                                        logoText: "",
                                                    })
                                                }
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Content Configuration with Quill */}
                            <Box>
                                <Button
                                    variant="outlined"
                                    onClick={() => setOpenEditor(true)}
                                    fullWidth
                                    sx={{ mt: 0, padding: "15px" }}
                                >
                                    {headerConfig.headerContent
                                        ? "Edit Content"
                                        : "Add Content"}
                                </Button>
                            </Box>

                            <TextEditor
                                open={openEditor}
                                onClose={() => setOpenEditor(false)}
                                onSave={handleEditorSave}
                                existingContent={headerConfig.headerContent}
                            />

                            {/* Background Image Selection */}
                            <Box>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth
                                            label="Background Image URL"
                                            value={headerConfig.backgroundUrl}
                                            onChange={(e) =>
                                                setHeaderConfig({
                                                    ...headerConfig,
                                                    backgroundUrl:
                                                        e.target.value,
                                                    backgroundImage: null,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                            fullWidth
                                            sx={{ padding: "15px" }}
                                        >
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setHeaderConfig({
                                                        ...headerConfig,
                                                        backgroundImage:
                                                            e.target.files[0],
                                                        backgroundUrl: "",
                                                    })
                                                }
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Background Options in one row */}
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    headerConfig.maskBackground
                                                }
                                                onChange={(e) =>
                                                    setHeaderConfig({
                                                        ...headerConfig,
                                                        maskBackground:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                        }
                                        label="Add dark overlay mask"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    headerConfig.fullHeight
                                                }
                                                onChange={(e) =>
                                                    setHeaderConfig({
                                                        ...headerConfig,
                                                        fullHeight:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                        }
                                        label="Full page height"
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </DialogContent>
                );

            case "about":
                return (
                    <DialogContent>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Configure your about section:
                            </Typography>
                            <Divider variant="middle" />

                            <Box>
                                <Button
                                    variant="outlined"
                                    onClick={() => setOpenEditor(true)}
                                    fullWidth
                                    sx={{ mt: 0, padding: "15px" }}
                                >
                                    {aboutConfig?.content
                                        ? "Edit Content"
                                        : "Add Content"}
                                </Button>
                            </Box>

                            <TextEditor
                                open={openEditor}
                                onClose={() => setOpenEditor(false)}
                                onSave={handleAboutEditorSave}
                                existingContent={aboutConfig?.content || ""}
                            />
                        </Stack>
                    </DialogContent>
                );

            case "schedule":
                return (
                    <DialogContent>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Configure your schedule section:
                            </Typography>
                            <Divider variant="middle" />

                            {scheduleConfig.days.map((day, dayIndex) => (
                                <Box key={dayIndex} sx={{ mb: 4 }}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="Day/Date"
                                            value={day.date}
                                            onChange={(e) => {
                                                const newDays = [
                                                    ...scheduleConfig.days,
                                                ];
                                                newDays[dayIndex].date =
                                                    e.target.value;
                                                setScheduleConfig({
                                                    ...scheduleConfig,
                                                    days: newDays,
                                                });
                                            }}
                                        />

                                        {day.events.map((event, eventIndex) => (
                                            <Box
                                                key={eventIndex}
                                                sx={{
                                                    p: 2,
                                                    border: "1px solid #eee",
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <Stack spacing={2}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="Start Time"
                                                                type="time"
                                                                value={
                                                                    event.startTime
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newDays =
                                                                        [
                                                                            ...scheduleConfig.days,
                                                                        ];
                                                                    newDays[
                                                                        dayIndex
                                                                    ].events[
                                                                        eventIndex
                                                                    ].startTime =
                                                                        e.target.value;
                                                                    setScheduleConfig(
                                                                        {
                                                                            ...scheduleConfig,
                                                                            days: newDays,
                                                                        }
                                                                    );
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                inputProps={{
                                                                    step: 300,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                label="End Time"
                                                                type="time"
                                                                value={
                                                                    event.endTime
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newDays =
                                                                        [
                                                                            ...scheduleConfig.days,
                                                                        ];
                                                                    newDays[
                                                                        dayIndex
                                                                    ].events[
                                                                        eventIndex
                                                                    ].endTime =
                                                                        e.target.value;
                                                                    setScheduleConfig(
                                                                        {
                                                                            ...scheduleConfig,
                                                                            days: newDays,
                                                                        }
                                                                    );
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                inputProps={{
                                                                    step: 300,
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <TextField
                                                        fullWidth
                                                        label="Event Title"
                                                        value={event.title}
                                                        onChange={(e) => {
                                                            const newDays = [
                                                                ...scheduleConfig.days,
                                                            ];
                                                            newDays[
                                                                dayIndex
                                                            ].events[
                                                                eventIndex
                                                            ].title =
                                                                e.target.value;
                                                            setScheduleConfig({
                                                                ...scheduleConfig,
                                                                days: newDays,
                                                            });
                                                        }}
                                                    />

                                                    <TextField
                                                        fullWidth
                                                        label="Speaker"
                                                        value={event.speaker}
                                                        onChange={(e) => {
                                                            const newDays = [
                                                                ...scheduleConfig.days,
                                                            ];
                                                            newDays[
                                                                dayIndex
                                                            ].events[
                                                                eventIndex
                                                            ].speaker =
                                                                e.target.value;
                                                            setScheduleConfig({
                                                                ...scheduleConfig,
                                                                days: newDays,
                                                            });
                                                        }}
                                                    />

                                                    {day.events.length > 1 && (
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            startIcon={
                                                                <DeleteIcon />
                                                            }
                                                            onClick={() => {
                                                                const newDays =
                                                                    [
                                                                        ...scheduleConfig.days,
                                                                    ];
                                                                newDays[
                                                                    dayIndex
                                                                ].events.splice(
                                                                    eventIndex,
                                                                    1
                                                                );
                                                                setScheduleConfig(
                                                                    {
                                                                        ...scheduleConfig,
                                                                        days: newDays,
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            Remove Event
                                                        </Button>
                                                    )}
                                                </Stack>
                                            </Box>
                                        ))}

                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                const newDays = [
                                                    ...scheduleConfig.days,
                                                ];
                                                newDays[dayIndex].events.push({
                                                    startTime: "",
                                                    endTime: "",
                                                    title: "",
                                                    speaker: "",
                                                    description: "",
                                                });
                                                setScheduleConfig({
                                                    ...scheduleConfig,
                                                    days: newDays,
                                                });
                                            }}
                                        >
                                            Add Event
                                        </Button>
                                    </Stack>
                                </Box>
                            ))}

                            <Button
                                variant="contained"
                                onClick={() => {
                                    setScheduleConfig({
                                        ...scheduleConfig,
                                        days: [
                                            ...scheduleConfig.days,
                                            {
                                                date: "",
                                                events: [
                                                    {
                                                        startTime: "",
                                                        endTime: "",
                                                        title: "",
                                                        speaker: "",
                                                        description: "",
                                                    },
                                                ],
                                            },
                                        ],
                                    });
                                }}
                            >
                                Add Another Day
                            </Button>
                        </Stack>
                    </DialogContent>
                );

            case "speakers":
                return (
                    <DialogContent>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Configure your speakers section:
                            </Typography>
                            <Divider variant="middle" />

                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Tabs
                                            value={currentSpeakerTab}
                                            onChange={(e, newValue) =>
                                                setCurrentSpeakerTab(newValue)
                                            }
                                            variant="scrollable"
                                            scrollButtons="auto"
                                        >
                                            {speakersConfig.speakers.map(
                                                (_, index) => (
                                                    <Tab
                                                        key={index}
                                                        label={`Speaker ${
                                                            index + 1
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </Tabs>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={() => {
                                                setSpeakersConfig({
                                                    ...speakersConfig,
                                                    speakers: [
                                                        ...speakersConfig.speakers,
                                                        {
                                                            name: "",
                                                            role: "",
                                                            image: null,
                                                            imageUrl: "",
                                                            bio: "",
                                                            socialLinks: {
                                                                linkedin: "",
                                                                twitter: "",
                                                                instagram: "",
                                                                facebook: "",
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                        >
                                            <PersonAddIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>

                            {speakersConfig.speakers.map((speaker, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display:
                                            currentSpeakerTab === index
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    <Stack spacing={3}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Speaker Name"
                                                    value={speaker.name}
                                                    onChange={(e) => {
                                                        const newSpeakers = [
                                                            ...speakersConfig.speakers,
                                                        ];
                                                        newSpeakers[
                                                            index
                                                        ].name = e.target.value;
                                                        setSpeakersConfig({
                                                            ...speakersConfig,
                                                            speakers:
                                                                newSpeakers,
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Role/Title"
                                                    value={speaker.role}
                                                    onChange={(e) => {
                                                        const newSpeakers = [
                                                            ...speakersConfig.speakers,
                                                        ];
                                                        newSpeakers[
                                                            index
                                                        ].role = e.target.value;
                                                        setSpeakersConfig({
                                                            ...speakersConfig,
                                                            speakers:
                                                                newSpeakers,
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Grid item xs={10}>
                                                <TextField
                                                    fullWidth
                                                    label="Speaker Image URL"
                                                    value={speaker.imageUrl}
                                                    onChange={(e) => {
                                                        const newSpeakers = [
                                                            ...speakersConfig.speakers,
                                                        ];
                                                        newSpeakers[
                                                            index
                                                        ].imageUrl =
                                                            e.target.value;
                                                        newSpeakers[
                                                            index
                                                        ].image = null;
                                                        setSpeakersConfig({
                                                            ...speakersConfig,
                                                            speakers:
                                                                newSpeakers,
                                                        });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button
                                                    variant="outlined"
                                                    component="label"
                                                    startIcon={
                                                        <CloudUploadIcon />
                                                    }
                                                    fullWidth
                                                >
                                                    <input
                                                        type="file"
                                                        hidden
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const newSpeakers =
                                                                [
                                                                    ...speakersConfig.speakers,
                                                                ];
                                                            newSpeakers[
                                                                index
                                                            ].image =
                                                                e.target.files[0];
                                                            newSpeakers[
                                                                index
                                                            ].imageUrl = "";
                                                            setSpeakersConfig({
                                                                ...speakersConfig,
                                                                speakers:
                                                                    newSpeakers,
                                                            });
                                                        }}
                                                    />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="subtitle1">
                                            Social Links
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {Object.entries(
                                                speaker.socialLinks
                                            ).map(([platform, link]) => (
                                                <Grid
                                                    item
                                                    xs={6}
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
                                                        sx={{
                                                            mr: 1,
                                                            "& .MuiInputBase-input":
                                                                {
                                                                    boxShadow:
                                                                        "none !important",
                                                                },
                                                            boxShadow:
                                                                "none !important",
                                                        }}
                                                        value={link}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <Box
                                                                    sx={{
                                                                        mr: 1,
                                                                    }}
                                                                >
                                                                    {platform ===
                                                                        "linkedin" && (
                                                                        <LinkedInIcon />
                                                                    )}
                                                                    {platform ===
                                                                        "twitter" && (
                                                                        <TwitterIcon />
                                                                    )}
                                                                    {platform ===
                                                                        "instagram" && (
                                                                        <InstagramIcon />
                                                                    )}
                                                                    {platform ===
                                                                        "facebook" && (
                                                                        <FacebookIcon />
                                                                    )}
                                                                </Box>
                                                            ),
                                                        }}
                                                        onChange={(e) => {
                                                            const newSpeakers =
                                                                [
                                                                    ...speakersConfig.speakers,
                                                                ];
                                                            newSpeakers[
                                                                index
                                                            ].socialLinks[
                                                                platform
                                                            ] = e.target.value;
                                                            setSpeakersConfig({
                                                                ...speakersConfig,
                                                                speakers:
                                                                    newSpeakers,
                                                            });
                                                        }}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>

                                        {speakersConfig.speakers.length > 1 && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => {
                                                    const newSpeakers =
                                                        speakersConfig.speakers.filter(
                                                            (_, i) =>
                                                                i !== index
                                                        );
                                                    setSpeakersConfig({
                                                        ...speakersConfig,
                                                        speakers: newSpeakers,
                                                    });
                                                    setCurrentSpeakerTab(
                                                        Math.max(
                                                            0,
                                                            currentSpeakerTab -
                                                                1
                                                        )
                                                    );
                                                }}
                                            >
                                                Remove Speaker
                                            </Button>
                                        )}
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </DialogContent>
                );

            case "reservation":
                return (
                    <DialogContent>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Configure your reservation section:
                            </Typography>
                            <Divider variant="middle" />

                            <Box>
                                <Button
                                    variant="outlined"
                                    onClick={() => setOpenEditor(true)}
                                    fullWidth
                                    sx={{ mt: 0, padding: "15px" }}
                                >
                                    {reservationConfig?.content
                                        ? "Edit Content"
                                        : "Add Content"}
                                </Button>
                            </Box>

                            <TextEditor
                                open={openEditor}
                                onClose={() => setOpenEditor(false)}
                                onSave={(content) => {
                                    setReservationConfig({
                                        ...reservationConfig,
                                        content: content,
                                    });
                                    setOpenEditor(false);
                                }}
                                existingContent={
                                    reservationConfig?.content || ""
                                }
                            />

                            <TextField
                                fullWidth
                                label="Reservation Form Link"
                                value={reservationConfig.reservationLink}
                                onChange={(e) =>
                                    setReservationConfig({
                                        ...reservationConfig,
                                        reservationLink: e.target.value,
                                    })
                                }
                                placeholder="https://your-reservation-form.com"
                            />
                        </Stack>
                    </DialogContent>
                );

            case "venue":
                return (
                    <DialogContent>
                        <Typography variant="h6" gutterBottom>
                            Configure Venue Section
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Autocomplete
                            fullWidth
                            options={options}
                            loading={loading}
                            onInputChange={(_, newValue) =>
                                setSearchQuery(newValue)
                            }
                            onChange={(_, newValue) => {
                                if (newValue) {
                                    setSectionConfig((prev) => ({
                                        ...prev,
                                        address: newValue.address,
                                        coordinates: newValue.coordinates,
                                        mapUrl: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${newValue.coordinates[0]},${newValue.coordinates[1]})/${newValue.coordinates[0]},${newValue.coordinates[1]},13,0/800x400?access_token=${MAPBOX_TOKEN}`,
                                    }));
                                }
                            }}
                            getOptionLabel={(option) => option.label || ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Location"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                        "& .MuiOutlinedInput-input": {
                                            boxShadow: "none !important",
                                        },
                                        boxShadow: "none !important",
                                    }}
                                />
                            )}
                        />

                        <TextField
                            fullWidth
                            label="Venue Address"
                            multiline
                            rows={3}
                            value={sectionConfig.address || ""}
                            onChange={(e) =>
                                setSectionConfig((prev) => ({
                                    ...prev,
                                    address: e.target.value,
                                }))
                            }
                            sx={{ mb: 2 }}
                        />

                        {sectionConfig.coordinates && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Preview Map
                                </Typography>
                                <Box
                                    component="img"
                                    src={sectionConfig.mapUrl}
                                    alt="Location Map"
                                    sx={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 1,
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </Box>
                        )}
                    </DialogContent>
                );

            case "sponsors":
                return (
                    <DialogContent>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Configure Sponsors Section
                            </Typography>
                            <Divider variant="middle" />

                            {sponsorsConfig.sponsors.map((sponsor, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        p: 2,
                                        border: "1px solid #eee",
                                        borderRadius: 1,
                                        position: "relative",
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                            >
                                                Sponsor {index + 1}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Sponsor Name"
                                                value={sponsor.name}
                                                onChange={(e) => {
                                                    const newSponsors = [
                                                        ...sponsorsConfig.sponsors,
                                                    ];
                                                    newSponsors[index].name =
                                                        e.target.value;
                                                    setSponsorsConfig({
                                                        ...sponsorsConfig,
                                                        sponsors: newSponsors,
                                                    });
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Website URL"
                                                value={sponsor.website}
                                                onChange={(e) => {
                                                    const newSponsors = [
                                                        ...sponsorsConfig.sponsors,
                                                    ];
                                                    newSponsors[index].website =
                                                        e.target.value;
                                                    setSponsorsConfig({
                                                        ...sponsorsConfig,
                                                        sponsors: newSponsors,
                                                    });
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={10}>
                                            <TextField
                                                fullWidth
                                                label="Logo URL"
                                                value={sponsor.imageUrl}
                                                onChange={(e) => {
                                                    const newSponsors = [
                                                        ...sponsorsConfig.sponsors,
                                                    ];
                                                    newSponsors[
                                                        index
                                                    ].imageUrl = e.target.value;
                                                    newSponsors[index].image =
                                                        null;
                                                    setSponsorsConfig({
                                                        ...sponsorsConfig,
                                                        sponsors: newSponsors,
                                                    });
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                startIcon={<CloudUploadIcon />}
                                                fullWidth
                                                sx={{ padding: "15px" }}
                                            >
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const newSponsors = [
                                                            ...sponsorsConfig.sponsors,
                                                        ];
                                                        newSponsors[
                                                            index
                                                        ].image =
                                                            e.target.files[0];
                                                        newSponsors[
                                                            index
                                                        ].imageUrl = "";
                                                        setSponsorsConfig({
                                                            ...sponsorsConfig,
                                                            sponsors:
                                                                newSponsors,
                                                        });
                                                    }}
                                                />
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    {sponsorsConfig.sponsors.length > 1 && (
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                            }}
                                            onClick={() => {
                                                const newSponsors =
                                                    sponsorsConfig.sponsors.filter(
                                                        (_, i) => i !== index
                                                    );
                                                setSponsorsConfig({
                                                    ...sponsorsConfig,
                                                    sponsors: newSponsors,
                                                });
                                            }}
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}

                            {sponsorsConfig.sponsors.length < 10 && (
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setSponsorsConfig({
                                            ...sponsorsConfig,
                                            sponsors: [
                                                ...sponsorsConfig.sponsors,
                                                {
                                                    image: null,
                                                    imageUrl: "",
                                                    name: "",
                                                    website: "",
                                                },
                                            ],
                                        });
                                    }}
                                >
                                    Add Sponsor
                                </Button>
                            )}
                        </Stack>
                    </DialogContent>
                );

            case "footer":
                return (
                    <DialogContent>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Configure Footer Section
                            </Typography>
                            <Divider variant="middle" />

                            <Grid container spacing={1}>
                                {Object.entries(footerConfig.socialLinks).map(
                                    ([platform, link]) => (
                                        <Grid item xs={12} key={platform}>
                                            <TextField
                                                fullWidth
                                                label={
                                                    platform
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    platform.slice(1)
                                                }
                                                value={link}
                                                sx={{
                                                    "& .MuiInputBase-input": {
                                                        boxShadow:
                                                            "none !important",
                                                    },
                                                    boxShadow:
                                                        "none !important",
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{ mr: 2 }}>
                                                            {platform ===
                                                                "facebook" && (
                                                                <FacebookIcon />
                                                            )}
                                                            {platform ===
                                                                "instagram" && (
                                                                <InstagramIcon />
                                                            )}
                                                            {platform ===
                                                                "gmail" && (
                                                                <EmailIcon />
                                                            )}
                                                            {platform ===
                                                                "x" && (
                                                                <TwitterIcon />
                                                            )}
                                                        </Box>
                                                    ),
                                                }}
                                                onChange={(e) => {
                                                    setFooterConfig({
                                                        ...footerConfig,
                                                        socialLinks: {
                                                            ...footerConfig.socialLinks,
                                                            [platform]:
                                                                e.target.value,
                                                        },
                                                    });
                                                }}
                                                placeholder={`Enter your ${platform} URL`}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Stack>
                    </DialogContent>
                );
        }
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Add Sections to Your Conference Page
            </Typography>

            <Grid container spacing={2}>
                {availableSections.map((section) => (
                    <Grid
                        item
                        xs={12}
                        key={section.id}
                        sx={{ maxWidth: "20%" }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenModal(section)}
                            fullWidth
                            sx={{
                                justifyContent: "flex-start",
                                padding: "10px",
                                textTransform: "none",
                                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {section.title}
                        </Button>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        width: "35%",
                        maxWidth: "900px",
                    },
                }}
            >
                {/* <DialogTitle>
          {selectedSection ? `Add ${selectedSection.title}` : "Add Section"}
        </DialogTitle> */}

                {getModalContent()}

                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button
                        onClick={handleAddSection}
                        variant="contained"
                        color="primary"
                    >
                        Add Section
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

SectionManager.propTypes = {
    onAddSection: PropTypes.func.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            config: PropTypes.object.isRequired,
        })
    ),
};

SectionManager.defaultProps = {
    sections: [],
};

export default SectionManager;
