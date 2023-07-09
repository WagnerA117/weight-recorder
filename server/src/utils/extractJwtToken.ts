export const extractJwtToken = (
	authorizationHeader: string | null
): string | null => {
	const bearerRegex = /^Bearer (.+)$/i;
	const match = authorizationHeader?.match(bearerRegex);

	if (match) {
		const jwtToken = match[1];
		return jwtToken;
	} else {
		return null;
	}
};

export default extractJwtToken;
