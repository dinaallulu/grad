import { useContext, useState } from "react";
import axios from "axios";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    LineText,
    SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

// Set up Axios CSRF token globally
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export function LoginForm() {
    const { switchToSignup } = useContext(AccountContext);

    // State for form data and error message
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await axios.post("/login", formData);

            if (response.data.success) {
                // Redirect to dashboard on success
                window.location.href = response.data.redirect || "/dashboard";
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "An error occurred while logging in."
            );
        }
    };

    return (
        <BoxContainer>
            <FormContainer onSubmit={handleSubmit}>
                {error && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                    </div>
                )}

                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <SubmitButton type="submit">Login</SubmitButton>
            </FormContainer>

            <Marginer direction="vertical" margin={10} />
            {/* <MutedLink href="#">Forget your password?</MutedLink> */}
            {/* <Marginer direction="vertical" margin="1.6em" /> */}
            <Marginer direction="vertical" margin="5px" />

            <LineText>
                Don&apos;t have an account?{" "}
                <BoldLink onClick={switchToSignup} href="#">
                    Signup
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}
