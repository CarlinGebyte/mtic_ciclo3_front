<template>
	<div id="app" class="app">
		<div class="header">
			<div class="logo">
				<h1>HousePital</h1>
			</div>
			<nav>
				<ul>
					<li v-if="is_auth">
						<a v-on:click="loadHome">Inicio</a>
					</li>
					<li v-if="is_auth">
						<a v-on:click="loadAccount">Cuenta</a>
					</li>
					<li v-if="is_auth">
						<a v-on:click="logOut">Cerrar Sesión</a>
					</li>
					<li v-if="!is_auth">
						<a v-on:click="loadLogIn">Iniciar Sesión</a>
					</li>
					<li v-if="!is_auth">
						<a v-on:click="loadSignUp">Crear Cuenta</a>
					</li>
				</ul>
			</nav>
		</div>
		<div class="main-component">
			<router-view
				v-on:completedLogIn="completedLogIn"
				v-on:completedSignUp="completedSignUp"
				v-on:logOut="logOut"
			>
			</router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			is_auth: false,
		};
	},
	methods: {
		verifyAuth() {
			this.is_auth = localStorage.getItem("isAuth") || false;

			if (this.is_auth == false) this.$router.push({ name: "login" });
			else this.$router.push({ name: "home" });
		},
		loadHome() {
			this.$router.push({ name: "home" });
		},
    loadAccount() {
      this.$router.push({ name: "account" });
    },
		loadLogIn() { // Just for testing purposes, remove the localStorage.setItem("isAuth", true) line and this.verifyAuth() line
			this.$router.push({ name: "login" });
      localStorage.setItem("isAuth", true)
      this.verifyAuth();
		},
		loadSignUp() {
			this.$router.push({ name: "signup" });
		},
		logOut() {
			localStorage.clear();
			this.verifyAuth();
		},
		completedLogIn: function (data) {
			localStorage.setItem("isAuth", true);
			localStorage.setItem("user", data);
			alert("Autenticación Exitosa");
			this.verifyAuth();
		},
		completedSignUp: function (data) {
			alert("Registro Exitoso");
			this.completedLogIn(data);
		},
	},
	created() {
		this.verifyAuth();
	},
};
</script>

<style>
body,
html {
	margin: 0;
}

.header {
	margin: 0;
	width: 100%;
	background-color: #283747;
	color: #e5e7e9;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 1rem 0;
}

.header .logo {
	width: 20%;
	min-width: min-content;
}

.header nav {
	width: 70%;
	min-width: min-content;
	display: flex;
	justify-content: flex-end;
}

.header nav ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;
}

.header ul li {
	margin: 0 10px;
}

.header ul li a {
	cursor: pointer;
}

@media (max-width: 768px) {
	.header {
		flex-direction: column;
	}
	.header .logo {
		width: 100%;
		text-align: center;
	}
	.header nav {
		width: 100%;
		justify-content: center;
	}
}
</style>
