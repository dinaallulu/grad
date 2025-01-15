import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Typography,
    //   Grid,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextEditor from '../functions/TextEditor';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const PublicationsPeopleBlockManager = ({ onAddBlock }) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [articleLink, setArticleLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [pdfLink, setPdfLink] = useState('');
    const [publications, setPublications] = useState([]);
    const [isQuillOpen, setIsQuillOpen] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleQuillSave = (content) => {
        setParagraph(content);
        setIsQuillOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPublication = {
            title,
            image,
            paragraph,
            youtubeLink,
            articleLink,
            githubLink,
            pdfLink
        };
        setPublications([...publications, newPublication]);

        if (onAddBlock) {
            onAddBlock({
                type: 'publication',
                content: newPublication
            });
        }

        setTitle('');
        setImage('');
        setParagraph('');
        setYoutubeLink('');
        setArticleLink('');
        setGithubLink('');
        setPdfLink('');
        handleClose();
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setImage(base64);
            } catch (error) {
                console.error('Error converting image:', error);
            }
        }
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Publications</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button variant="contained" onClick={handleShow} sx={{ mb: 3 }}>
                    Add Publication
                </Button>


                <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        Add Publication
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ position: 'absolute', right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                margin="normal"
                            />
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                                sx={{ mt: 1, mb: 2 }}
                                fullWidth
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setIsQuillOpen(true)}
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Edit Description Content
                            </Button>
                            <TextEditor
                                open={isQuillOpen}
                                onClose={() => setIsQuillOpen(false)}
                                onSave={handleQuillSave}
                                existingContent={paragraph}
                            />
                            <TextField
                                fullWidth
                                label={<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><YouTubeIcon /> YouTube Link</div>}
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label={<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ArticleIcon /> Article Link</div>}
                                value={articleLink}
                                onChange={(e) => setArticleLink(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label={<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><GitHubIcon /> GitHub Link</div>}
                                value={githubLink}
                                onChange={(e) => setGithubLink(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label={<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><PictureAsPdfIcon /> PDF Link</div>}
                                value={pdfLink}
                                onChange={(e) => setPdfLink(e.target.value)}
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ mt: 2 }}
                            >
                                Add
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </AccordionDetails>
        </Accordion>
    );
};

PublicationsPeopleBlockManager.propTypes = {
    onAddBlock: PropTypes.func
};

export default PublicationsPeopleBlockManager;

