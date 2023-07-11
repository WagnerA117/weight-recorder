import express from "express";

import * as weightsService from "./service";

const router = express.Router();

//user comes from the validate auth middleware, we add it to the req body when the middleware runs successfully

//create a new weight entry
router.post("/save_weight", async (req, res) => {
	const {id: ownerId} = req.user;

	const {weight} = req.body;

	console.log(req.body);

	if (!weight) {
		res.status(400).send("Weight is required");
		return;
	}

	try {
		const newWeight = await weightsService.createWeight(weight, ownerId);
		return res.status(201).json(newWeight);
	} catch (err: any) {
		return res.status(500).json({message: err.message});
	}
});

//Get a single weight entry
router.get("/:id", async (req, res) => {
	const {id: ownerId} = req.user;
	const {id: weightId} = req.params;

	if (!weightId) {
		res.status(400).send("Weight ID is required");
		return;
	}
	try {
		const weight = await weightsService.getWeight(weightId, ownerId);
		return res.status(200).json(weight);
	} catch (err: any) {
		return res.status(500).json({message: err.message});
	}
});

//get all weight entries
router.get("/", async (req, res) => {
	const {id: ownerId} = req.user;

	try {
		const weights = await weightsService.getWeights(ownerId);
		return res.status(200).json(weights);
	} catch (err: any) {
		return res.status(500).json({message: err.message});
	}
});

//update a weight entry
router.patch("/:id", async (req, res) => {
	const {id: weightId} = req.params;
	const weight = req.body;
	const {id: ownerId} = req.user;

	try {
		const updatedWeight = await weightsService.updateWeight(
			weightId,
			ownerId,
			weight
		);
		return res.status(200).json(updatedWeight);
	} catch (err: any) {
		return res.status(500).json({message: err.message});
	}
});

//delete a weight entry

router.delete("/:id", async (req, res) => {
	const {id: weightId} = req.params;
	const {id: ownerId} = req.user;

	try {
		await weightsService.deleteWeight(weightId, ownerId);
		return res.status(200).json({message: "Weight removed successfully"});
	} catch (err: any) {
		return res.status(500).json({message: err.message});
	}
});

export default router;
