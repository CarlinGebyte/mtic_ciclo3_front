<template>
	<div class="user">
		<h1>This is a user account page</h1>
		<div v-if="user">
			<p>ID:</p>
			{{ user.id }}
			<button v-on:click="changeActionId">Editar</button>
		</div>
		<div v-if="action == 'edit1'">
			<form v-on:submit.prevent="updateId">
				<input v-model="update.id" type="text" required />
				<button>Enviar</button>
			</form>
		</div>
		<div v-if="user">
			<p>Nombre:</p>
			{{ user.name }}
			<button v-on:click="changeActionName">Editar</button>
		</div>
		<div v-if="action == 'edit2'">
			<form v-on:submit.prevent="updateName">
				<input v-model="update.name" type="text" required />
				<button>Enviar</button>
			</form>
		</div>
		<div v-if="user">
			<p>Email:</p>
			{{ user.email }}
			<button v-on:click="changeActionEmail">Editar</button>
		</div>
		<div v-if="action == 'edit3'">
			<form v-on:submit.prevent="updateEmail">
				<input v-model="update.email" type="text" required />
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
			user: "",
			action: "",
			update: null,
			oldId: "",
		};
	},
	methods: {
		changeActionId() {
			this.action = "edit1";
		},
		changeActionName() {
			this.action = "edit2";
		},
		changeActionEmail() {
			this.action = "edit3";
		},
		updateId() {
			this.oldId = this.user.id;
			this.user.id = this.update.id;
			axios
				.put(
					`https://ciclo3-backend.onrender.com/api/user/${this.oldId}/`,
					this.update
				)
				.then((res) => {
					console.log(res);
					this.action = null;
					this.updateLocalStorage();
				})
				.catch((err) => {
					console.log("Ocurrió un error, intentelo nuevamente");
				});
		},
		updateName() {
			this.user.name = this.update.name;
			axios
				.put(
					`https://ciclo3-backend.onrender.com/api/user/${this.user.id}/`,
					this.update
				)
				.then((res) => {
					console.log(res);
					this.action = null;
					this.updateLocalStorage();
				})
				.catch((err) => {
					console.log("Ocurrió un error, intentelo nuevamente");
				});
		},
		updateEmail() {
			this.user.email = this.update.email;
			axios
				.put(
					`https://ciclo3-backend.onrender.com/api/user/${this.user.id}/`,
					this.update
				)
				.then((res) => {
					console.log(res);
					this.action = null;
					this.updateLocalStorage();
				})
				.catch((err) => {
					console.log("Ocurrió un error, intentelo nuevamente");
				});
		},
		updateLocalStorage() {
			localStorage.setItem("user", JSON.stringify(this.update));
		},
	},
	created() {
		this.user = JSON.parse(localStorage.getItem("user"));
		this.update = JSON.parse(localStorage.getItem("user"));
	},
};
</script>
