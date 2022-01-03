import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Signup = () => {
	const { store, actions } = useContext(Context);
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const [message, setMessage] = useState({
		show: false,
		text: ""
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
		actions.createUser(data).then(result => {
			console.log(result);
			if (result.created) {
				setMessage({ show: true, text: "El usuario fue creado con éxito." });
			}
		});
	};
	return (
		<form className="col-4 offset-4" onSubmit={submitForm}>
			{message.show ? <h3>{message.text}</h3> : ""}
			<h1 className="text-center mb-3">Signin</h1>
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
					Signin
				</button>
				<Link to={"/login"}>
					<span>Ir a Login</span>
				</Link>
			</div>
		</form>
	);
};

export default Signup;
