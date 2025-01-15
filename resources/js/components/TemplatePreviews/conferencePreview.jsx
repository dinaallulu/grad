import {
    Box,
    Typography,
    Container,
    Grid,
    Tabs,
    Tab,
    Paper,
    Button,
} from "@mui/material";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect, useRef } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import DirectionsIcon from "@mui/icons-material/Directions";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import EmailIcon from "@mui/icons-material/Email";
// import editorStyles from "../ui/e3.module.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoiZGFuaWlpZGV2IiwiYSI6ImNtMXdubTRjeTBsN3UyanF3a2FyM3d1cW8ifQ.LHBmoFc3PF5lqhz2YxiMFQ";

function ConferencePreview({ sections, onDeleteSection }) {
    const [hoveredSection, setHoveredSection] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    useEffect(() => {
        const venueSection = sections.find((section) => section.id === "venue");
        if (!venueSection || !venueSection.config.coordinates) {
            return;
        }

        const coordinates = venueSection.config.coordinates;
        const address = venueSection.config.address;

        if (map.current) {
            map.current.remove();
            map.current = null;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: coordinates,
            zoom: 13,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        marker.current = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map.current);

        new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
        })
            .setLngLat(coordinates)
            .setHTML(`<p style="margin: 0; padding: 5px;">${address}</p>`)
            .addTo(map.current);

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [sections]);

    const renderHeader = (config) => {
        const headerStyle = {
            minHeight: config.fullHeight ? "70vh" : "50vh",
            backgroundImage: config.backgroundImage
                ? `url(${
                      typeof config.backgroundImage === "string"
                          ? config.backgroundImage
                          : URL.createObjectURL(config.backgroundImage)
                  })`
                : config.backgroundUrl
                ? `url(${config.backgroundUrl})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            color: "white",
            padding: "2rem",
            width: "100%",
            fontSize: "1.2rem",
            boxSizing: "border-box",
        };

        const overlayStyle = {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: config.maskBackground
                ? "rgba(0, 0, 0, 0.5)"
                : "transparent",
            zIndex: 1,
        };

        const contentStyle = {
            position: "relative",
            zIndex: 2,
        };

        return (
            <Box sx={headerStyle}>
                <Box sx={overlayStyle} />

                <Box
                    sx={{
                        ...contentStyle,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {config.logo ? (
                        <img
                            src={
                                typeof config.logo === "string"
                                    ? config.logo
                                    : URL.createObjectURL(config.logo)
                            }
                            alt="Logo"
                            style={{ maxHeight: "50px" }}
                        />
                    ) : (
                        <Typography variant="h5">{config.logoText}</Typography>
                    )}
                    <nav
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "1rem",
                            //   backgroundColor: "#333",
                            color: "white",
                        }}
                    >
                        <ul
                            style={{
                                display: "flex",
                                listStyle: "none",
                                padding: "0",
                                margin: "0",
                            }}
                        >
                            <li style={{ marginRight: "20px" }}>
                                <a
                                    href="#preview-schedule"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Schedule
                                </a>
                            </li>
                            <li style={{ marginRight: "20px" }}>
                                <a
                                    href="#preview-speakers"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Speakers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#preview-venue"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Venue
                                </a>
                            </li>
                        </ul>
                    </nav>
                </Box>

                <Container sx={{ ...contentStyle, mt: 8 }}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(config.headerContent),
                        }}
                    />
                </Container>
            </Box>
        );
    };

    const renderAbout = (config) => {
        return (
            <Container sx={{ py: 8 }}>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(config.content),
                    }}
                />
            </Container>
        );
    };

    const renderSchedule = (config) => {
        const handleTabChange = (event, newValue) => {
            setActiveTab(newValue);
        };

        // Custom TabPanel component
        function TabPanel({ children, value, index }) {
            return (
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`schedule-tabpanel-${index}`}
                >
                    {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
                </div>
            );
        }

        TabPanel.propTypes = {
            children: PropTypes.node.isRequired,
            value: PropTypes.number.isRequired,
            index: PropTypes.number.isRequired,
        };

        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h3" gutterBottom align="center">
                    Event Schedule
                </Typography>

                <Paper elevation={0} sx={{ mt: 2 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            backgroundColor: "transparent",
                            "& .MuiTab-root": {
                                color: "black",
                                "&.Mui-selected": {
                                    color: "black",
                                    backgroundColor: "#f5f5f5",
                                    fontWeight: "800",
                                },
                            },
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#0e2991",
                            },
                        }}
                    >
                        {config.days.map((day, index) => (
                            <Tab
                                key={index}
                                label={day.date}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                            />
                        ))}
                    </Tabs>

                    {config.days.map((day, dayIndex) => (
                        <TabPanel
                            key={dayIndex}
                            value={activeTab}
                            index={dayIndex}
                        >
                            <Box sx={{ width: "100%", padding: 2 }}>
                                {day.events.map((event, eventIndex) => (
                                    <Box
                                        key={eventIndex}
                                        sx={{
                                            mb: 2,
                                            p: 1,
                                            // borderRadius: 2,
                                            // border: "1px dotted #ddd",
                                            // boxShadow: "0 0px 3px rgba(0,0,0,0.1)",
                                            borderBottom: "2px solid #eee",
                                            transition: "all 0.2s ease-in-out",
                                            "&:hover": {
                                                // transform: "translateX(1px)",
                                                // borderColor: "primary.main",
                                                borderColor: "#0e2991",
                                                // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                            },
                                        }}
                                    >
                                        <Grid
                                            container
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Grid item xs={12} md={3}>
                                                <Typography
                                                    sx={{
                                                        color: "#0e2991",
                                                        fontWeight: "bold",
                                                        fontSize: "1.2rem",
                                                    }}
                                                >
                                                    {event.startTime} -{" "}
                                                    {event.endTime}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography
                                                    variant="p"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "1.1rem",
                                                        textTransform:
                                                            "capitalize",
                                                        color: "text.primary",
                                                    }}
                                                >
                                                    {event.title}
                                                </Typography>
                                            </Grid>
                                            {event.speaker && (
                                                <Grid item xs={12} md={2}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontStyle: "italic",
                                                        }}
                                                    >
                                                        {event.speaker}
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                ))}
                            </Box>
                        </TabPanel>
                    ))}
                </Paper>
            </Container>
        );
    };

    const renderSpeakers = (config) => {
        return (
            <Container sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Our Speakers
                </Typography>

                <Grid
                    container
                    spacing={4}
                    sx={{ mt: 2 }}
                    justifyContent="center"
                >
                    {config.speakers.map((speaker, index) => (
                        <Grid item key={index} sx={{ width: "auto" }}>
                            <Paper
                                elevation={1}
                                sx={{
                                    width: 220,
                                    borderRadius: 2,
                                    // transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    // '&:hover': {
                                    //   transform: 'translateY(-5px)',
                                    //   boxShadow: 6
                                    // }
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 220,
                                        height: 220,
                                        overflow: "hidden",
                                        position: "relative",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={
                                            speaker.imageUrl ||
                                            (speaker.image
                                                ? URL.createObjectURL(
                                                      speaker.image
                                                  )
                                                : "https://via.placeholder.com/220")
                                        }
                                        alt={speaker.name}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                                <Box sx={{ p: 2, mt: 1 }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        sx={{
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {speaker.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        gutterBottom
                                        sx={{ fontSize: "0.75rem" }}
                                    >
                                        {speaker.role}
                                    </Typography>

                                    <Stack direction="row" spacing={0.5}>
                                        {speaker.socialLinks.linkedin && (
                                            <IconButton
                                                size="small"
                                                href={
                                                    speaker.socialLinks.linkedin
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ padding: "4px" }}
                                            >
                                                <LinkedInIcon
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </IconButton>
                                        )}
                                        {speaker.socialLinks.twitter && (
                                            <IconButton
                                                size="small"
                                                href={
                                                    speaker.socialLinks.twitter
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ padding: "4px" }}
                                            >
                                                <TwitterIcon
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </IconButton>
                                        )}
                                        {speaker.socialLinks.instagram && (
                                            <IconButton
                                                size="small"
                                                href={
                                                    speaker.socialLinks
                                                        .instagram
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ padding: "4px" }}
                                            >
                                                <InstagramIcon
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </IconButton>
                                        )}
                                        {speaker.socialLinks.facebook && (
                                            <IconButton
                                                size="small"
                                                href={
                                                    speaker.socialLinks.facebook
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ padding: "4px" }}
                                            >
                                                <FacebookIcon
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </IconButton>
                                        )}
                                    </Stack>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    };

    const renderReservation = (config) => {
        return (
            <Container sx={{ py: 8 }}>
                <Box
                    sx={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(config.content),
                        }}
                    />

                    <Button
                        variant="contained"
                        href={config.reservationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            mt: 4,
                            backgroundColor: "#0e2991",
                            color: "white",
                            padding: "12px 30px",
                            fontSize: "1.1rem",
                            "&:hover": {
                                backgroundColor: "#091d63",
                                color: "white",
                            },
                        }}
                    >
                        Make Reservation
                    </Button>
                </Box>
            </Container>
        );
    };

    const renderVenue = (config) => {
        return (
            <Container sx={{ py: 8 }} id="preview-venue">
                <Typography variant="h3" align="center" gutterBottom>
                    Venue Location
                </Typography>

                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ p: 3 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={4}>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            Address
                                        </Typography>
                                        <Typography
                                            paragraph
                                            sx={{
                                                flex: 1,
                                                fontSize: "1.2rem",
                                                lineHeight: 1.6,
                                                color: "text.secondary",
                                            }}
                                        >
                                            {config.address}
                                        </Typography>

                                        {config.coordinates && (
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                href={`https://www.mapbox.com/directions?daddr=${config.coordinates[1]},${config.coordinates[0]}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                startIcon={<DirectionsIcon />}
                                                sx={{
                                                    mt: "auto",
                                                    color: "#0e2991",
                                                    borderColor: "#0e2991",
                                                    "&:hover": {
                                                        borderColor: "#091d63",
                                                        backgroundColor:
                                                            "rgba(14, 41, 145, 0.04)",
                                                    },
                                                }}
                                            >
                                                Get Directions
                                            </Button>
                                        )}
                                    </Box>
                                </Grid>

                                {/* Map Column */}
                                <Grid item xs={12} md={8}>
                                    <Box
                                        ref={mapContainer}
                                        sx={{
                                            width: "100%",
                                            height: "350px",
                                            borderRadius: 1,
                                            overflow: "hidden",
                                            border: "1px solid #e0e0e0",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    const renderSponsors = (config) => {
        return (
            <Container sx={{ py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Our Sponsors
                </Typography>

                <Grid
                    container
                    spacing={4}
                    sx={{ mt: 2 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    {config.sponsors.map((sponsor, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    transition: "transform 0.2s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                    },
                                }}
                            >
                                <Box
                                    component="a"
                                    href={sponsor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={
                                            sponsor.imageUrl ||
                                            (sponsor.image
                                                ? URL.createObjectURL(
                                                      sponsor.image
                                                  )
                                                : "https://via.placeholder.com/200")
                                        }
                                        alt={sponsor.name}
                                        sx={{
                                            width: "100%",
                                            maxWidth: 200,
                                            height: "auto",
                                            objectFit: "contain",
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        sx={{
                                            fontSize: "1.1rem",
                                            fontWeight: 500,
                                            color: "text.primary",
                                        }}
                                    >
                                        {sponsor.name}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    };

    const renderFooter = (config) => {
        return (
            <Box
                component="footer"
                sx={{
                    backgroundColor: "#f8f9fa",
                    py: 2,
                    mt: 4,
                    borderTop: "1px solid #eaeaea",
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                mb: 1,
                            }}
                        >
                            {config.socialLinks.facebook && (
                                <IconButton
                                    href={config.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: "#1877f2",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(24, 119, 242, 0.1)",
                                        },
                                    }}
                                >
                                    <FacebookIcon />
                                </IconButton>
                            )}
                            {config.socialLinks.instagram && (
                                <IconButton
                                    href={config.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: "#e4405f",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(228, 64, 95, 0.1)",
                                        },
                                    }}
                                >
                                    <InstagramIcon />
                                </IconButton>
                            )}
                            {config.socialLinks.gmail && (
                                <IconButton
                                    href={`mailto:${config.socialLinks.gmail}`}
                                    sx={{
                                        color: "#ea4335",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(234, 67, 53, 0.1)",
                                        },
                                    }}
                                >
                                    <EmailIcon />
                                </IconButton>
                            )}
                            {config.socialLinks.x && (
                                <IconButton
                                    href={config.socialLinks.x}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: "#14171A",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(20, 23, 26, 0.1)",
                                        },
                                    }}
                                >
                                    <TwitterIcon />
                                </IconButton>
                            )}
                        </Stack>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                        >
                            © {new Date().getFullYear()} All rights reserved
                        </Typography>
                    </Box>
                </Container>
            </Box>
        );
    };

    const deleteButtonStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 3,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
        },
    };

    return (
        <Box
            sx={{
                bgcolor: "#fff",
                height: "100%",
                width: "100%",
                overflow: "auto",
                "& *": {
                    boxSizing: "border-box",
                    maxWidth: "100%",
                },
            }}
        >
            {sections.map((section, index) => {
                const sectionKey = `${section.id}-${index}`;
                return (
                    <Box
                        key={sectionKey}
                        position="relative"
                        onMouseEnter={() => setHoveredSection(sectionKey)}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        {hoveredSection === sectionKey && (
                            <IconButton
                                onClick={() => onDeleteSection(index)}
                                sx={deleteButtonStyle}
                                size="small"
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        )}
                        {section.id === "navbar" &&
                            renderHeader(section.config)}
                        {section.id === "about" && renderAbout(section.config)}
                        {section.id === "schedule" && (
                            <Box id="preview-schedule">
                                {renderSchedule(section.config)}
                            </Box>
                        )}
                        {section.id === "speakers" && (
                            <Box id="preview-speakers">
                                {renderSpeakers(section.config)}
                            </Box>
                        )}
                        {section.id === "reservation" && (
                            <Box id="preview-reservation">
                                {renderReservation(section.config)}
                            </Box>
                        )}
                        {section.id === "venue" && (
                            <Box id="preview-venue">
                                {renderVenue(section.config)}
                            </Box>
                        )}
                        {section.id === "sponsors" && (
                            <Box id="preview-sponsors">
                                {renderSponsors(section.config)}
                            </Box>
                        )}
                        {section.id === "footer" &&
                            renderFooter(section.config)}
                    </Box>
                );
            })}
        </Box>
    );
}

ConferencePreview.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            config: PropTypes.object.isRequired,
        })
    ).isRequired,
    onDeleteSection: PropTypes.func.isRequired,
};

export default ConferencePreview;
