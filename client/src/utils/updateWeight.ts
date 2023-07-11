import getAxios from "../api/getAxios";

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
	} catch (error) {
		console.log(error);
	}
};

export default updateWeight;
