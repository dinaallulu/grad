import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const ContentBlock = ({ content, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const [isHovering, setIsHovering] = useState(false);

    const handleSave = () => {
        onUpdate(editedContent);
        setIsEditing(false);
    };

    return (
        <div
            style={{
                position: "relative",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {isEditing ? (
                <ReactQuill
                    value={editedContent}
                    onChange={setEditedContent}
                    theme="snow"
                    style={{ backgroundColor: "#f9f9f9", color: "#000" }}
                />
            ) : (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            )}

            <div
                style={{
                    display: isHovering ? "block" : "none",
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                }}
            >
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{
                            marginRight: "5px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "green",
                            fontSize: "1.5rem",
                            textShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <FaEdit />
                    </button>
                )}
                <button
                    onClick={onDelete}
                    style={{
                        marginRight: "5px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        fontSize: "1.5rem",
                        textShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <FaTrash />
                </button>
                {isEditing && (
                    <button
                        onClick={handleSave}
                        style={{
                            marginRight: "5px",
                            backGround: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "blue",
                            fontSize: "1.5rem",
                            textShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <FaSave />
                    </button>
                )}
            </div>
        </div>
    );
};

ContentBlock.propTypes = {
    content: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default ContentBlock;
