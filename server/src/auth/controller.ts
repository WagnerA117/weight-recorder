import express from "express";

import * as authService from "../services/auth";

const router = express.Router();

//NOTE: Route to sign up a new user, check if they don't exist already, and return a JWT token if all good
router.post("/sign_up", async (req, res) => {
	const {username, password} = req.body;

	console.log(req.body);

	if (!username || !password) {
		return res
			.status(400)
			.json({message: "Username and password are required"});
	}

	try {
		console.log("this was reached in the auth controller");
		const token = await authService.signUp(username, password);
		console.log("token in auth controller");
		return res.status(200).json({token});
	} catch (err: any) {
		if (err.message === "User already exists") {
			return res.status(400).json({message: err.message});
		}
		return res.status(500).json({message: "Something is wrong"});
	}
});

router.post("/login", async (req, res) => {
	const {username, password} = req.body;

	//Guard clauses first!
	if (!username || !password) {
		return res
			.status(400)
			.json({message: "Username and password are required"});
	}

	try {
		const token = await authService.login(username, password);
		console.log(token, "token in auth controller");
		return res.status(200).json({token});
	} catch (err) {
		return res.status(401).json({message: "Invalid credentials"});
	}
});

export default router;
