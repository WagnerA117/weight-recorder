import app from "./app";
import config from "./config";

const PORT = process.env.PORT || config.port;

const server = app.listen(PORT, () => {
	console.log("server is running on port", (server.address() as any).port);
});
