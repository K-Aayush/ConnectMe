"use client";

import { useState } from "react";
import { Button } from "./index";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


interface AuthModalProps {
    isVisible: boolean;
    onClose: () => void;
    setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    isSignUp: boolean;
}


const AuthModal = ({ isVisible, onClose, setIsSignUp, isSignUp }: AuthModalProps) => {
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(["user", "admin"]);
    const [showUserForm, setShowUserForm] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isSelectingRole, setIsSelectingRole] = useState<boolean>(!isSignUp);

    const [email, setEmail] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");
    const [confirmPassword, setConfirmPassword] = useState<string | null>("");
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});


    let navigate = useRouter();

    if (!isVisible) return null;

    const validate = () => {
        let tempErrors: { email?: string; password?: string; confirmPassword?: string } = {};

        if (!email) {
            tempErrors.email = "Email is Required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "Invalid email address";
        }

        if (!password) {
            tempErrors.password = "Password is required";
        } else if (isSignUp) {
            if (password.length < 7) {
                tempErrors.password = "Password must be at least 7 characters";
            } else if (!/\d/.test(password)) {
                tempErrors.password = "Password must contain at least one number";
            } else if (!/[!@#$%^&*]/.test(password)) {
                tempErrors.password = "Password must contain at least one special character";
            }
        }

        if (isSignUp) {
            if (!confirmPassword) {
                tempErrors.confirmPassword = "Password is Required";
            } else if (confirmPassword !== password) {
                tempErrors.confirmPassword = "Password doesn't match";
            }
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    // Function to handle closing the modal
    const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.id === "container") {
            onClose();
        }
    };

    const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            if (isSignUp && password !== confirmPassword) {
                setError("Passwords do not match!");
                return;
            }
    
            const endpoint = isSignUp ? "signup" : "login";
            const response = await axios.post(`http://localhost:8000/${endpoint}`, { email, password });
    
            if (response.status === 201) {
                setCookie("user_id" as "user", response.data.userId);
                setCookie("AuthToken" as "user", response.data.token);
                navigate.push(isSignUp ? "/onBoard" : "/Dashboard");
            } else if (response.status === 409) {
                setError("User already exists.");
            } else if (response.status === 401) {
                const responseData = response.data;
                if (responseData && responseData.message === "Incorrect password") {
                    setError("Incorrect password");
                } else {
                    setError("Invalid Credentials");
                }
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error occurred during user signup/login:", error);
            setError("Incorrect Password");
        }
    };
    


    const handleAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            if (isSignUp && password !== confirmPassword) {
                setError("Passwords do not match!");
                return;
            }

            const endpoint = isSignUp ? "signup" : "adminLogin";
            const response = await axios.post(`http://localhost:8000/${endpoint}`, { email, password });

            if (response.status === 201) {
                setCookie("admin_id" as "admin", response.data.adminId);
                setCookie("AdminAuthToken" as "admin", response.data.token);
                navigate.push("/AdminDashboard");
            } else if (response.status === 401) {
                setError("Invalid Credentials");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error occurred during admin login:", error);
            setError("Incorrect Password");
        }
    };


    const renderRoleSelection = () => (
        <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="my-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52] text-3xl font-bold">
                Log In
            </h1>
            <div className="flex flex-col gap-4">
                <Button
                    custom="w-48 border text-transparent bg-clip-text border-slate-500 hover:border-slate-900 bg-gradient-to-r from-[#e90b78] to-[#f06e52]"
                    label="User"
                    onClick={() => {
                        setIsAdmin(false);
                        setShowUserForm(true);
                        setIsSelectingRole(false);
                    }}
                />
                <Button
                    custom="border text-transparent bg-clip-text border-slate-500 hover:border-slate-900 bg-gradient-to-r from-[#e90b78] to-[#f06e52]"
                    label="Admin"
                    onClick={() => {
                        setIsAdmin(true);
                        setShowUserForm(false);
                        setIsSelectingRole(false);
                    }}
                />
                <hr />
            </div>
        </div>
    );

    const renderForm = () => (
        <form className="flex flex-col gap-3" onSubmit={isAdmin ? handleAdminSubmit : handleUserSubmit} action="">
            <h1 className="my-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52] text-3xl font-bold">
                {isSignUp ? "Create Account" : "Log In"}
            </h1>
            <input
                className="border border-slate-600 bg-transparent text-gray-900 text-md rounded-lg block w-full p-2.5"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            <div className="relative">
                <input
                    className="border border-slate-600 bg-transparent text-gray-900 text-md rounded-lg block w-full p-2.5 pr-10"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showPassword ? (
                        <FaEye className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                    ) : (
                        <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                    )}
                </div>
            </div>
            {errors.password && <div className="text-red-500 text-sm">{isSignUp ? errors.password : "Incorrect password"}</div>}

            {isSignUp && (
                <div className="relative">
                    <input
                        className="border border-slate-600 bg-transparent text-gray-900 text-md rounded-lg block w-full p-2.5"
                        type={showConfirmPassword ? "text" : "password"}
                        id="password-check"
                        name="password-check"
                        placeholder="Confirm Password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {showConfirmPassword ? (
                            <FaEye className="text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
                        ) : (
                            <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
                        )}

                    </div>
                </div>
            )}
            {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
            {error && <div className="text-red-500 text-sm">{error}</div>}


            <Button
                custom="border text-transparent bg-clip-text border-slate-500 hover:border-slate-900 bg-gradient-to-r from-[#e90b78] to-[#f06e52]"
                label={isSignUp ? "Create" : "Log In"}
                onClick={() => { }}
            />
            <hr />
        </form>
    );

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="relative bg-gradient-to-b from-[#fdbcdbcb] via-[#ffd6eacb] to-[#ffb5a4dc] p-8 rounded-xl">
                <div className="flex flex-col items-center justify-center gap-2">
                    {isSelectingRole ? renderRoleSelection() : renderForm()}
                    <p className="text-black text-xl">Find Your Soulmate</p>
                </div>
                <div onClick={handleOnClose} className="cursor-pointer absolute top-2 right-4">
                    <span id="container" className="text-gray-600 text-2xl">×</span>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
