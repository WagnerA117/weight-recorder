import * as React from "react";
import {useEffect, useState} from "react";

import getAxios from "../api/getAxios";

import {useNavigate} from "react-router-dom";
import DisplayTable from "../components/DisplayTable";
import {Box, Button} from "@mui/material";
import ScaleIcon from "@mui/icons-material/Scale";
import {WeightType} from "../types";

interface WeightDataResponse {
	data: WeightType[];
}

const buttonStyle = {
	padding: "2%",
	margin: "2%",
};

const validateJwtToken = async () => {
	try {
		const token = localStorage.getItem("token");
		if (token) {
			const res: {data: {validToken: boolean}} = await getAxios().get(
				"/auth/validate-token"
			);
			return res.data.validToken;
		}
		return false;
	} catch (error) {
		return false;
	}
};

const HomePage = () => {
	const [weightsData, setWeightsData] = useState<WeightType[]>([]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	//NOTE: Add a confirm dialog to this action!
	const handleSignOut = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	const handleFetchWieghts = async () => {
		setLoading(true);
		const res: WeightDataResponse = await getAxios().get("/weights");

		setWeightsData(res.data);
	};

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("token");
		if (!isLoggedIn) {
			navigate("/");
		} else {
			validateJwtToken()
				.then(() => {
					handleFetchWieghts()
						.then(() => {
							setLoading(false);
						})
						.catch((err) => {
							console.log(err);
							setLoading(false);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
			<DisplayTable setWeightsData={setWeightsData} weightsData={weightsData} />
			<Button
				variant="outlined"
				color="warning"
				onClick={() => {
					handleSignOut();
				}}
				style={buttonStyle}
			>
				Sign Out
			</Button>
		</Box>
	);
};

export default HomePage;
