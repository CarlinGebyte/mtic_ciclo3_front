<template>
	<div class="with_roles">
		<div class="title">
			<h1>Panel de Asistente</h1>
		</div>
		<div class="action">
			<label for="action">¿Qué acción desea realizar?</label>
			<select v-model="action" name="action" id="action">
				<option value="post">Registrar usuario por rol</option>
				<option value="get">Consultar Pacientes</option>
			</select>
		</div>
		<div v-if="action === 'post'" class="post">
			<div class="type">
				<label for="type"
					>Por favor seleccione el tipo de usuario que desea registrar</label
				>
				<select v-model="type" name="type" id="type">
					<option value="patient">Paciente</option>
					<option value="doctor">Doctor(a)</option>
					<option value="nurse">Enfermer@</option>
					<option value="assistant">Asistente</option>
					<option value="kindred">Familiar</option>
				</select>
			</div>
			<form v-on:submit.prevent="registerUserType">
				<div>
					<label for="user" id="user_regostered"
						>{{ this.types[this.type] }} Registrado</label
					>
					<select
						v-model="register.user"
						name="user"
						id="user"
						v-bind="attributes"
					>
						<option value="" hidden>
							Seleccione {{ this.types[this.type] }} anteriormente registrado
						</option>
						<template v-for="user in users">
							<option v-if="user.type == this.type" :value="user.id">
								{{ user.name }}
							</option>
						</template>
					</select>
				</div>
				<button>Registrar {{ this.types[this.type] }}</button>
			</form>
		</div>
		<div v-if="action === 'get'" class="get">
			<div v-for="patient in patients" class="card">
				<template v-for="user in users">
					<div v-if="user.id === patient.user">
						<div>
							<h2>{{ user.name }}</h2>
						</div>
					</div>
				</template>
				<template v-for="user in users">
					<div v-for="doctor in doctors">
						<p v-if="doctor.user === user.id">doctor(a): {{ user.name }}</p>
					</div>
				</template>
				<template v-for="user in users">
					<div v-for="nurse in nurses">
						<p v-if="nurse.user === user.id">enfermer@: {{ user.name }}</p>
					</div>
				</template>
				<template v-for="user in users">
					<div v-for="kindred in kindreds">
						<p v-if="kindred.user === user.id">familiar: {{ user.name }}</p>
					</div>
				</template>
				<div>
					<button v-on:click="updatePatient(patient.id)">Editar</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "RegisterWithRoles",
	data() {
		return {
			type: "patient",
			action: "post",
			attributes: {
				required: true,
			},
			register: {
				user: "",
			},
			users: [],
			patients: [],
			kindreds: [],
			doctors: [],
			nurses: [],
			types: {
				doctor: "doctor(a)",
				nurse: "enfermer@",
				assistant: "asistente",
				patient: "paciente",
				kindred: "familiar",
			},
		};
	},
	methods: {
		getUsers() {
			// function to get all users
			axios
				.get("https://ciclo3-backend.onrender.com/api/user/", {
					headers: {},
				})
				.then((response) => {
					this.users = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getPatients() {
			// function to get all patients
			axios
				.get("https://ciclo3-backend.onrender.com/api/patient/", {
					headers: {},
				})
				.then((response) => {
					this.patients = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getDoctors() {
			// function to get all doctors
			axios
				.get("https://ciclo3-backend.onrender.com/api/doctor/", {
					headers: {},
				})
				.then((response) => {
					this.doctors = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getNurses() {
			// function to get all nurses
			axios
				.get("https://ciclo3-backend.onrender.com/api/nurse/", {
					headers: {},
				})
				.then((response) => {
					this.nurses = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		getKindreds() {
			// function to get all kindreds
			axios
				.get("https://ciclo3-backend.onrender.com/api/kindred/", {
					headers: {},
				})
				.then((response) => {
					this.kindreds = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		updatePatient(id) {
			this.$router.push({ name: "assistant_edit_user", params: { id: id } });
		},
		registerUserType() {
			// function to register the user type
			axios
				.post(
					`https://ciclo3-backend.onrender.com/api/${this.type}/`,
					this.register
				)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					this.register.user = "";
					alert(error.response.data.user[0]);
				});
		},
	},
	created() {
		this.getUsers();
		this.getPatients();
		this.getDoctors();
		this.getNurses();
		this.getKindreds();
	},
};
</script>

<style>
.with_roles {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.with_roles .title {
	font-size: 1.5rem;
}

.with_roles .action {
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.with_roles .action select {
	width: 80%;
	margin: 0.5rem 0 1rem 0;
	text-align: center;
	padding: 5px 0;
	outline: 0;
	border: 2px solid #000;
	border-radius: 20px;
	cursor: pointer;
	-moz-appearance: none;
	/* for Safari, Chrome, Opera */
	-webkit-appearance: none;
}

.with_roles .action select:hover {
	border: 2px solid #000;
}

.with_roles .post {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: 100%;
	padding: 1rem;
}
.with_roles .post .type {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: 100%;
}

.with_roles .post .type select {
	text-align: center;
	width: 40%;
}

.with_roles .post form {
	display: flex;
	flex-direction: column;
	text-align: center;
	width: 40%;
}
.with_roles .post form select {
	text-align: center;
	width: 100%;
	margin: 5px 0 10px 0;
}

.with_roles .get {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.with_roles .get .card {
	background-color: #f7d716;
	border-radius: 10%;
	padding: 1rem;
}
.with_roles .get .card h2 {
	margin: 0;
}
button {
	border-radius: 20px;
	padding: 0.5rem 1.5rem;
	color: #fff;
	border: 0;
	background-color: #293462;
	cursor: pointer;
}

#user_regostered {
	text-transform: capitalize;
}
</style>
