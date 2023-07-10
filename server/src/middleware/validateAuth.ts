import {NextFunction, Request, Response} from "express";

import {extractJwtToken} from "../utils/extractJwtToken";
import {log} from "../utils/log";

import * as authService from "../services/auth";

const validateAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//remove the bearer from the token

	console.log("this ran in the validate auth middleware");

	const token =
		req.headers.authorization && req.headers.authorization.split(" ")[1];

	if (!token) {
		console.log("no token");
		return res.status(401).json({message: "Unauthorized"});
	}

	try {
		const user = await authService.validate(token);
		req.user = user;
		next();
	} catch (err) {
		return res.status(401).json({message: "Unauthorized"});
	}
};

export default validateAuth;
