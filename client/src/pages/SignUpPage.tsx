import {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";

const inputStyle = {
	backgroundColor: "lightblue",
	margin: "2em",

	width: "30%",
};

const SignUp = () => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	return (
		<>
			<Box
				margin="auto"
				sx={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "lightblue",
					p: 1,
					m: 1,
					borderRadius: 1,
					width: "80%",
					alignItems: "center",
				}}
			>
				<Typography variant="h3" textAlign="center" color={"black"}>
					Sign Up
				</Typography>
				<TextField
					id="outlined-basic"
					label="User name"
					variant="outlined"
					value={username}
					onChange={(e) => setUserName(e.target.value)}
					sx={inputStyle}
				/>
				<TextField
					id="outlined-basic"
					label="password"
					variant="outlined"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					sx={inputStyle}
				/>

				<Button>Sign Up</Button>

				<Typography
					variant="h5"
					color={"black"}
					textAlign="center"
					onClick={() => navigate("/login")}
				>
					Already have an account? Login
				</Typography>
			</Box>
		</>
	);
};

export default SignUp;
