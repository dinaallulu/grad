import PropTypes from "prop-types";
import "../../../css/ui/groupLabTemplate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGithub,
    faLinkedin,
    faOrcid,
    faResearchgate,
    faFacebook,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import {
    LocationOn,
    Email,
    Phone,
    Facebook,
    School,
    GitHub,
    LinkedIn,
    GitHub as GitHubIcon,
} from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FaTrash } from "react-icons/fa";
import ContentBlock from "../functions/ContentBlock";

function GroupLabPreview({
    formData,
    styles: customStyles = {
        font: "Arial",
        color: "#000",
        backgroundColor: "#fff",
    },
    navigationPages = [],
    content = [],
    selectedPageId,
    onUpdateContent,
    onDeleteContent,
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hoveredBlockId, setHoveredBlockId] = useState(null);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--theme-color",
            customStyles.color
        );
        document.documentElement.style.setProperty(
            "--theme-background",
            customStyles.backgroundColor
        );
        document.documentElement.style.setProperty(
            "--theme-font",
            customStyles.font
        );
    }, [customStyles]);

    const renderContentBlock = (block) => {
        switch (block.type) {
            case "single":
                return (
                    <div key={block.id} className="content-block-wrapper">
                        {block.content.header && (
                            <h2>{block.content.header}</h2>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: block.content.paragraph,
                            }}
                        />
                        {block.content.imageUrl && (
                            <figure>
                                <img
                                    src={block.content.imageUrl}
                                    alt={block.content.caption || ""}
                                    style={{
                                        ...IMAGE_SIZE_OPTIONS[
                                            block.content.imageSize ||
                                                "fullWidth"
                                        ],
                                        margin: "1rem auto",
                                    }}
                                />
                                {block.content.caption && (
                                    <figcaption>
                                        {block.content.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )}
                        <div className="block-controls">
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteContent(block.id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                );

            case "double":
                return (
                    <div key={block.id}>
                        {block.content.header && (
                            <h2>{block.content.header}</h2>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: block.content.paragraph,
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                gap: "2rem",
                                justifyContent: "center",
                                marginTop: "1rem",
                            }}
                        >
                            {[1, 2].map(
                                (num) =>
                                    block.content[
                                        `imageUrl${num === 1 ? "" : num}`
                                    ] && (
                                        <figure
                                            key={num}
                                            style={{
                                                textAlign:
                                                    block.content[
                                                        `imageAlignment${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ] || "center",
                                            }}
                                        >
                                            <img
                                                src={
                                                    block.content[
                                                        `imageUrl${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ]
                                                }
                                                alt={
                                                    block.content[
                                                        `caption${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ] || ""
                                                }
                                                style={
                                                    IMAGE_SIZE_OPTIONS[
                                                        block.content[
                                                            `imageSize${
                                                                num === 1
                                                                    ? ""
                                                                    : num
                                                            }`
                                                        ] || "fullWidth"
                                                    ]
                                                }
                                            />
                                            {block.content[
                                                `caption${num === 1 ? "" : num}`
                                            ] && (
                                                <figcaption>
                                                    {
                                                        block.content[
                                                            `caption${
                                                                num === 1
                                                                    ? ""
                                                                    : num
                                                            }`
                                                        ]
                                                    }
                                                </figcaption>
                                            )}
                                        </figure>
                                    )
                            )}
                        </div>
                    </div>
                );

            case "triple":
                return (
                    <div key={block.id}>
                        {block.content.header && (
                            <h2>{block.content.header}</h2>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: block.content.paragraph,
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center",
                                marginTop: "1rem",
                            }}
                        >
                            {[1, 2, 3].map(
                                (num) =>
                                    block.content[
                                        `imageUrl${num === 1 ? "" : num}`
                                    ] && (
                                        <figure
                                            key={num}
                                            style={{
                                                textAlign:
                                                    block.content[
                                                        `imageAlignment${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ] || "center",
                                            }}
                                        >
                                            <img
                                                src={
                                                    block.content[
                                                        `imageUrl${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ]
                                                }
                                                alt={
                                                    block.content[
                                                        `caption${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ] || ""
                                                }
                                                style={
                                                    IMAGE_SIZE_OPTIONS[
                                                        block.content[
                                                            `imageSize${
                                                                num === 1
                                                                    ? ""
                                                                    : num
                                                            }`
                                                        ] || "fullWidth"
                                                    ]
                                                }
                                            />
                                            {block.content[
                                                `caption${num === 1 ? "" : num}`
                                            ] && (
                                                <figcaption>
                                                    {
                                                        block.content[
                                                            `caption${
                                                                num === 1
                                                                    ? ""
                                                                    : num
                                                            }`
                                                        ]
                                                    }
                                                </figcaption>
                                            )}
                                        </figure>
                                    )
                            )}
                        </div>
                    </div>
                );

            case "gallery":
                return (
                    <div key={block.id}>
                        {block.content.header && (
                            <h2>{block.content.header}</h2>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: block.content.paragraph,
                            }}
                        />
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "1rem",
                                marginTop: "1rem",
                            }}
                        >
                            {[1, 2, 3, 4].map(
                                (num) =>
                                    block.content[
                                        `imageUrl${num === 1 ? "" : num}`
                                    ] && (
                                        <figure
                                            key={num}
                                            style={{
                                                textAlign:
                                                    block.content[
                                                        `imageAlignment${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ] || "center",
                                            }}
                                        >
                                            <img
                                                src={
                                                    block.content[
                                                        `imageUrl${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ]
                                                }
                                                alt={
                                                    block.content[
                                                        `caption${
                                                            num === 1 ? "" : num
                                                        }`
                                                    ] || ""
                                                }
                                                style={
                                                    IMAGE_SIZE_OPTIONS[
                                                        block.content[
                                                            `imageSize${
                                                                num === 1
                                                                    ? ""
                                                                    : num
                                                            }`
                                                        ] || "fullWidth"
                                                    ]
                                                }
                                            />
                                            {block.content[
                                                `caption${num === 1 ? "" : num}`
                                            ] && (
                                                <figcaption>
                                                    {
                                                        block.content[
                                                            `caption${
                                                                num === 1
                                                                    ? ""
                                                                    : num
                                                            }`
                                                        ]
                                                    }
                                                </figcaption>
                                            )}
                                        </figure>
                                    )
                            )}
                        </div>
                    </div>
                );

            case "teaching":
                return (
                    <div key={block.id} className="course-card">
                        <h3>{block.content.courseName}</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: block.content.description,
                            }}
                        />
                        <div className="course-links">
                            {block.content.youtubeLink && (
                                <a
                                    href={block.content.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <YouTubeIcon color="error" /> Course Videos
                                </a>
                            )}
                            {block.content.syllabusLink && (
                                <a
                                    href={block.content.syllabusLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ArticleIcon color="primary" /> Syllabus
                                </a>
                            )}
                            {block.content.contactLink && (
                                <a
                                    href={block.content.contactLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ContactMailIcon /> Contact
                                </a>
                            )}
                        </div>
                    </div>
                );

            case "publication":
                return (
                    <div key={block.id} className="publication-card">
                        <div className="publication-content">
                            {block.content.image && (
                                <img
                                    src={block.content.image}
                                    alt={block.content.title}
                                    className="publication-image"
                                />
                            )}
                            <div className="publication-text">
                                <h3>{block.content.title}</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: block.content.paragraph,
                                    }}
                                />
                                <div className="publication-links">
                                    {block.content.youtubeLink && (
                                        <a
                                            href={block.content.youtubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <YouTubeIcon /> Video
                                        </a>
                                    )}
                                    {block.content.articleLink && (
                                        <a
                                            href={block.content.articleLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ArticleIcon /> Article
                                        </a>
                                    )}
                                    {block.content.githubLink && (
                                        <a
                                            href={block.content.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <GitHubIcon /> Code
                                        </a>
                                    )}
                                    {block.content.pdfLink && (
                                        <a
                                            href={block.content.pdfLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <PictureAsPdfIcon /> PDF
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "carousel": {
                const images = block.content.images;
                const captions = block.content.captions;

                const nextImage = () => {
                    setCurrentImageIndex((prevIndex) =>
                        prevIndex === images.length - 1 ? 0 : prevIndex + 1
                    );
                };

                const previousImage = () => {
                    setCurrentImageIndex((prevIndex) =>
                        prevIndex === 0 ? images.length - 1 : prevIndex - 1
                    );
                };

                return (
                    <div
                        key={block.id}
                        className="carousel-container content-block-wrapper"
                        onMouseEnter={() => setHoveredBlockId(block.id)}
                        onMouseLeave={() => setHoveredBlockId(null)}
                        style={{ position: "relative" }}
                    >
                        {hoveredBlockId === block.id && (
                            <div className="block-controls">
                                <button
                                    className="delete-btn"
                                    onClick={() => onDeleteContent(block.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                        <div className="carousel-content">
                            <IconButton
                                onClick={previousImage}
                                className="carousel-arrow carousel-arrow-left"
                                aria-label="Previous image"
                            >
                                <ArrowBackIosIcon />
                            </IconButton>

                            <div className="carousel-image-container">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={
                                        captions[currentImageIndex] ||
                                        `Slide ${currentImageIndex + 1}`
                                    }
                                    className="carousel-image"
                                />
                                {captions[currentImageIndex] && (
                                    <div className="carousel-caption">
                                        {captions[currentImageIndex]}
                                    </div>
                                )}
                            </div>

                            <IconButton
                                onClick={nextImage}
                                className="carousel-arrow carousel-arrow-right"
                                aria-label="Next image"
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>

                        <div className="carousel-dots">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`carousel-dot ${
                                        index === currentImageIndex
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                );
            }
            case "contact": {
                return (
                    <div
                        key={block.id}
                        className="contact-block content-block-wrapper"
                    >
                        <h2>Connect with Us</h2>
                        <div className="contact-section">
                            <div>
                                <div className="contactLocation">
                                    <LocationOnIcon />
                                    <div>
                                        <p>{block.content.address.street}</p>
                                        <p>
                                            {block.content.address.city},{" "}
                                            {block.content.address.state}{" "}
                                        </p>
                                        <p>{block.content.address.zipCode}</p>
                                    </div>
                                </div>
                                <br />
                                <br />
                                {block.content.workingHours.map(
                                    (hours, index) => (
                                        <div
                                            key={index}
                                            className="contact-item"
                                        >
                                            <AccessTimeIcon />
                                            <p>
                                                {hours.days}: {hours.hours}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="contactEmailnSocials">
                                <div className="contact-item">
                                    <PhoneIcon />
                                    <p>{block.content.phone}</p>
                                </div>
                                <div className="contact-item">
                                    <EmailIcon />
                                    <p>{block.content.email}</p>
                                </div>
                                <div className="ContactSocialLinks">
                                    {block.content.socialMedia?.facebook && (
                                        <a
                                            href={
                                                block.content.socialMedia
                                                    .facebook
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: "24px",
                                                margin: "0 10px",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                            />
                                        </a>
                                    )}
                                    {block.content.socialMedia?.twitter && (
                                        <a
                                            href={
                                                block.content.socialMedia
                                                    .twitter
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: "24px",
                                                margin: "0 10px",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </a>
                                    )}
                                    {block.content.socialMedia?.linkedin && (
                                        <a
                                            href={
                                                block.content.socialMedia
                                                    .linkedin
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: "24px",
                                                margin: "0 10px",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faLinkedin}
                                            />
                                        </a>
                                    )}
                                    {block.content.socialMedia?.instagram && (
                                        <a
                                            href={
                                                block.content.socialMedia
                                                    .instagram
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: "24px",
                                                margin: "0 10px",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="block-controls">
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteContent(block.id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                );
            }
            default:
                if (block.content.includes("image-container")) {
                    return (
                        <div
                            key={block.id}
                            dangerouslySetInnerHTML={{ __html: block.content }}
                            className="content-block-wrapper"
                            onMouseEnter={(e) => {
                                const overlay =
                                    e.currentTarget.querySelector(
                                        ".image-overlay"
                                    );
                                if (overlay) overlay.style.display = "flex";
                            }}
                            onMouseLeave={(e) => {
                                const overlay =
                                    e.currentTarget.querySelector(
                                        ".image-overlay"
                                    );
                                if (overlay) overlay.style.display = "none";
                            }}
                            onClick={(e) => {
                                if (e.target.classList.contains("delete-btn")) {
                                    onDeleteContent(block.id);
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
                            onUpdateContent(block.id, updatedContent)
                        }
                        onDelete={() => onDeleteContent(block.id)}
                    />
                );
        }
    };

    const IMAGE_SIZE_OPTIONS = {
        fullWidth: { width: "100%", height: "auto" },
        small: { width: "200px", height: "200px" },
        medium: { width: "400px", height: "400px" },
        large: { width: "600px", height: "600px" },
    };

    return (
        <div
            className="previewContainer"
            style={{
                fontFamily: customStyles?.font || "Arial",
                color: customStyles?.color || "#000",
                backgroundColor: customStyles?.backgroundColor || "#fff",
            }}
        >
            <nav>
                <a className="logo" href="#">
                    {formData.profileImage ? (
                        <img
                            className="logo"
                            // src={formData.profileImage}
                            src={formData.profileImagePreview}
                            alt={`${formData.name} logo`}
                        />
                    ) : (
                        formData?.name
                    )}
                </a>
                <div className="nav">
                    {navigationPages.map((page) => (
                        <li key={page.id}>
                            <a href={page.path}>{page.title}</a>
                        </li>
                    ))}
                </div>
            </nav>

            {selectedPageId === 1 && (
                <header id="headerGroupLab">
                    <div className="GroupLabTxt">
                        <h2>{formData?.name}</h2> <br />
                        <p>{formData?.description}</p>
                        {formData?.bio && <p className="bio">{formData.bio}</p>}
                        <div className="socialLinks">
                            {formData?.socialLinks?.facebook && (
                                <a
                                    href={`https://facebook.com/${formData.socialLinks.facebook}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    title="Facebook"
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        size="2x"
                                    />
                                </a>
                            )}
                            {formData?.socialLinks?.twitter && (
                                <a
                                    href={`https://twitter.com/${formData.socialLinks.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    title="Twitter"
                                >
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        size="2x"
                                    />
                                </a>
                            )}
                            {formData?.socialLinks?.github && (
                                <a
                                    href={`https://github.com/${formData.socialLinks.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    title="GitHub"
                                >
                                    <FontAwesomeIcon
                                        icon={faGithub}
                                        size="2x"
                                    />
                                </a>
                            )}
                            {formData?.socialLinks?.linkedin && (
                                <a
                                    href={`https://linkedin.com/in/${formData.socialLinks.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    title="LinkedIn"
                                >
                                    <FontAwesomeIcon
                                        icon={faLinkedin}
                                        size="2x"
                                    />
                                </a>
                            )}
                            {formData?.socialLinks?.gmail && (
                                <a
                                    href={`mailto:${formData.socialLinks.gmail}`}
                                    className="social-icon"
                                    title="Email"
                                >
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        size="2x"
                                    />
                                </a>
                            )}
                            {formData?.socialLinks?.orcid && (
                                <a
                                    href={`https://orcid.org/${formData.socialLinks.orcid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    title="ORCID"
                                >
                                    <FontAwesomeIcon icon={faOrcid} size="2x" />
                                </a>
                            )}
                            {formData?.socialLinks?.googleScholar && (
                                <a
                                    href={`https://scholar.google.com/citations?user=${formData.socialLinks.googleScholar}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    title="Google Scholar"
                                    aria-label="Visit Google Scholar profile"
                                >
                                    <FontAwesomeIcon
                                        icon={faGraduationCap}
                                        size="2x"
                                    />
                                </a>
                            )}
                            {formData?.socialLinks?.researchGate && (
                                <a
                                    href={`https://www.researchgate.net/profile/${formData.socialLinks.researchGate}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    title="ResearchGate"
                                >
                                    <FontAwesomeIcon
                                        icon={faResearchgate}
                                        size="2x"
                                    />
                                </a>
                            )}
                            {formData?.socialLinks?.youtube && (
                                <a href={formData.socialLinks.youtube}>
                                    <FontAwesomeIcon
                                        icon={faYoutube}
                                        size="2x"
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                    {formData?.headerImage && (
                        <img src={formData.headerImage} alt="Lab header" />
                    )}
                </header>
            )}

            <main>
                {content
                    .filter((block) => block.pageId === selectedPageId)
                    .map((block) => renderContentBlock(block))}

                {selectedPageId === "contact" && (
                    <section>
                        <h1>Connect with Us</h1>
                        <div className="content">
                            <div className="location">
                                <LocationOn />
                                <span>
                                    <p>{formData?.address?.street}</p>
                                    <p>{formData?.address?.city}</p>
                                    <p>{formData?.address?.state}</p>
                                    <p>{formData?.address?.zipCode}</p>
                                </span>
                            </div>
                            <div className="email_Social">
                                <p>
                                    <Email /> {formData?.contact?.email}
                                </p>
                                <p>
                                    <Phone /> {formData?.contact?.phoneNumber}
                                </p>
                                <div className="socialLinks">
                                    {formData?.socialLinks?.facebook && (
                                        <a href={formData.socialLinks.facebook}>
                                            <Facebook />
                                        </a>
                                    )}
                                    {formData?.socialLinks?.scholar && (
                                        <a
                                            href={`https://scholar.google.com/citations?user=${formData.socialLinks.scholar}`}
                                        >
                                            <School />
                                        </a>
                                    )}
                                    {formData?.socialLinks?.github && (
                                        <a href={formData.socialLinks.github}>
                                            <GitHub />
                                        </a>
                                    )}
                                    {formData?.socialLinks?.linkedin && (
                                        <a href={formData.socialLinks.linkedin}>
                                            <LinkedIn />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

GroupLabPreview.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        bio: PropTypes.string,
        profileImage: PropTypes.string,
        headerImage: PropTypes.string,
        socialLinks: PropTypes.object,
        address: PropTypes.shape({
            street: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
            zipCode: PropTypes.string,
        }),
        contact: PropTypes.shape({
            email: PropTypes.string,
            phoneNumber: PropTypes.string,
        }),
    }),
    styles: PropTypes.shape({
        font: PropTypes.string,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
    }),
    navigationPages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            path: PropTypes.string,
        })
    ),
    content: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            type: PropTypes.string,
            content: PropTypes.object,
            pageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    selectedPageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onUpdateContent: PropTypes.func.isRequired,
    onDeleteContent: PropTypes.func.isRequired,
};

export default GroupLabPreview;
