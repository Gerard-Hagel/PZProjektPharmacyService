    <script>
    export default {
      name: "HomeView",
    };
    </script>
    
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col w-full">
    <nav class="bg-purple-200 p-4 flex w-full justify-between items-center">
      <div class="flex space-x-4">
        <button class="font-semibold">Leki</button>
        <button class="font-semibold">Faktury</button>
        <button class="font-semibold">Klienci</button>
      </div>
      <button class="font-semibold">Wyloguj się</button>
    </nav>
    
    <div><RouterView /></div>
    <div class="fixed left-0 bottom-0">
      <!-- do testowania -->
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
