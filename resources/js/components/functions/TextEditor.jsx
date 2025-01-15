// import { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import PropTypes from "prop-types";
// import {Modal, Box, Button } from "@mui/material";

// function TextEditor({ onSave }) {
//   const [content, setContent] = useState("");

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   const handleSave = () => {
//     onSave(content);
//   };

//   return (
//     <div>
//       <h2>Add Content</h2>
//       <ReactQuill
//         value={content}
//         onChange={handleChange}
//         modules={TextEditor.modules}
//         formats={TextEditor.formats}
//         placeholder="Type your content here..."
//         style={{ height: '200px', marginBottom: '50px' }}
//       />
//       <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save Content
//         </Button>
//       </div>
//     </div>
//   );
// }

// TextEditor.propTypes = {
//   onSave: PropTypes.func.isRequired,
// };

// TextEditor.modules = {
//   toolbar: [
//     [{ font: [] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     ["link", "image"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     [{ align: [] }],
//     ["clean"],
//   ],
// };

// TextEditor.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "link",
//   "image",
//   "color",
//   "background",
//   "align",
// ];

// export default TextEditor;
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Modal, Box, Button } from "@mui/material";
import PropTypes from "prop-types";

function TextEditor({ open, onClose, onSave, existingContent }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        if (open) {
            setContent(existingContent || "");
        }
    }, [open, existingContent]);

    const handleEditorChange = (value) => {
        setContent(value);
    };

    const handleSave = () => {
        onSave(content);
        setContent("");
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    color: "#000000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "8px",
                }}
            >
                <h2>{existingContent ? "Edit Content" : "Add Content"}</h2>
                <ReactQuill
                    value={content}
                    onChange={handleEditorChange}
                    modules={TextEditor.modules}
                    formats={TextEditor.formats}
                    placeholder="Type your content here..."
                    style={{ height: "200px", marginBottom: "20px" }}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

TextEditor.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    existingContent: PropTypes.string,
};

TextEditor.modules = {
    toolbar: [
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        ["clean"],
    ],
};

TextEditor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "color",
    "background",
    "align",
];

export default TextEditor;
