import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import deleteWeight from "../utils/deleteWeight";
import {WeightType} from "../types";
import {Box} from "@mui/material";

type ConfirmCancelPropsType = {
	confirmCancelOpen: boolean;
	onClose: () => void;
	weightItem: WeightType;
	setWeightsData: React.Dispatch<React.SetStateAction<WeightType[]>>;
};

const buttonStyle = {
	padding: "2%",
	margin: "2%",
};

const ConfirmCancel = (props: ConfirmCancelPropsType) => {
	const {confirmCancelOpen, onClose, weightItem, setWeightsData} = props;

	const handleClose = () => {
		// Close the modal by calling the onClose prop

		onClose();
	};

	const handleSubmit = async () => {
		if (!weightItem) return console.log("No weight item");

		await deleteWeight(weightItem.id, weightItem.ownerId);
		setWeightsData((prevState: WeightType[]) =>
			prevState.filter((weight) => weight.id !== weightItem.id)
		);

		onClose();
	};

	return (
		<Dialog
			open={confirmCancelOpen}
			onClose={() => handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Delete this weight?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure you want to remove this weight?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Box display={"flex"} padding={"4%"}>
					<Button onClick={handleClose} autoFocus style={buttonStyle}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						style={buttonStyle}
						variant="outlined"
						color="error"
					>
						Yes!
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmCancel;
