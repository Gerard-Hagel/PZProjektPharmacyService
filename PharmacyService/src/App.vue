<template>
  <div class="min-h-screen bg-gray-100 flex flex-col w-full">
    <nav class="bg-purple-200 p-4 flex w-full justify-between items-center">
  <div class="flex space-x-4">
    <RouterLink to="/medicines" class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg">Leki</RouterLink>
    <RouterLink to="/invoice" class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg">Faktury</RouterLink>
    <RouterLink to="/clients" class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg">Klienci</RouterLink>
    <RouterLink to="/employees"class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg">Pracownicy</RouterLink>
  </div>

  <button class="px-4 py-2 bg-white text-black border hover:bg-gray-100 transition rounded-lg flex items-center justify-center font-bold text-lg" @click="logout">Wyloguj się</button>
</nav>

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
      <RouterLink to="/denied">DeniedAccess&nbsp;</RouterLink>
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