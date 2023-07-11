import * as React from "react";
import {useEffect, useState} from "react";

import getAxios from "../api/getAxios";

import {useNavigate} from "react-router-dom";
import DisplayTable from "../components/DisplayTable";
import {Box, Button} from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";

const HomePage = () => {
	const [weightsData, setWeightsData] = useState([]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const handleSignOut = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("token");

		if (isLoggedIn) {
			navigate("/home");
			getAxios()
				.get("/weights")
				.then((res: {data: []}) => {
					console.log(res);
					const {data} = res;

					setWeightsData(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		const timeoutId = setTimeout(() => {
			setLoading(false);
		}, 750); // Half a second delay (500 milliseconds)

		return () => clearTimeout(timeoutId);
	}, []);

	if (loading) {
		return (
			<Box>
				<h3>Please Weight</h3>
				<ScaleIcon sx={{fontSize: 100}} />;
			</Box>
		);
	}

	return (
		<Box>
			<h1>Welcome to Weights</h1>
			<DisplayTable weightsData={weightsData} />
			<Button
				onClick={() => {
					handleSignOut();
				}}
			>
				Sign Out
			</Button>
		</Box>
	);
};

export default HomePage;
