import axios from "axios";

const getAxios = () => {
	console.log("TOKEN", localStorage.getItem("token"));
	const instance = axios.create({
		baseURL: "http://localhost:9000/",
		timeout: 1000,
		headers: {Authorization: `Bearer ${localStorage.getItem("token") || ""}`},
	});

	return instance;
};

export default getAxios;
