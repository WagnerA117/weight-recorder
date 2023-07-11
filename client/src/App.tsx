import React from "react";
import Router from "./Routes";
import "./App.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<>
			<Router />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
}

export default App;
