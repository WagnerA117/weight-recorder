import axios from "axios";

const getAxios = () => {
	const instance = axios.create({
		baseURL: "http://localhost:9000/",
		timeout: 5000,
		headers: {Authorization: `Bearer ${localStorage.getItem("token") || ""}`},
	});

	return instance;
};

export default getAxios;
