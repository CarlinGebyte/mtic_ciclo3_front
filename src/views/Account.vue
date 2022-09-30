<template>
	<div class="user">
		<h1>This is a user account page</h1>
		<div v-if="user">
			{{ user.name }}
			<button v-on:click="changeAction">Editar</button>
		</div>
		<div v-if="action == 'edit'">
			<form v-on:submit.prevent="updateUser">
				<input v-model="update.name" type="text" required />
				<button>Enviar</button>
			</form>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
	name: "AccountPage",
	data() {
		return {
			user: null,
			action: null,
			update: null,
		};
	},
	methods: {
		changeAction() {
			this.action = "edit";
		},
		updateUser() {
			axios
				.put(
					`https://ciclo3-backend.onrender.com/api/user/${this.user.id}/`,
					this.user
				)
				.then((res) => {
					console.log(res);
          this.action = null
				})
				.catch((err) => {
					console.log("Ocurrió un error, intentelo nuevamente");
				});
		},
	},
	created() {
		this.user = JSON.parse(localStorage.getItem("user"));
		this.update = JSON.parse(localStorage.getItem("user"));
	},
};
</script>
