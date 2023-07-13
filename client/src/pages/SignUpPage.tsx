import * as React from "react";

import {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";

import axios from "axios";

const inputStyle = {
	backgroundColor: "lightgreen",
	margin: 4,
	width: "30%",
};

const buttonStyle = {
	backgroundColor: "lightgreen",

	padding: "1%",
	margin: "1%",
	width: "8%",
};

const SignUp = () => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignUp = async (
		username: string,
		password: string
	): Promise<void> => {
		try {
			const {
				data: {token},
			}: {data: {token: string}} = await axios.post(
				"http://localhost:9000/auth/sign_up",
				{
					username,
					password,
				}
			);

			localStorage.setItem("token", token);

			// Handle the response data here
			navigate("/home");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box
				margin="auto"
				sx={{
					display: "flex",
					flexDirection: "column",

					p: 1,
					m: 1,
					borderRadius: 1,
					width: "80%",
					alignItems: "center",
				}}
			>
				<Typography variant="h1" textAlign="center" color={"lightgreen"}>
					| sign up |
				</Typography>
				<TextField
					id="outlined-basic"
					label="User Name"
					variant="outlined"
					value={username}
					onChange={(e) => setUserName(e.target.value)}
					sx={inputStyle}
				/>
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					sx={inputStyle}
				/>

				<Button
					sx={buttonStyle}
					onClick={async () => {
						await handleSignUp(username, password);
					}}
				>
					Sign Up
				</Button>

				<Typography color="lightblue" textAlign="center">
					Already have an account?
				</Typography>
				<Button onClick={() => navigate("/")}> Go To Login</Button>
			</Box>
		</>
	);
};

export default SignUp;
