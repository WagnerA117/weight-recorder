import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {WeightType} from "../types";
import updateWeight from "../utils/updateWeight";

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

//todo, update the props to that values are coming from one source of truth!
//

type UpdateModalProps = {
	action: string;
	onClose: () => void;
	open: boolean;

	weightItem?: WeightType | undefined;
};
export default function UpdateModal(props: UpdateModalProps) {
	const {action, open, onClose, weightItem} = props;
	const [updatedWeight, setUpdatedWeight] = React.useState("");

	const handleClose = () => {
		// Close the modal by calling the onClose prop
		//Convert the newWeight to a number

		setUpdatedWeight("");
		onClose();
	};

	const handleSubmit = async () => {
		await updateWeight(
			weightItem?.id as string,
			Number(updatedWeight),
			weightItem?.ownerId as string
		);

		setUpdatedWeight("");
		onClose();
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
							onChange={(e) => setUpdatedWeight(e.target.value)}
							value={updatedWeight}
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
