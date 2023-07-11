import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {WeightType} from "../types";
import addWeight from "../utils/addWeight";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	color: "black",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

type AddModalProps = {
	action: string;
	onClose: () => void;
	open: boolean;
	ownerId?: string;
	weightItem?: WeightType | null;
};
export default function AddModal(props: AddModalProps) {
	const {action, open, onClose, ownerId} = props;
	const [newWeight, setNewWeight] = React.useState(0 as number);

	const [loading, setLoading] = React.useState(false as boolean);

	const handleClose = () => {
		// Close the modal by calling the onClose prop
		//Convert the newWeight to a number

		setNewWeight(0);
		onClose();
	};

	const handleSubmit = async () => {
		setLoading(true);
		await addWeight(Number(newWeight), ownerId || "");
		setNewWeight(0);
		onClose();
		setLoading(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				color="black"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{backdrop: Backdrop}}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography
							id="transition-modal-title"
							align="center"
							variant="h6"
							component="h2"
						>
							{action} Weight
						</Typography>
						<TextField
							onChange={(e) => setNewWeight(e.target.value)}
							value={newWeight}
							id="outlined-basic"
							label="Weight"
							type="number"
							variant="outlined"
						>
							{" "}
						</TextField>
						<Button onClick={handleSubmit}>Go!</Button>
						<Button onClick={handleClose}>Close</Button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
