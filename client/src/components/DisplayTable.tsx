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

type DisplayTablePropTypes = {
	weightsData?: WeightType[];
};

export default function DisplayTable(props: DisplayTablePropTypes) {
	const {weightsData} = props;

	const [weightItem, setWeightItem] = useState<WeightType | null>(null);
	const [openAdd, setOpenAdd] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

	if (weightsData?.length === 0 || !weightsData) {
		return (
			<Box>
				<h3>No weights</h3>
				<FitnessCenterTwoToneIcon sx={{fontSize: 100}} />;
			</Box>
		);
	}

	return (
		<>
			<Button onClick={() => setOpenAdd(true)}>Add Weight</Button>
			<FitnessCenterTwoToneIcon sx={{fontSize: 30}} />

			<ConfirmCancel
				confirmCancelOpen={confirmCancelOpen}
				onClose={() => {
					setConfirmCancelOpen(false);
					setWeightItem(null);
				}}
				weightItem={weightItem}
			/>

			<AddModal
				open={openAdd}
				action="Add"
				onClose={() => {
					setOpenAdd(false);
					setWeightItem(null);
				}}
				weightItem={weightItem}
				ownerId={weightsData[0].ownerId}
			/>

			{/* This modal handles updating an item */}
			<UpdateModal
				open={openUpdate}
				action="Update"
				onClose={() => {
					setOpenUpdate(false);
					setWeightItem(null);
				}}
				weightItem={weightItem as WeightType}
			/>

			<TableContainer component={Paper}>
				<Table sx={{minWidth: 650}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Weight</TableCell>
							<TableCell align="center">Date Added</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{weightsData.map((weight) => (
							<TableRow
								key={weight.id}
								sx={{"&:last-child td, &:last-child th": {border: 0}}}
							>
								<TableCell component="th" scope="row">
									{weight.weight}
								</TableCell>
								<TableCell align="right">
									{Date(weight?.createdAt).toString()}
								</TableCell>
								<TableCell align="right">
									<Button
										onClick={() => {
											setWeightItem(weight);
											setOpenUpdate(true);
										}}
									>
										Update
									</Button>
									<Button
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
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
