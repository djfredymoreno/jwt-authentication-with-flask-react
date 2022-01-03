import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Login = () => {
	const { store, actions } = useContext(Context);
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const handleInputChange = event => {
		console.log(event.target.email);
		console.log(event.target.value);
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const submitForm = event => {
		event.preventDefault();
		actions.login(data.email, data.password).then(result => {
			actions.setToken(result.token);
		});
	};

	return (
		<form className="col-4 offset-4" onSubmit={submitForm}>
			<h1 className="text-center mb-3">Login</h1>
			<div className="mb-3">
				<input
					type="email"
					className="form-control mb-3"
					name="email"
					id="emailInput"
					placeholder="Correo electrónico"
					onChange={handleInputChange}
				/>
				<input
					type="password"
					className="form-control mb-3"
					name="password"
					id="passwordInput"
					placeholder="Password"
					onChange={handleInputChange}
				/>
				<button type="submit" className="btn btn-primary mb-3">
					Login
				</button>
				<Link to={"/"}>
					<span>Ir a Signin</span>
				</Link>
			</div>
		</form>
	);
};
export default Login;
