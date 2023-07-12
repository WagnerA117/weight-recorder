import * as React from "react";
import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";

import {WeightType} from "../types";
import {Box, Button} from "@mui/material";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import ConfirmCancel from "./ConfirmCancel";
import AddIcon from "@mui/icons-material/Add";

type DisplayTablePropTypes = {
	weightsData: WeightType[];
	setWeightsData: React.Dispatch<React.SetStateAction<WeightType[]>>;
};

export default function DisplayTable(props: DisplayTablePropTypes) {
	const {weightsData} = props;

	weightsData.sort((a, b) => b.createdAt - a.createdAt);

	const [weightItem, setWeightItem] = useState<WeightType | null>(null);
	const [openAdd, setOpenAdd] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

	const buttonStyle = {
		padding: "2%",
		margin: "2%",
	};

	//Note: Create modular modal box for modular moding!

	return (
		<>
			<Button
				variant="outlined"
				color="success"
				onClick={() => setOpenAdd(true)}
				endIcon={<AddIcon />}
				style={buttonStyle}
			>
				Add Weight
			</Button>
			{weightsData.length === 0 ? (
				<Box>
					<h3>No weights</h3>
					<FitnessCenterTwoToneIcon sx={{fontSize: 100}} />;
				</Box>
			) : (
				<TableContainer component={Paper}>
					<Table sx={{minWidth: 650}} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Weight(Kg)</TableCell>
								<TableCell align="center">Date Added</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{weightsData.map((weight) => {
								return (
									<TableRow
										key={weight.id}
										sx={{"&:last-child td, &:last-child th": {border: 0}}}
									>
										<TableCell component="th" scope="row">
											{weight.weight}
										</TableCell>
										<TableCell align="right">
											{new Date(weight?.createdAt || 0).toString()}
										</TableCell>
										<TableCell align="right">
											<Button
												variant="outlined"
												color="info"
												onClick={() => {
													setWeightItem(weight);
													setOpenUpdate(true);
												}}
											>
												Update
											</Button>
											<Button
												color="error"
												onClick={() => {
													setWeightItem(weight);

													setConfirmCancelOpen(true);
												}}
											>
												{" "}
												Delete
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{weightItem && (
				<ConfirmCancel
					confirmCancelOpen={confirmCancelOpen}
					onClose={() => {
						setConfirmCancelOpen(false);
						setWeightItem(null);
					}}
					weightItem={weightItem}
					setWeightsData={props.setWeightsData}
				/>
			)}

			<AddModal
				setStateAction={props.setWeightsData}
				open={openAdd}
				action="Add"
				onClose={() => {
					setOpenAdd(false);
					setWeightItem(null);
				}}
				weightItem={weightItem}
				ownerId={weightsData?.[0]?.ownerId || ""}
			/>

			{/* This modal handles updating an item */}
			<UpdateModal
				open={openUpdate}
				setWeightsData={props.setWeightsData}
				action="Update"
				onClose={() => {
					setOpenUpdate(false);
					setWeightItem(null);
				}}
				weightItem={weightItem as WeightType}
			/>
		</>
	);
}
