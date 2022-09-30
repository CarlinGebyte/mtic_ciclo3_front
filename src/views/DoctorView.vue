<template>
	<div>
		<div class="title">
			<h1>Panel de Doctor</h1>
		</div>
		<div>
			<div class="patient">
				<label for="user">Seleccione el paciente</label>
				<select v-model="patientId" name="patient" id="patient">
					<template v-for="patient in patients">
						<template v-for="user in users">
							<option value="" hidden>Seleccione el paciente</option>
							<option
								v-if="user.type == 'patient' && patient.user == user.id"
								:value="patient.id"
							>
								{{ user.name }}
							</option>
						</template>
					</template>
				</select>
			</div>
			<div v-if="patientId" class="action">
				<label for="action_doctor"
					>Seleccione la acción que desea realizar</label
				>
				<select v-model="action" name="action_doctor" id="action_doctor">
					<option value="get">Obtener la historia clínica</option>
					<option value="post">Registrar Sugerencia y Diagnóstico</option>
				</select>
			</div>
		</div>
		<div v-if="action == 'get'" class="get cards">
			<template v-for="(report, index) in medicalReports">
				<div v-if="report.patient == patientId" class="card">
					<div class="card_title">Historia {{ index + 1 }}</div>
					<div class="card_body">
						<p>Sugerencia: {{ report.suggestion }}</p>
						<p>Diagnóstico: {{ report.diagnosis }}</p>
						<p>Oximetría: {{ report.oximetry }}</p>
						<p>Frecuencia Respiratoria: {{ report.brathing_rate }}</p>
						<p>Ritmo Cardiaco: {{ report.hearth_rate }}</p>
						<p>Temperatura: {{ report.temperature }}</p>
						<p>Presión sanguinea: {{ report.blood_pressure }}</p>
						<p>Glicemia: {{ report.glycemia }}</p>
					</div>
				</div>
			</template>
		</div>
		<div v-if="action == 'post'" class="post">
			<form v-on:submit.prevent="doctorPost">
				<div>
					<label for="suggestion">Ingrese la Sugerencia</label>
					<input
						type="text"
						v-model="post.suggestion"
						name="suggestion"
						id="suggestion"
					/>
				</div>
				<div>
					<label for="diagnosis">Ingrese el Diagnóstico</label>
					<input
						type="text"
						v-model="post.diagnosis"
						name="diagnosis"
						id="diagnosis"
					/>
				</div>
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
			action: "get",
			patientId: "",
			users: [],
			patients: [],
			medicalReports: [],
			doctor: null,
			post: {
				suggestion: "",
				diagnosis: "",
			},
		};
	},
	methods: {
		getUsers() {
			axios
				.get("https://ciclo3-backend.onrender.com/api/user/", {
					headers: {},
				})
				.then((result) => {
					this.users = result.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getMedical() {
			axios
				.get("https://ciclo3-backend.onrender.com/api/medical_history/", {
					headers: {},
				})
				.then((result) => {
					this.medicalReports = result.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getPatients() {
			axios
				.get("https://ciclo3-backend.onrender.com/api/patient/", {
					headers: {},
				})
				.then((result) => {
					this.patients = result.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		doctorPost() {
			console.log(this.post);
			if (this.doctor && this.patientId) {
				this.post.doctor = this.doctor;
				this.post.patient = this.patientId;
				console.log(this.post);
				axios
					.post(
						"https://ciclo3-backend.onrender.com/api/medical_history/",
						this.post
					)
					.then((result) => {
						console.log(result);
						this.$router.push({ name: "home" });
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
	},
	created() {
		this.getUsers();
		this.getPatients();
		this.getMedical();
		localStorage.setItem(
			"doctor",
			JSON.stringify({
				id: 1,
				user: 1234,
			})
		);
		let doctor = JSON.parse(localStorage.getItem("doctor"));
		console.log(doctor.id);
		if (doctor) this.doctor = doctor.id;
	},
};
</script>
<style scoped>
.title {
	text-align: center;
	font-size: 1.5rem;
}
.title h1 {
	margin: 0;
}
.patient,
.action,
.post,
.get {
	text-align: center;
	width: 80%;
	margin: 0 auto;
	padding: 1rem;
}
.cards {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
}
.card {
	width: 15%;
	box-shadow: 9px -1px 38px -10px rgba(0,0,0,0.75);
	padding: 1rem;
	margin: 1rem;
	border-radius: 30px;
}
select,
input {
	padding: 5px 0;
	margin: 2px 0;
}
label {
	display: block;
}
</style>
