import getAxios from "../api/getAxios";
import {WeightType} from "../types";
import {toast} from "react-toastify";

const addWeight = async (
	weight: number,
	ownerId: string
): Promise<WeightType | void> => {
	try {
		const {data}: {data: WeightType} = await getAxios().post(
			"/weights/save_weight",
			{
				weight,
				ownerId,
			}
		);

		if (weight > 9000) {
			toast("🦄 It's over OVER 9000!!!!", {
				position: "top-right",
				autoClose: 5000,
				type: "error",
			});
		}

		toast("🦄Sucess! New Entry Added!", {
			position: "top-center",
			autoClose: 5000,
			type: "success",
		});
		return data;
	} catch (error) {
		toast("🦄 ERROR", {
			position: "top-right",
			autoClose: 5000,
			type: "error",
		});
		console.log(error);
	}
};

export default addWeight;
