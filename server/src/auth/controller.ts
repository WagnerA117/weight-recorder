import express from "express";

import * as authService from "../services/auth";

const router = express.Router();

//NOTE: Route to sign up a new user, check if they don't exist already, and return a JWT token if all good
router.post("/sign-up", async (req, res) => {
	const {userName, password} = req.body;

	if (!userName || !password) {
		return res
			.status(400)
			.json({message: "Username and password are required"});
	}

	try {
		const token = await authService.signUp(userName, password);
		return res.status(201).json({token});
	} catch (err: any) {
		if (err.message === "User already exists") {
			return res.status(400).json({message: err.message});
		}
		return res.status(500).json({message: "Something went wrong"});
	}
});

router.post("/login", async (req, res) => {
	const {userName, password} = req.body;

	//Guard clauses first!
	if (!userName || !password) {
		return res
			.status(400)
			.json({message: "Username and password are required"});
	}

	try {
		const token = await authService.login(userName, password);
		return res.status(200).json({token});
	} catch (err) {
		return res.status(401).json({message: "Invalid credentials"});
	}
});

export default router;
