<template>
	<div class="title">
		<h1>Panel de Paciente</h1>
	</div>
	<div class="action">
		<label for="action">Selecciona la acción a realizar</label>
		<select v-model="action" name="action" id="action">
			<option value="post">Registrar signos vitales</option>
			<option value="get">Obtener historia clínica</option>
		</select>
	</div>
	<div v-if="action === 'post'" class="get">
		<form v-on:submit.prevent="postSigns">
			<div>
				<label for="oximetry">Oximetria</label>
				<input
					v-model="post.oximetry"
					type="number"
					name="oximetry"
					id="oximetry"
					required
				/>
			</div>
			<div>
				<label for="brathing_rate">Frecuencia Respiratoria</label>
				<input
					v-model="post.brathing_rate"
					type="number"
					name="brathing_rate"
					id="brathing_rate"
					required
				/>
			</div>
			<div>
				<label for="hearth_rate">Ritmo Cardiaco</label>
				<input
					v-model="post.hearth_rate"
					type="number"
					name="hearth_rate"
					id="hearth_rate"
					required
				/>
			</div>
			<div>
				<label for="temperature">Temperatura</label>
				<input
					v-model="post.temperature"
					type="number"
					name="temperature"
					id="temperature"
					required
				/>
			</div>
			<div>
				<label for="blood_pressure">Presión Sanguinea</label>
				<input
					v-model="post.blood_pressure"
					type="number"
					name="blood_pressure"
					id="blood_pressure"
					required
				/>
			</div>
			<div>
				<label for="glycemia">Glicemia</label>
				<input
					v-model="post.glycemia"
					type="number"
					name="glycemia"
					id="glycemia"
					required
				/>
			</div>
			<button>Enviar</button>
		</form>
	</div>
	<div v-if="action === 'get'" class="">
		<div
			v-if="
				medicalReports.length === 0 ||
				medicalReports.filter((report) => report.patient == patientId)
					.length === 0
			"
			class="no_reports"
		>
			<p>Actualmente no tiene ningún registro en su historia clínica</p>
		</div>
		<div class="cards">
			<template v-for="(report, index) in medicalReports">
				<div v-if="report.patient === patientId" class="card">
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
	</div>
</template>
<script>
import axios from "axios";

export default {
	name: "PatientView",
	data() {
		return {
			patientId: null,
			action: "post",
			post: {
				oximetry: "",
				brathing_rate: "",
				blood_pressure: "",
				temperature: "",
				glycemia: "",
				hearth_rate: "",
				patient: this.patientId,
			},
			medicalReports: [],
		};
	},
	methods: {
		postSigns() {
			axios
				.post(
					"https://ciclo3-backend.onrender.com/api/medical_history/",
					this.post
				)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	created() {
		const patient = JSON.parse(localStorage.getItem("patient"));
		if (!patient) {
			alert("No tiene permisos");
			this.$router.push({ name: "home" });
		}
		this.patientId = patient?.id;
	},
};
</script>
<style scoped>
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
	text-align: center;
	justify-content: space-between;
}
.card {
	width: 15%;
	box-shadow: 9px -1px 38px -10px rgba(0, 0, 0, 0.75);
	padding: 1rem;
	margin: 1rem;
	border-radius: 30px;
}
select,
input {
	padding: 5px 0;
	margin: 2px 0;
	width: 80%;
	text-align: center;
}
label {
	display: block;
}
button {
	width: 80%;
	margin-top: 10px;
	padding: 10px 0;
}
.title {
	text-align: center;
	font-size: 1.5rem;
}
.no_reports {
	text-align: center;
	width: 80%;
	margin: 0 auto;
}
</style>
