import {firestore} from "../services/firebase";
import {WeightType} from "../types";

const weightsCollection = firestore.collection("weights");

//get weight, delete weight, update weight, add weight here in services

const createWeight = async (weight: number, ownerId: string) => {
	const ref = await weightsCollection.add({
		weight,
		ownerId,
		createdAt: Date.now(),
	});

	const doc = await ref.get();

	return {
		...doc.data(),
		id: doc.id,
	};
};

const getWeight = async (weightId: string, ownerId: string) => {
	const {docs} = await weightsCollection.where("ownerId", "==", ownerId).get();

	const weight = docs.find((doc) => doc.id === weightId);

	if (!weight) {
		throw new Error("Data not found");
	}

	return {
		...weight.data(),
		id: weight.id,
	};
};

const getWeights = async (ownerId: string) => {
	const {docs} = await weightsCollection.where("ownerId", "==", ownerId).get();

	const weights = docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	console.log({weights});
	return weights;
};

const updateWeight = async (
	weightId: string,
	ownerId: string,
	weight: Partial<WeightType>
) => {
	const doc = await weightsCollection.doc(weightId).get();

	const data = doc.data();

	if (data === undefined || data.ownerId !== ownerId) {
		throw new Error("Weight not found");
	}

	await doc.ref.set({...weight}, {merge: true});
};

const deleteWeight = async (weightId: string, ownerId: string) => {
	const doc = await weightsCollection.doc(weightId).get();
	const data = doc.data();

	if (data === undefined || data.ownerId !== ownerId) {
		throw new Error("Weight not found");
	}

	await doc.ref.delete();
};

export {getWeight, createWeight, getWeights, updateWeight, deleteWeight};
