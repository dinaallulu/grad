import { useContext } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    LineText,
    //   MutedLink,
    SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useForm } from "@inertiajs/react";

export function SignupForm() {
    const { data, setData, post, errors, processing } = useForm({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/signup", {
            onError: (errors) => console.error(errors),
        });
    }

    const { switchToSignin } = useContext(AccountContext);

    return (
        <BoxContainer>
            <FormContainer onSubmit={submit}>
                <Input
                    type="text"
                    placeholder="Full name"
                    name="full_name"
                    value={data.full_name}
                    onChange={(e) => setData("full_name", e.target.value)}
                    className={errors.full_name ? "input-error" : ""}
                />
                {errors.full_name && (
                    <div className="error">{errors.full_name}</div>
                )}

                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className={errors.email ? "input-error" : ""}
                />
                {errors.email && <div className="error">{errors.email}</div>}

                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                    <div className="error">{errors.password}</div>
                )}

                <Input
                    type="password"
                    placeholder="Confirm password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    className={
                        errors.password_confirmation ? "input-error" : ""
                    }
                />
                {errors.password_confirmation && (
                    <div className="error">{errors.password_confirmation}</div>
                )}

                <SubmitButton disabled={processing} type="submit">
                    Signup
                </SubmitButton>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Already have an account?{" "}
                <BoldLink onClick={switchToSignin} href="#">
                    Login
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}
