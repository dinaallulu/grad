import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGithub,
    faLinkedin,
    faOrcid,
    faResearchgate,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import styles from "../../../css/ui/preview.module.css";
import {
    faEnvelope,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ContentBlock from "../functions/ContentBlock";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    MobileStepper,
    Box,
    IconButton,
    Grid,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import GitHubIcon from "@mui/icons-material/GitHub";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DeleteIcon from "@mui/icons-material/Delete";
// import ContactBlock from '../ContentBlocks/ContactBlockManager';

function PreviewComponent({
    formData,
    styles: componentStyles,
    navigationPages,
    pages,
    content,
    onUpdateContent,
    onDeleteContent,
    selectedPageId,
}) {
    const [carouselStep, setCarouselStep] = useState(0);
    const [hoveredBlockId, setHoveredBlockId] = useState(null);
    const currentPage =
        pages.find((page) => page.id === selectedPageId)?.title || "Home";

    const renderLayoutContent = (block) => {
        const { type, content } = block;

        const getImageStyle = (size, alignment) => {
            const sizeStyles = {
                fullWidth: { width: "100%", height: "auto" },
                small: { width: "200px", height: "200px" },
                medium: { width: "400px", height: "400px" },
                large: { width: "600px", height: "600px" },
            };

            return {
                ...sizeStyles[size],
                display: "block",
                ...(alignment === "center" && { margin: "0 auto" }),
                ...(alignment === "left" && {
                    float: "left",
                    marginRight: "1rem",
                }),
                ...(alignment === "right" && {
                    float: "right",
                    marginLeft: "1rem",
                }),
            };
        };

        const renderImage = (url, size, alignment, caption) => {
            if (!url) return null;
            return (
                <figure style={{ margin: "0", padding: "10px" }}>
                    <img
                        src={url}
                        alt={caption || ""}
                        style={getImageStyle(size, alignment)}
                    />
                    {caption && (
                        <figcaption
                            style={{
                                textAlign: "center",
                                color: "rgba(0, 0, 0, 0.6)",
                                fontSize: "0.875rem",
                                marginTop: "0.5rem",
                            }}
                        >
                            {caption}
                        </figcaption>
                    )}
                </figure>
            );
        };

        const containerStyle = {
            margin: "20px 0",
            padding: "20px",
            border: "1px solid #eee",
        };

        // const quillContentStyle = {
        //   '& a': {
        //     color: `${componentStyles.color} !important`,
        //   }
        // };

        switch (type) {
            case "single":
                return (
                    <div style={containerStyle}>
                        <h2>{content.header}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content.paragraph,
                            }}
                            className="quill-content"
                        />
                        {renderImage(
                            content.imageUrl,
                            content.imageSize,
                            content.imageAlignment,
                            content.caption
                        )}
                    </div>
                );

            case "double":
                return (
                    <div style={containerStyle}>
                        {content.header && <h2>{content.header}</h2>}
                        {content.paragraph && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.paragraph,
                                }}
                            />
                        )}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "20px",
                            }}
                        >
                            {renderImage(
                                content.imageUrl,
                                content.imageSize,
                                content.imageAlignment,
                                content.caption
                            )}
                            {renderImage(
                                content.imageUrl2,
                                content.imageSize2,
                                content.imageAlignment2,
                                content.caption2
                            )}
                        </div>
                    </div>
                );

            case "triple":
                return (
                    <div style={containerStyle}>
                        {content.header && <h2>{content.header}</h2>}
                        {content.paragraph && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.paragraph,
                                }}
                            />
                        )}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                gap: "20px",
                            }}
                        >
                            {renderImage(
                                content.imageUrl,
                                content.imageSize,
                                content.imageAlignment,
                                content.caption
                            )}
                            {renderImage(
                                content.imageUrl2,
                                content.imageSize2,
                                content.imageAlignment2,
                                content.caption2
                            )}
                            {renderImage(
                                content.imageUrl3,
                                content.imageSize3,
                                content.imageAlignment3,
                                content.caption3
                            )}
                        </div>
                    </div>
                );

            case "gallery":
                return (
                    <div style={containerStyle}>
                        {content.header && <h2>{content.header}</h2>}
                        {content.paragraph && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.paragraph,
                                }}
                            />
                        )}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "20px",
                            }}
                        >
                            {[
                                {
                                    url: content.imageUrl,
                                    size: content.imageSize,
                                    alignment: content.imageAlignment,
                                    caption: content.caption,
                                },
                                {
                                    url: content.imageUrl2,
                                    size: content.imageSize2,
                                    alignment: content.imageAlignment2,
                                    caption: content.caption2,
                                },
                                {
                                    url: content.imageUrl3,
                                    size: content.imageSize3,
                                    alignment: content.imageAlignment3,
                                    caption: content.caption3,
                                },
                                {
                                    url: content.imageUrl4,
                                    size: content.imageSize4,
                                    alignment: content.imageAlignment4,
                                    caption: content.caption4,
                                },
                            ].map(
                                (img, index) =>
                                    img.url && (
                                        <div key={index}>
                                            {renderImage(
                                                img.url,
                                                img.size,
                                                img.alignment,
                                                img.caption
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                );

            case "publication":
                return (
                    <Card
                        sx={{
                            margin: "20px 0",
                            maxWidth: "100%",
                            display: "flex",
                            flexDirection: "row",
                            padding: "10px",
                            borderRadius: "15px",
                            alignItems: "center",
                        }}
                    >
                        {content.image && (
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 200,
                                    height: 250,
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                }}
                                image={content.image}
                                alt={content.title}
                            />
                        )}
                        <CardContent sx={{ flex: "1 1 auto" }}>
                            <Typography variant="h6" component="div">
                                {content.title}
                            </Typography>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content.paragraph,
                                }}
                            />
                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                {content.youtubeLink && (
                                    <IconButton
                                        href={content.youtubeLink}
                                        target="_blank"
                                        color="primary"
                                        size="small"
                                    >
                                        <YouTubeIcon />
                                    </IconButton>
                                )}
                                {content.articleLink && (
                                    <IconButton
                                        href={content.articleLink}
                                        target="_blank"
                                        color="primary"
                                        size="small"
                                    >
                                        <ArticleIcon />
                                    </IconButton>
                                )}
                                {content.githubLink && (
                                    <IconButton
                                        href={content.githubLink}
                                        target="_blank"
                                        color="primary"
                                        size="small"
                                    >
                                        <GitHubIcon />
                                    </IconButton>
                                )}
                                {content.pdfLink && (
                                    <IconButton
                                        href={content.pdfLink}
                                        target="_blank"
                                        color="primary"
                                        size="small"
                                    >
                                        <PictureAsPdfIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                );

            case "carousel": {
                const maxSteps = content.images.length;
                const handleNext = () => {
                    setCarouselStep((prevStep) => prevStep + 1);
                };
                const handleBack = () => {
                    setCarouselStep((prevStep) => prevStep - 1);
                };

                return (
                    <Box
                        sx={{
                            maxWidth: "100%",
                            flexGrow: 1,
                            margin: "20px 0",
                            position: "relative",
                        }}
                        onMouseEnter={() => setHoveredBlockId(block.id)}
                        onMouseLeave={() => setHoveredBlockId(null)}
                    >
                        {hoveredBlockId === block.id && (
                            <IconButton
                                onClick={() => onDeleteContent(block.id)}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    zIndex: 1000,
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                            <img
                                src={content.images[carouselStep]}
                                alt={
                                    content.captions[carouselStep] ||
                                    `Slide ${carouselStep + 1}`
                                }
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            {content.captions[carouselStep] && (
                                <Typography
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        width: "100%",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        color: "white",
                                        padding: "10px",
                                        textAlign: "center",
                                    }}
                                >
                                    {content.captions[carouselStep]}
                                </Typography>
                            )}
                        </Box>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={carouselStep}
                            sx={{
                                backgroundColor: "transparent",
                                "& .MuiMobileStepper-dot": {
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                },
                                "& .MuiMobileStepper-dotActive": {
                                    backgroundColor: "primary.main",
                                },
                            }}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={carouselStep === maxSteps - 1}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    disabled={carouselStep === 0}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </Button>
                            }
                        />
                    </Box>
                );
            }

            case "teaching":
                return (
                    <Card
                        sx={{
                            margin: "20px 0",
                            maxWidth: "90%",
                            padding: "25px",
                            borderRadius: "10px",
                            textAlign: "justify",
                            boxShadow: "rgba(0, 0, 0, 3%) 0px 1px 7px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            gutterBottom
                            sx={{
                                fontWeight: "500",
                                borderBottom: "1px solid #000",
                                paddingBottom: "10px",
                            }}
                        >
                            {content.courseName}
                        </Typography>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content.description,
                            }}
                            style={{
                                marginBottom: "20px",
                                color: "rgba(0, 0, 0, 0.79)",
                                padding: " 0 0.5rem ",
                            }}
                        />
                        <Box sx={{ display: "flex", gap: 2, opacity: "0.9" }}>
                            {content.youtubeLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<YouTubeIcon />}
                                    href={content.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Course Videos
                                </Button>
                            )}
                            {content.syllabusLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<ArticleIcon />}
                                    href={content.syllabusLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Syllabus
                                </Button>
                            )}
                            {content.contactLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<ContactMailIcon />}
                                    href={content.contactLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Contact
                                </Button>
                            )}
                        </Box>
                    </Card>
                );

            case "contact":
                return (
                    <Card
                        sx={{
                            margin: "20px 0",
                            padding: "25px",
                            borderRadius: "10px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            gutterBottom
                            sx={{ borderBottom: "1px solid #eee", pb: 2 }}
                        >
                            Contact Information
                        </Typography>

                        <Grid container spacing={3}>
                            {content.address && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Address
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        {content.address.street}
                                        <br />
                                        {content.address.city},{" "}
                                        {content.address.state}{" "}
                                        {content.address.zipCode}
                                    </Typography>
                                </Grid>
                            )}

                            <Grid item xs={12} md={6}>
                                {content.phone && (
                                    <>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Phone
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ mb: 2 }}
                                        >
                                            {content.phone}
                                        </Typography>
                                    </>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {content.email && (
                                    <>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Email
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ mb: 2 }}
                                        >
                                            {content.email}
                                        </Typography>
                                    </>
                                )}
                            </Grid>

                            {content.workingHours?.length > 0 && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: "bold", mt: 2 }}
                                    >
                                        Working Hours
                                    </Typography>
                                    {content.workingHours.map(
                                        (hours, index) => (
                                            <Typography
                                                key={index}
                                                variant="body1"
                                            >
                                                {hours.days}: {hours.hours}
                                            </Typography>
                                        )
                                    )}
                                </Grid>
                            )}

                            {Object.entries(content.socialMedia || {}).some(
                                ([_, value]) => value
                            ) && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: "bold",
                                            mt: 2,
                                            mb: 1,
                                        }}
                                    >
                                        Social Media
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        {Object.entries(
                                            content.socialMedia
                                        ).map(
                                            ([platform, url]) =>
                                                url && (
                                                    <Button
                                                        key={platform}
                                                        variant="outlined"
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            textTransform:
                                                                "capitalize",
                                                        }}
                                                    >
                                                        {platform}
                                                    </Button>
                                                )
                                        )}
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <div
                className="container"
                style={{
                    fontFamily: componentStyles.font,
                    color: componentStyles.color,
                    background: componentStyles.backgroundColor,
                    display: "flex",
                    "--hover-color": componentStyles.hoverColor,
                }}
            >
                <div className={styles.personalInfoContainer}>
                    {formData.profileImage && (
                        <img
                            className={styles.profileImage}
                            // src={formData.profileImage}
                            src={formData.profileImagePreview}
                            alt={`${formData.name} Profile`}
                        />
                    )}
                    <strong>{formData.name}</strong>
                    <p>{formData.bio}</p>

                    <div className={styles.socialLinks}>
                        {formData.socialLinks.gmail && (
                            <a
                                href={`mailto:${formData.socialLinks.gmail}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                            </a>
                        )}
                        {formData.socialLinks.twitter && (
                            <a
                                href={`https://twitter.com/${formData.socialLinks.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                        )}
                        {formData.socialLinks.github && (
                            <a
                                href={`https://github.com/${formData.socialLinks.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} size="2x" />
                            </a>
                        )}
                        {formData.socialLinks.linkedin && (
                            <a
                                href={`https://linkedin.com/in/${formData.socialLinks.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        )}
                        {formData.socialLinks.orcid && (
                            <a
                                href={`https://orcid.com/${formData.socialLinks.orcid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faOrcid} size="2x" />
                            </a>
                        )}
                        {formData.socialLinks.researchGate && (
                            <a
                                href={`https://researchgate.com/${formData.socialLinks.researchGate}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faResearchgate}
                                    size="2x"
                                />
                            </a>
                        )}
                        {formData.socialLinks.youtube && (
                            <a
                                href={`https://youtube.com/${formData.socialLinks.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faYoutube} size="2x" />
                            </a>
                        )}
                    </div>

                    <nav>
                        <ul>
                            {navigationPages.map((page) => (
                                <li key={page.id}>
                                    <a
                                        href={page.path}
                                        style={{
                                            fontWeight:
                                                currentPage === page.title
                                                    ? "bold"
                                                    : "normal",
                                        }}
                                    >
                                        {page.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={`${styles.contentContainer} contentContainer`}>
                    {pages.map((page) => (
                        <section
                            key={page.id}
                            id={page.title}
                            style={{
                                display:
                                    page.id === selectedPageId
                                        ? "block"
                                        : "none",
                            }}
                        >
                            {content
                                .filter((block) => block.pageId === page.id)
                                .map((block) => {
                                    if (block.type) {
                                        return (
                                            <div key={block.id}>
                                                {renderLayoutContent(block)}
                                                <div className="block-controls">
                                                    <button
                                                        onClick={() =>
                                                            onDeleteContent(
                                                                block.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    } else if (
                                        block.content.includes(
                                            "image-container"
                                        )
                                    ) {
                                        return (
                                            <div
                                                key={block.id}
                                                dangerouslySetInnerHTML={{
                                                    __html: block.content,
                                                }}
                                                onMouseEnter={(e) => {
                                                    const overlay =
                                                        e.currentTarget.querySelector(
                                                            ".image-overlay"
                                                        );
                                                    if (overlay)
                                                        overlay.style.display =
                                                            "flex";
                                                }}
                                                onMouseLeave={(e) => {
                                                    const overlay =
                                                        e.currentTarget.querySelector(
                                                            ".image-overlay"
                                                        );
                                                    if (overlay)
                                                        overlay.style.display =
                                                            "none";
                                                }}
                                                onClick={(e) => {
                                                    if (
                                                        e.target.classList.contains(
                                                            "delete-btn"
                                                        )
                                                    ) {
                                                        onDeleteContent(
                                                            block.id
                                                        );
                                                    }
                                                }}
                                            />
                                        );
                                    }
                                    return (
                                        <ContentBlock
                                            key={block.id}
                                            content={block.content}
                                            onUpdate={(updatedContent) =>
                                                onUpdateContent(
                                                    block.id,
                                                    updatedContent
                                                )
                                            }
                                            onDelete={() =>
                                                onDeleteContent(block.id)
                                            }
                                        />
                                    );
                                })}
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
}

PreviewComponent.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        socialLinks: PropTypes.shape({
            twitter: PropTypes.string,
            github: PropTypes.string,
            linkedin: PropTypes.string,
            orcid: PropTypes.string,
            gmail: PropTypes.string,
            researchGate: PropTypes.string,
            youtube: PropTypes.string,
        }).isRequired,
    }).isRequired,
    styles: PropTypes.shape({
        font: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        hoverColor: PropTypes.string.isRequired,
    }).isRequired,
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
    content: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string,
            content: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    images: PropTypes.arrayOf(PropTypes.string),
                    captions: PropTypes.arrayOf(PropTypes.string),
                    // For publication type
                    title: PropTypes.string,
                    paragraph: PropTypes.string,
                    image: PropTypes.string,
                    youtubeLink: PropTypes.string,
                    articleLink: PropTypes.string,
                    githubLink: PropTypes.string,
                    pdfLink: PropTypes.string,
                    // For other layout types
                    header: PropTypes.string,
                    imageUrl: PropTypes.string,
                    imageSize: PropTypes.string,
                    imageAlignment: PropTypes.string,
                    caption: PropTypes.string,
                    // For teaching type
                    courseName: PropTypes.string,
                    description: PropTypes.string,
                    syllabusLink: PropTypes.string,
                    contactLink: PropTypes.string,
                    address: PropTypes.shape({
                        street: PropTypes.string,
                        city: PropTypes.string,
                        state: PropTypes.string,
                        zipCode: PropTypes.string,
                    }),
                    workingHours: PropTypes.arrayOf(
                        PropTypes.shape({
                            days: PropTypes.string,
                            hours: PropTypes.string,
                        })
                    ),
                    socialMedia: PropTypes.object,
                    phone: PropTypes.string,
                    email: PropTypes.string,
                }),
            ]).isRequired,
        })
    ).isRequired,
    onUpdateContent: PropTypes.func.isRequired,
    onDeleteContent: PropTypes.func.isRequired,
    navigationPages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedPageId: PropTypes.string.isRequired,
};

export default PreviewComponent;
