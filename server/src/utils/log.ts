export const log = (logMessage: string) => {
	const debugMode = +process.env.DEBUG!;

	if (debugMode === 1) {
		console.log(logMessage);
	} else {
		return null;
	}
};

export default log;
