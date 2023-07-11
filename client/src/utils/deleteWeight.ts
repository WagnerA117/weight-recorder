import getAxios from "../api/getAxios";

import {toast} from "react-toastify";
const deleteWeight = async (
	weightId: string,
	ownerId: string
): Promise<void> => {
	try {
		const {
			data: {token},
		}: {data: {token: string}} = await getAxios().delete(
			`/weights/${weightId}`
		);

		toast("Weight Removed", {
			position: "top-right",
			autoClose: 5000,
			type: "error",
		});
	} catch (error) {
		console.log(error);
	}
};

export default deleteWeight;
