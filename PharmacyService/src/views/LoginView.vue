<template>
  <div class="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
    <form
      @submit.prevent="login"
      class="bg-white p-8 rounded shadow-md w-96"
    >
      <h1 class="text-2xl mb-4 text-purple-300 font-bold">Logowanie</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-2 p-2 border rounded"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Hasło"
        class="w-full mb-4 p-2 border rounded"
      />

      <p v-if="error" class="text-red-500 text-sm mb-2">
        {{ error }}
      </p>

      <button
        type="submit"
        class="w-full bg-purple-500 text-purple-400 py-2 rounded hover:bg-purple-600"
      >
        Zaloguj się
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      this.error = "";

      if (!this.email || !this.password) {
        this.error = "Uzupełnij wszystkie pola";
        return;
      }

      if (this.email === "admin@test" && this.password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        this.$router.push("/welcome");
      } else {
        this.error = "Nieprawidłowy email lub hasło";
      }
    },
  },
};
</script>