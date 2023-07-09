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

	const checkToken = extractJwtToken(req.headers.authorization as string);

	log(checkToken as string);

	const token =
		req.headers.authorization && req.headers.authorization.split(" ")[1];

	if (!token) {
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
