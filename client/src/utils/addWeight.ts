import getAxios from "../api/getAxios";

const addWeight = async (weight: number, ownerId: string): Promise<void> => {
	try {
		const {
			data: {token},
		}: {data: {token: string}} = await getAxios().post("/weights/save_weight", {
			weight,
			ownerId,
		});
	} catch (error) {
		console.log(error);
	}
};

export default addWeight;
