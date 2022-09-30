<template>
	<div class="login">
		<h1>Iniciar Sesión</h1>
		<form v-on:submit.prevent="logIn">
			<div>
				<label for="id">Identificación</label>
				<input v-model="id" type="number" name="id" id="id" />
			</div>
			<div>
				<label for="password">Contraseña</label>
				<input
					v-model="password"
					type="password"
					name="password"
					id="password"
				/>
			</div>
			<button>Iniciar sesión</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";

// @ is an alias to /src
export default {
	name: "LogIn",
	data() {
		return {
			id: "",
			password: "",
		};
	},
	methods: {
		logIn() {
			// function to login the user
			if (this.id)
				axios
					.get(`https://ciclo3-backend.onrender.com/api/user/${this.id}/`, {
						headers: {},
					})
					.then((result) => {
						console.log(result);
						if (result.data.password == this.password) {
							axios
								.get(
									`https://ciclo3-backend.onrender.com/api/${result.data.type}/`,
									{
										headers: {},
									}
								)
								.then((res) => {
									let user2 = res.data.find(
										(user) => user.user == result.data.id
									);
									console.log(user2);
									this.$emit(
										"completedLogIn",
										JSON.stringify(result.data),
										result.data.type,
										JSON.stringify(user2)
									);
								});
						} else alert("La contraseña no coincide");
					});
		},
	},
	created() {
		this.$emit("verifyAuth");
	},
};
</script>
