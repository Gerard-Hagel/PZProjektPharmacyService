<template>
  <div class="min-h-screen w-screen bg-white flex flex-col">
    
    <main class="flex-1 flex justify-center items-start pt-16">
      <div class="w-full max-w-md border border-gray-400 rounded-xl overflow-hidden shadow-md">
        
        <div class="bg-purple-300 text-white text-center text-xl font-bold py-4">
          Faktury
        </div>

        <div
          v-for="invoice in invoices"
          :key="invoice.id"
          class="flex items-center justify-between px-6 py-4 border-t border-gray-400">
          <div>
            <p class="font-semibold">Faktura {{ invoice.id }}</p>
            <p class="text-sm text-gray-700">Data zakupu: {{ invoice.date }}</p>
          </div>

          <button
            class="w-8 h-8 bg-sky-400 text-blue-400 rounded-lg flex items-center justify-center font-bold">
            i
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "InvoiceView",
  data() {
    return {
      invoices: [
        { id: 1, date: "10.10.2025" },
        { id: 2, date: "11.10.2025" },
        { id: 3, date: "12.10.2025" },
        { id: 4, date: "13.10.2025" },
        { id: 5, date: "14.10.2025" },
      ],
    };
  },
};
</script>