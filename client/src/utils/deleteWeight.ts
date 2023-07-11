import getAxios from "../api/getAxios";

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
	} catch (error) {
		console.log(error);
	}
};

export default deleteWeight;
