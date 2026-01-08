<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">

        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Klient
        </div>

        <div
          v-for="client in clients"
          :key="client.id"
          class="flex justify-between items-center px-6 py-4 border-t border-gray-400">
          <div class="leading-tight">
            <p class="font-semibold">
              {{ client.firstName }} {{ client.lastName }}
            </p>
            <p class="text-sm text-gray-700">
              Numer ID: {{ client.id }}
            </p>
          </div>

          <button
            class="w-9 h-9 bg-sky-400 text-blue-400 rounded-lg flex items-center justify-center font-bold text-lg">
            i
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "ClientsView",
  data() {
    return {
      clients: [
        { id: 101, firstName: "Jan", lastName: "Kowalski" },
        { id: 102, firstName: "Anna", lastName: "Nowak" },
        { id: 103, firstName: "Piotr", lastName: "Wiśniewski" },
        { id: 104, firstName: "Maria", lastName: "Zielińska" },
        { id: 105, firstName: "Tomasz", lastName: "Lewandowski" },
      ],
    };
  },
};
</script>