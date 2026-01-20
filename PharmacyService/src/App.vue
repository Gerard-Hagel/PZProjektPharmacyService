<template>
  <div class="min-h-screen bg-gray-100 flex flex-col w-full">
    <nav class="bg-purple-200 p-4 flex w-full justify-between items-center">
      <div class="flex space-x-4">
        <RouterLink
          to="/medicines"
          class="font-semibold hover:underline"
        >Leki</RouterLink>
        <RouterLink
          to="/invoice"
          class="font-semibold hover:underline"
        >Faktury</RouterLink>
        <RouterLink
          to="/clients"
          class="font-semibold hover:underline"
        >Klienci</RouterLink>
        <RouterLink
          to="/employees"
          class="font-semibold hover:underline"
        >Pracownicy</RouterLink>
      </div>

      <button
        class="font-semibold hover:underline"
        @click="logout"
      >
        Wyloguj się
      </button>
    </nav>

    <!-- Główna zawartość -->
    <div class="flex-1">
      <RouterView />
    </div>

    <!-- do testowania -->
    <div class="fixed left-0 bottom-0">
      <RouterLink to="/">Home&nbsp;</RouterLink>
      <RouterLink to="/login">Login&nbsp;</RouterLink>
      <RouterLink to="/welcome">Welcome&nbsp;</RouterLink>
      <RouterLink to="/invoice">Invoice&nbsp;</RouterLink>
      <RouterLink to="/clients">Clients&nbsp;</RouterLink>
      <RouterLink to="/employees">Employees&nbsp;</RouterLink>
      <RouterLink to="/medicines">Medicines&nbsp;</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>