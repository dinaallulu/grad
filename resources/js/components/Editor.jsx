// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import FormComponent from "./FormComponent";
// import PreviewComponent from "./PreviewComponent";
// import CustomizationOptions from "./CustomizationOptions";
// import DownloadButton from "../utils/DownloadButton";
// import Tab from "./Tab"; // Import the Tab component
// import editorStyles from "./ui/editor.module.css";
// import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
// import TextEditor from "./functions/TextEditor";

// function Editor() {
//   const navigate = useNavigate();
//   const { templateId } = useParams();

//   const [formData, setFormData] = useState({
//     name: "",
//     bio: "",
//     socialLinks: {
//       twitter: "",
//       github: "",
//       linkedin: "",
//       gmail: "",
//       orcid: "",
//     },
//   });

//   const [styles, setStyles] = useState({
//     font: "Arial",
//     color: "#000",
//     backgroundColor: "#FFFFFF",
//   });

//   const [activeTab, setActiveTab] = useState("personal");
//   const [pages, setPages] = useState([]);
//   const [content, setContent] = useState([]); // New state for content
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // Modal visibility

//   const handleDownload = () => {
//     navigate("/dashboard");
//   };

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   const handleSaveContent = (newContent) => {
//     setContent([...content, newContent]); // Add new content to state
//     closeDialog();
//   };

//   return (
//     <div>
//       <div className={editorStyles.headerContainer}>
//         <div>
//           <h3>Edit Your Website</h3>
//           <p>Template: {templateId}</p>
//         </div>
//         <DownloadButton
//           formData={formData}
//           styles={styles}
//           content={content}
//           onDownload={handleDownload}
//         />
//       </div>
//       <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
//       <div className={editorStyles.editorContainer}>
//         <div className={editorStyles.formSection}>
//           {activeTab === "personal" && (
//             <FormComponent
//               formData={formData}
//               setFormData={setFormData}
//               setPages={setPages}
//               pages={pages}
//             />
//           )}
//           {activeTab === "customization" && (
//             <CustomizationOptions styles={styles} setStyles={setStyles} />
//           )}
//           {activeTab === "AddPage" && ( // Add Content Tab
//             <Button variant="contained" color="primary" onClick={openDialog}>
//               Add Content
//             </Button>
//           )}
//         </div>

//         <div className={editorStyles.previewSection}>
//           <PreviewComponent
//             formData={formData}
//             styles={styles}
//             pages={pages}
//             content={content}
//           />
//         </div>
//       </div>

//       {/* Quill Modal */}
//       <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
//         <DialogContent>
//           <TextEditor onSave={handleSaveContent} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDialog} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Editor;
