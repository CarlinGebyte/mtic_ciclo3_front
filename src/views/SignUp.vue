<template>
  <div class="signup">
    <h1>This is a signup page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "SignUp",
  data() {
    return {
      // id = cc
			id: "",
			name: "",
			email: "",
      // only puts to create doctors, nurses and assistant, default is patient
      type: "",
			password: "",
    };
  },
	methods: {
    signUp() {
      // function to signup the user
    },
  },
	created() {},
};
</script>
