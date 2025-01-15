import { saveAs } from "file-saver";
import JSZip from "jszip";
import {
    generateHTMLCode,
    generateCSSCode,
    generateJSCode,
} from "./generateCode";
import PropTypes from "prop-types";
import DownloadIcon from "@mui/icons-material/Download";

function DownloadButton({
    formData,
    styles,
    content,
    pages,
    navigationPages,
    onDownload,
}) {
    const btnStyle = {
        border: "none",
        backgroundColor: "#071754",
        color: "#ecf2ff",
        padding: "5px 15px",
        fontSize: "1rem",
        cursor: "pointer",
        borderRadius: "5px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        transition: "transform 0.2s ease",
        "&:hover": {
            transform: "scale(1.1)",
        },
    };

    const extractAssets = (content, formData) => {
        const assets = new Set();

        // Add profile image if exists
        if (formData.profileImage) {
            assets.add(formData.profileImage);
        }

        // Extract from content blocks
        content.forEach((block) => {
            if (!block.type || !block.content) return;

            switch (block.type) {
                case "single":
                    if (block.content.imageUrl)
                        assets.add(block.content.imageUrl);
                    break;

                case "double":
                    if (block.content.imageUrl)
                        assets.add(block.content.imageUrl);
                    if (block.content.imageUrl2)
                        assets.add(block.content.imageUrl2);
                    break;

                case "triple":
                    if (block.content.imageUrl)
                        assets.add(block.content.imageUrl);
                    if (block.content.imageUrl2)
                        assets.add(block.content.imageUrl2);
                    if (block.content.imageUrl3)
                        assets.add(block.content.imageUrl3);
                    break;

                case "gallery":
                    if (block.content.imageUrl)
                        assets.add(block.content.imageUrl);
                    if (block.content.imageUrl2)
                        assets.add(block.content.imageUrl2);
                    if (block.content.imageUrl3)
                        assets.add(block.content.imageUrl3);
                    if (block.content.imageUrl4)
                        assets.add(block.content.imageUrl4);
                    break;

                case "carousel":
                    if (block.content.images) {
                        block.content.images.forEach((img) => assets.add(img));
                    }
                    break;

                case "publication":
                    if (block.content.image) {
                        assets.add(block.content.image);
                    }
                    break;

                // Teaching blocks typically don't have images
                case "teaching":
                    if (block.content.image) {
                        assets.add(block.content.image);
                    }
                    break;
            }
        });

        return Array.from(assets);
    };

    const fetchAndAddAsset = async (zip, url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const fileName = url.split("/").pop();
            zip.file(`assets/${fileName}`, blob);
        } catch (error) {
            console.error(`Failed to fetch asset: ${url}`, error);
        }
    };

    const handleDownload = async () => {
        const zip = new JSZip();

        // Create assets folder
        const assetsFolder = zip.folder("assets");

        // Get all assets
        const assets = extractAssets(content, formData);

        // Add all assets to zip
        await Promise.all(assets.map((url) => fetchAndAddAsset(zip, url)));

        // Add main files
        const htmlCode = generateHTMLCode(
            formData,
            content,
            pages,
            navigationPages
        );
        const cssCode = generateCSSCode(styles);
        const jsCode = generateJSCode();

        zip.file("index.html", htmlCode);
        zip.file("styles.css", cssCode);
        zip.file("script.js", jsCode);

        // Generate and download zip
        const zipContent = await zip.generateAsync({ type: "blob" });
        saveAs(zipContent, `${formData.name}_website.zip`);

        onDownload();
    };

    return (
        <button
            onClick={handleDownload}
            style={btnStyle}
            className="download-button"
        >
            <DownloadIcon />
        </button>
    );
}

DownloadButton.propTypes = {
    formData: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    content: PropTypes.array,
    pages: PropTypes.array,
    navigationPages: PropTypes.array,
    onDownload: PropTypes.func.isRequired,
};

DownloadButton.defaultProps = {
    content: [],
    pages: [],
    navigationPages: [],
};

export default DownloadButton;
