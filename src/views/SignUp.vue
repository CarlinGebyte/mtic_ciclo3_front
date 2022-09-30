<template>
	<div class="signup">
		<h1>Registro</h1>
		<form v-on:submit.prevent="signUp">
			<div>
				<label for="id">Identificación</label>
				<input v-model="user.id" type="number" name="id" id="id" required/>
			</div>
			<div>
				<label for="name">Nombre</label>
				<input v-model="user.name" type="text" name="name" id="name" required/>
			</div>
			<div>
				<label for="email">Correo</label>
				<input v-model="user.email" type="email" name="email" id="email" required/>
			</div>
			<div>
				<label for="type">Tipo de usuario</label>
				<select v-model="user.type" name="type" id="type" >
					<option value="patient">Paciente</option>
					<option value="assistant">Asistente</option>
					<option value="doctor">Doctor(a)</option>
					<option value="nurse">Enfermer@</option>
					<option value="kindred">Familiar</option>
				</select>
			</div>
			<div>
				<label for="password">Contraseña</label>
				<input
					v-model="user.password"
					type="password"
					name="password"
					id="password"
          required
				/>
			</div>
      <button>Registrar</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
	name: "SignUp",
	data() {
		return {
			user: {
				id: "",
				name: "",
				email: "",
				type: "patient",
				password: "",
			},
		};
	},
	methods: {
		signUp() {
			// function to signup the user
			axios
				.post("https://ciclo3-backend.onrender.com/api/user/", this.user)
				.then((result) => {
					console.log(result);
          axios
						.post(
							`https://ciclo3-backend.onrender.com/api/${result.data.type}/`,
							{ user: result.data.id }
						)
						.then((response) => {
							console.log("testing ", response);
						})
						.catch((err) => {
							console.log(err);
						});
					this.$emit("completedSignUp");
				})
        .catch(err => {
          alert('No se ha logrado registar, inténtelo nuevamente')
        })
		},
	},
	created() {},
};
</script>
