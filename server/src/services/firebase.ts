import admin from "firebase-admin";
import config from "../../config";

if (!admin.apps.length) {
	console.log();
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: config.FIREBASE_PROJECT_ID,
			privateKey: config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
			clientEmail: config.FIREBASE_CLIENT_EMAIL,
		}),
	});
}

const firestore = admin.firestore();

export {firestore};
