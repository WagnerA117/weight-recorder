import auth from "./auth/controller";
import validateAuth from "./middleware/validateAuth";
import weight from "./weights/controller";

import {Router} from "express";

export default (app: Router) => {
	app.use("/weights", validateAuth, weight);
	app.use("/auth", auth);
	app.use("*", (_, res) => res.status(404).json({message: "Not Found"}));
};
