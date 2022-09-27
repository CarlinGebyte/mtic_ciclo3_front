<template>
	<div class="login">
		<h1>This is a login page</h1>
	</div>
</template>

<script>
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
		},
	},
	created() {},
};
</script>
