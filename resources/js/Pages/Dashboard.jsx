import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../css/styles/Dashboard.css";
import Button from "../components/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [previousWorks, setPreviousWorks] = useState([
        {
            id: 1,
            name: "My First Website",
            type: "personal Website",
            created: "2023-05-01 14:30:00",
            lastUpdate: "2023-05-02 09:15:00",
        },
        {
            id: 2,
            name: "Portfolio Site",
            type: "Group Lab Website",
            created: "2023-05-15 16:45:00",
            lastUpdate: "2023-05-16 11:20:00",
        },
    ]);

    useEffect(() => {
        // Fetch the user data from the backend
        axios
            .get("/getUser")
            .then((response) => {
                setUserName(response.data.full_name); // Use full_name here
            })
            .catch((error) => {
                console.error("Error fetching user data", error);
            });
    }, []);

    const handleGetStarted = () => {
        navigate("/templates");
    };

    const handleEdit = (id) => {
        console.log("Editing website with id:", id);
    };

    const handleDelete = (id) => {
        console.log("Deleting website with id:", id);
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-buttons">
                <h1 style={{ margin: "1rem 3rem" }}>
                    Welcome {userName ? userName : "#username"}, <br />
                    to your Dashboard
                </h1>
                <Button
                    text="+ Create New Website"
                    color="#071754"
                    fontColor="#fff"
                    filled={true}
                    onClick={handleGetStarted}
                />
            </div>
            <div className="dashboard-content">
                <h2>Your Previous Works</h2>
                {previousWorks.length === 0 ? (
                    <div className="no-works-container">
                        <p>You haven&apos;t created any websites yet</p>
                        <Link to="/templates">+ Create New Website</Link>
                    </div>
                ) : (
                    <TableContainer component={Paper} sx={{ margin: "20px 0" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Website Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Created On</TableCell>
                                    <TableCell>Last Updated</TableCell>
                                    <TableCell align="center">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {previousWorks.map((work) => (
                                    <TableRow key={work.id}>
                                        <TableCell>{work.name}</TableCell>
                                        <TableCell>{work.type}</TableCell>
                                        <TableCell>{work.created}</TableCell>
                                        <TableCell>{work.lastUpdate}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleEdit(work.id)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(work.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
