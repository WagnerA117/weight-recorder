import React, {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import getAxios from "../api/getAxios";
import {useNavigate} from "react-router-dom";

const inputStyle = {
	backgroundColor: "lightblue",
	margin: 4,
	width: "30%",
};

const Login = () => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (
		username: string,
		password: string
	): Promise<void> => {
		try {
			const {
				data: {token},
			}: {data: {token: string}} = await getAxios().post("/auth/login", {
				username,
				password,
			});

			localStorage.setItem("token", token);

			if (token) {
				navigate("/home");
			}
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
					backgroundColor: "black",
					m: 2,
					borderRadius: 1,
					width: "80%",
					alignItems: "center",
				}}
			>
				<Typography variant="h1" color={"lightblue"} textAlign="center">
					login{" "}
				</Typography>
				<TextField
					onChange={(e) => setUserName(e.target.value)}
					value={username}
					id="outlined-basic"
					label="User Name"
					variant="outlined"
					sx={inputStyle}
				/>
				<TextField
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					id="outlined-basic"
					label="Password"
					variant="outlined"
					sx={inputStyle}
				/>

				<Button color="primary" onClick={() => handleLogin(username, password)}>
					{" "}
					<Typography variant="h5" color={"lightblue"} textAlign="center">
						GO
					</Typography>
				</Button>

				<Typography
					variant="body2"
					color={"lightblue"}
					textAlign="center"
					onClick={() => navigate("/sign_up")}
				>
					Don't have an account? Sign Up
				</Typography>
			</Box>
		</>
	);
};

export default Login;
