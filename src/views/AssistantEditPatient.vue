<template>
	<div class="put_patient">
		<h1>Asigne al Paciente</h1>
		<form v-on:submit.prevent="updatePatient">
			<div>
				<label for="doctor">doctor(a)</label>
				<select
					name="doctor"
					id="doctor"
					v-on:change="handleDoctor"
					v-model="form.doctor"
				>
					<option value="">Seleccione un doctor(a)</option>
					<template v-for="user in doctors">
						<option :value="user.id">
							{{ user.name }}
						</option>
					</template>
				</select>
			</div>
			<div>
				<label for="nurse">enfermer@</label>
				<select
					name="nurse"
					id="nurse"
					v-on:change="handleNurse"
					v-model="form.nurse"
				>
					<option value="">Seleccione un enfermer@</option>
					<template v-for="user in nurses">
						<option :value="user.id">
							{{ user.name }}
						</option>
					</template>
				</select>
			</div>
			<div>
				<label for="kindred">familiar</label>
				<select
					name="kindred"
					id="kindred"
					v-on:change="handleKindred"
					v-model="form.kindred"
				>
					<option value="">Seleccione un familiar</option>
					<template v-for="user in kindreds">
						<option :value="user.id">
							{{ user.name }}
						</option>
					</template>
				</select>
			</div>
			<div>
				<span style="margin-bottom: 10px"
					>Puede dejar campos sin seleccionar</span
				>
			</div>
			<button>Actualizar</button>
		</form>
	</div>
</template>
<script>
import axios from "axios";
export default {
	name: "RegisterWithRoles",
	data() {
		return {
			patientId: "",
			attributes: {
				required: true,
			},
			form: {
				doctor: "",
				nurse: "",
				kindred: "",
			},
			update: {},
			doctors: [],
			kindreds: [],
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
		handleDoctor() {
			if (this.form.doctor)
				axios
					.get(`https://ciclo3-backend.onrender.com/api/doctor/`, {
						headers: {},
					})
					.then((response) => {
						const res = response.data.find(
							(user) => user.user == this.form.doctor
						);
						console.log("doctor ", res);

						this.update.doctor = res.id;
					})
					.catch((error) => {
						console.log(error);
					});
		},
		handleNurse() {
			if (this.form.nurse)
				axios
					.get(`https://ciclo3-backend.onrender.com/api/nurse/`, {
						headers: {},
					})
					.then((response) => {
						const res = response.data.find(
							(user) => user.user == this.form.nurse
						);
						console.log("nurse: ", res);
						this.update.nurse = res.id;
					})
					.catch((error) => {
						console.log(error);
					});
		},
		handleKindred() {
			if (this.form.kindred)
				axios
					.get(`https://ciclo3-backend.onrender.com/api/kindred/`, {
						headers: {},
					})
					.then((response) => {
						const res = response.data.find(
							(user) => user.user == this.form.kindred
						);
						console.log("kindred: ", res);

						this.update.kindred = res.id;
					})
					.catch((error) => {
						console.log(error);
					});
		},
		updatePatient() {
			console.log(this.update);

			axios
				.put(
					`https://ciclo3-backend.onrender.com/api/patient/${this.patientId}/`,
					this.update,
					{
						headers: {},
					}
				)
				.then((response) => {
					console.log(response);
					this.$router.push("/assistant");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	created() {
		this.patientId = this.$route.params.id;
		// axios.get(
		//   `https://ciclo3-backend.onrender.com/api/patient/${this.patientId}/`,
		//   {
		//     headers: {},
		//   }
		// )
		// .then((response) => {
		//   this.form.doctor = response.data.doctor;
		//   this.form.nurse = response.data.nurse;
		//   this.form.kindred = response.data.kindred;
		// })
		axios
			.get("https://ciclo3-backend.onrender.com/api/user/", {
				headers: {},
			})
			.then((response) => {
				this.doctors = response.data.filter((user) => user.type === "doctor");
				this.kindreds = response.data.filter((user) => user.type === "kindred");
				this.nurses = response.data.filter((user) => user.type === "nurse");
			})
			.catch((error) => {
				console.log(error);
			});
	},
};
</script>
<style scoped>
.put_patient {
	display: flex;
	flex-direction: column;
	text-align: center;
	width: 100%;
}
.put_patient h1 {
	font-size: 3rem;
}
.put_patient > form > div {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	text-align: center;
}
.put_patient > form > div > label {
	margin: 0.2rem;
}
.put_patient > form > div select {
	text-align: center;
	padding: 5px 0;
	margin-bottom: 1rem;
	width: 80%;
}
</style>
