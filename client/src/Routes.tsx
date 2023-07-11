import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<Login />} />
				<Route path="/sign_up" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
