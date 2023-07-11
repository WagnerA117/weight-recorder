import getAxios from "../api/getAxios";
import {toast} from "react-toastify";

const updateWeight = async (
	weightId: string,
	weight: number,
	ownerId: string
): Promise<void> => {
	try {
		const {
			data: {token},
		}: {data: {token: string}} = await getAxios().patch(
			`/weights/${weightId}`,
			{
				weightId,
				weight,
				ownerId,
			}
		);

		toast("Sucess! Weight Updated ", {
			position: "top-center",
			autoClose: 5000,
			type: "success",
		});
	} catch (error) {
		console.log(error);
	}
};

export default updateWeight;
