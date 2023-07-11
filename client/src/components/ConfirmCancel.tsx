import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import deleteWeight from "../utils/deleteWeight";
import {WeightType} from "../types";

type ConfirmCancelPropsType = {
	confirmCancelOpen: boolean;
	onClose: () => void;
	weightItem: WeightType | null;
};

const ConfirmCancel = (props: ConfirmCancelPropsType) => {
	const {confirmCancelOpen, onClose, weightItem} = props;

	const handleClose = () => {
		// Close the modal by calling the onClose prop

		onClose();
	};

	const handleSubmit = async () => {
		await deleteWeight(weightItem!.id, weightItem!.ownerId);
		onClose();
	};

	return (
		<div>
			<Dialog
				open={confirmCancelOpen}
				onClose={() => handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete this weight?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to remove this weight?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Yes!</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ConfirmCancel;
