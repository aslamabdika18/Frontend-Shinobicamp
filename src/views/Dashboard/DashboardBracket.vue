<template>
  <div class="p-4 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Dashboard Admin Pertandingan Karate</h1>

    <!-- Form Filter -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4">Filter Atlet</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Pilih Event -->
        <select
          v-model="selectedEvent"
          class="p-2 border rounded w-full"
        >
          <option disabled value="">Pilih Event</option>
          <option v-for="event in events" :key="event.id" :value="event.id">
            {{ event.name }}
          </option>
        </select>

        <!-- Pilih Kategori -->
        <select
          v-model="selectedCategory"
          class="p-2 border rounded w-full"
        >
          <option disabled value="">Pilih Kategori</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <!-- Pilih Kelas -->
        <select
          v-model="selectedClass"
          class="p-2 border rounded w-full"
        >
          <option disabled value="">Pilih Kelas</option>
          <option v-for="cls in classes" :key="cls" :value="cls">
            {{ cls }}
          </option>
        </select>
      </div>
      <button
        @click="filterAthletes"
        class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Filter Atlet
      </button>
    </div>

    <!-- Tabel Data Atlet -->
    <div class="mb-8" v-if="filteredAthletes.length > 0">
      <h2 class="text-xl font-semibold mb-2">Daftar Atlet</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border border-gray-300">No</th>
            <th class="p-2 border border-gray-300">Nama Atlet</th>
            <th class="p-2 border border-gray-300">Event</th>
            <th class="p-2 border border-gray-300">Kategori</th>
            <th class="p-2 border border-gray-300">Kelas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(athlete, index) in filteredAthletes" :key="index" class="hover:bg-gray-50">
            <td class="p-2 border border-gray-300 text-center">{{ index + 1 }}</td>
            <td class="p-2 border border-gray-300">{{ athlete.name }}</td>
            <td class="p-2 border border-gray-300">{{ athlete.event }}</td>
            <td class="p-2 border border-gray-300">{{ athlete.category }}</td>
            <td class="p-2 border border-gray-300">{{ athlete.class }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tombol-tombol Aksi -->
    <div v-if="filteredAthletes.length > 0" class="mb-8">
      <div class="flex flex-wrap gap-2">
        <!-- Tombol Preview Shuffle -->
        <button
          v-if="!isPreviewMode && !isBracketGenerated"
          @click="previewShuffle"
          class="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Preview Bracket
        </button>

        <!-- Tombol dalam Preview Mode -->
        <template v-if="isPreviewMode">
          <button
            @click="confirmShuffle"
            class="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Konfirmasi Bracket
          </button>
          <button
            @click="reshufflePairs"
            class="p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Acak Ulang
          </button>
          <button
            @click="cancelPreview"
            class="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Batal
          </button>
        </template>

        <!-- Tombol Setelah Bracket Di-generate -->
        <template v-if="isBracketGenerated && !isPreviewMode">
          <button
            @click="previewShuffle"
            class="p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Acak Ulang Bracket
          </button>
          <button
            @click="exportToPDF"
            class="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Export ke PDF
          </button>
          <button
            @click="advanceWinners"
            v-if="hasUncompletedMatches"
            class="p-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Simulasi Pertandingan
          </button>
          <button
            @click="resetBracket"
            class="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Bracket
          </button>
        </template>
      </div>
    </div>

    <!-- Preview Mode - Tampilan Bracket yang akan di-generate -->
    <div v-if="isPreviewMode" class="mt-8">
      <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <div class="flex items-center text-yellow-700 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <span class="font-semibold">Mode Preview</span>
        </div>
        <p>Ini adalah tampilan preview bracket. Anda dapat mengacak ulang, konfirmasi susunan, atau membatalkan.</p>
      </div>

      <h2 class="text-xl font-semibold mb-4">Preview Bracket Pertandingan</h2>

      <!-- Visual Bracket Preview -->
      <div class="overflow-x-auto">
        <div class="flex space-x-8 p-4">
          <div
            v-for="(round, roundIndex) in previewBracket"
            :key="'preview-round-'+roundIndex"
            class="flex-none"
            :style="{ width: '300px' }"
          >
            <h3 class="text-center font-semibold mb-4">
              {{ getRoundName(roundIndex, previewBracket.length) }}
            </h3>
            <div class="space-y-8">
              <div
                v-for="(match, matchIndex) in round"
                :key="'preview-match-'+roundIndex+'-'+matchIndex"
                class="match-container relative"
                :style="getMatchPaddingStyle(roundIndex, matchIndex, previewBracket.length)"
              >
                <div class="border border-gray-200 rounded-lg bg-white shadow p-3">
                  <div class="flex flex-col space-y-2">
                    <!-- Atlet 1 -->
                    <div class="flex items-center p-2 border-b">
                      <div
                        v-if="match.athlete1"
                        class="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2"
                      >
                        {{ match.athlete1.name.charAt(0) }}
                      </div>
                      <div v-else class="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <div class="font-medium">
                        {{ match.athlete1 ? match.athlete1.name : 'TBD' }}
                      </div>
                      <!-- Swap Button -->
                      <button
                        v-if="match.athlete1 && match.athlete2 && roundIndex === 0"
                        @click="swapAthletes(roundIndex, matchIndex)"
                        class="ml-auto p-1 rounded-full hover:bg-gray-100"
                        title="Tukar Posisi"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    </div>

                    <!-- Atlet 2 -->
                    <div class="flex items-center p-2">
                      <div
                        v-if="match.athlete2"
                        class="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full mr-2"
                      >
                        {{ match.athlete2.name.charAt(0) }}
                      </div>
                      <div v-else class="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <div class="font-medium">
                        {{ match.athlete2 ? match.athlete2.name : 'TBD' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bracket yang sudah di-generate -->
    <div v-if="isBracketGenerated && !isPreviewMode" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Bracket Pertandingan</h2>

      <div v-if="tournamentWinner" class="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
        <div class="text-center">
          <h3 class="text-xl font-bold text-yellow-800">🏆 JUARA TURNAMEN 🏆</h3>
          <div class="mt-2 text-2xl font-bold">{{ tournamentWinner.name }}</div>
          <div class="mt-1 text-gray-600">{{ tournamentWinner.event }} - {{ tournamentWinner.category }} - {{ tournamentWinner.class }}</div>
        </div>
      </div>

      <!-- Visual Bracket Display -->
      <div class="overflow-x-auto">
        <div class="flex space-x-8 p-4">
          <div
            v-for="(round, roundIndex) in generatedBracket"
            :key="'gen-round-'+roundIndex"
            class="flex-none"
            :style="{ width: '300px' }"
          >
            <h3 class="text-center font-semibold mb-4">
              {{ getRoundName(roundIndex, generatedBracket.length) }}
            </h3>
            <div class="space-y-8">
              <div
                v-for="(match, matchIndex) in round"
                :key="'gen-match-'+roundIndex+'-'+matchIndex"
                class="match-container relative"
                :style="getMatchPaddingStyle(roundIndex, matchIndex, generatedBracket.length)"
              >
                <div class="border border-gray-200 rounded-lg bg-white shadow p-3">
                  <div class="flex flex-col space-y-2">
                    <!-- Atlet 1 -->
                    <div
                      class="flex items-center p-2 border-b"
                      :class="{'bg-green-100 rounded': match.winner === match.athlete1}"
                    >
                      <div
                        v-if="match.athlete1"
                        class="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2"
                      >
                        {{ match.athlete1.name.charAt(0) }}
                      </div>
                      <div v-else class="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <div class="font-medium">
                        {{ match.athlete1 ? match.athlete1.name : 'TBD' }}
                      </div>
                      <!-- Winner Mark -->
                      <div v-if="match.winner === match.athlete1" class="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <!-- Winner Selection (if match not completed) -->
                      <button
                        v-if="match.athlete1 && match.athlete2 && !match.winner"
                        @click="selectWinner(roundIndex, matchIndex, match.athlete1)"
                        class="ml-auto p-1 rounded hover:bg-green-100 text-xs text-green-600"
                        title="Pilih Pemenang"
                      >
                        Menang
                      </button>
                    </div>

                    <!-- Atlet 2 -->
                    <div
                      class="flex items-center p-2"
                      :class="{'bg-green-100 rounded': match.winner === match.athlete2}"
                    >
                      <div
                        v-if="match.athlete2"
                        class="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full mr-2"
                      >
                        {{ match.athlete2 ? match.athlete2.name.charAt(0) : '' }}
                      </div>
                      <div v-else class="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <div class="font-medium">
                        {{ match.athlete2 ? match.athlete2.name : 'TBD' }}
                      </div>
                      <!-- Winner Mark -->
                      <div v-if="match.winner === match.athlete2" class="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <!-- Winner Selection (if match not completed) -->
                      <button
                        v-if="match.athlete1 && match.athlete2 && !match.winner"
                        @click="selectWinner(roundIndex, matchIndex, match.athlete2)"
                        class="ml-auto p-1 rounded hover:bg-green-100 text-xs text-green-600"
                        title="Pilih Pemenang"
                      >
                        Menang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Data dummy atlet
const athletes = ref([
  { name: 'Atlet 1', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 2', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 3', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 4', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 5', event: 'Event A', category: 'Veteran', class: 'Junior' },
  { name: 'Atlet 6', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 7', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 8', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 9', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 10', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 11', event: 'Event A', category: 'Veteran', class: 'Junior' },
  { name: 'Atlet 12', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 13', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 14', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 15', event: 'Event A', category: 'Open', class: 'Senior' },
  { name: 'Atlet 16', event: 'Event A', category: 'Open', class: 'Senior' },
]);

// Data untuk filter
const selectedEvent = ref('');
const selectedCategory = ref('');
const selectedClass = ref('');

// Dummy data untuk event, kategori, dan kelas
const events = [
  { id: 1, name: 'Event A' },
  { id: 2, name: 'Event B' },
];
const categories = ['Open', 'Veteran'];
const classes = ['Senior', 'Junior'];

// Mode preview
const isPreviewMode = ref(false);
const previewBracket = ref([]);

// Bracket yang sudah di-generate
const isBracketGenerated = ref(false);
const generatedBracket = ref([]);
const tournamentWinner = ref(null);

// Filter atlet berdasarkan event, kategori, dan kelas
const filteredAthletes = computed(() => {
  return athletes.value.filter(athlete => {
    const eventMatch = !selectedEvent.value || athlete.event === events.find(e => e.id === selectedEvent.value)?.name;
    const categoryMatch = !selectedCategory.value || athlete.category === selectedCategory.value;
    const classMatch = !selectedClass.value || athlete.class === selectedClass.value;
    return eventMatch && categoryMatch && classMatch;
  });
});

// Check if there are uncompleted matches
const hasUncompletedMatches = computed(() => {
  if (!generatedBracket.value.length) return false;

  for (let roundIndex = 0; roundIndex < generatedBracket.value.length; roundIndex++) {
    const round = generatedBracket.value[roundIndex];
    for (let matchIndex = 0; matchIndex < round.length; matchIndex++) {
      const match = round[matchIndex];
      // If there's a valid match with both athletes but no winner yet
      if (match.athlete1 && match.athlete2 && !match.winner) {
        return true;
      }
    }
  }
  return false;
});

// Fungsi untuk mengacak atlet menggunakan algoritma Fisher-Yates
const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// Pad array to next power of 2 with nulls
const padToPowerOfTwo = (array) => {
  const count = array.length;
  const nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(count)));
  const result = [...array];

  // Add null elements to make the length a power of 2
  for (let i = count; i < nextPowerOfTwo; i++) {
    result.push(null);
  }

  return result;
};

// Reset preview ketika filter berubah
watch(filteredAthletes, () => {
  resetBracket();
});

// Fungsi untuk memfilter atlet (dipanggil saat tombol filter diklik)
const filterAthletes = () => {
  console.log('Atlet difilter berdasarkan kriteria yang dipilih.');
};

// Fungsi untuk membuat bracket single elimination
const createSingleEliminationBracket = (athletesList) => {
  // If no athletes, return an empty bracket
  if (!athletesList.length) return [];

  // Pad the list to the next power of 2
  const paddedList = padToPowerOfTwo(athletesList);
  const totalRounds = Math.log2(paddedList.length);
  const bracket = [];

  // Create first round with initial matches
  const firstRound = [];
  for (let i = 0; i < paddedList.length; i += 2) {
    firstRound.push({
      athlete1: paddedList[i],
      athlete2: paddedList[i + 1],
      winner: null
    });
  }
  bracket.push(firstRound);

  // Create subsequent empty rounds
  for (let round = 1; round < totalRounds; round++) {
    const matchesInRound = Math.pow(2, totalRounds - round - 1);
    const roundMatches = [];

    for (let i = 0; i < matchesInRound; i++) {
      roundMatches.push({
        athlete1: null,
        athlete2: null,
        winner: null
      });
    }

    bracket.push(roundMatches);
  }

  return bracket;
};

// Get appropriate spacing for matches in the bracket visualization
const getMatchPaddingStyle = (roundIndex, matchIndex) => {
  if (roundIndex === 0) return {};

  const gapMultiplier = Math.pow(2, roundIndex) - 1;
  const topPadding = gapMultiplier * 136; // Adjust this value based on your match height

  return {
    marginTop: matchIndex === 0 ? `${topPadding}px` : '136px' // Again, adjust as needed
  };
};

// Get the round name based on the index and total rounds
const getRoundName = (roundIndex, totalRounds) => {
  if (roundIndex === totalRounds - 1) {
    return 'Final';
  } else if (roundIndex === totalRounds - 2) {
    return 'Semi Final';
  } else if (roundIndex === totalRounds - 3) {
    return 'Perempat Final';
  } else {
    return `Ronde ${roundIndex + 1}`;
  }
};

// Preview shuffle - menampilkan bracket sebelum dikonfirmasi
const previewShuffle = () => {
  if (filteredAthletes.value.length < 2) {
    alert('Minimal diperlukan 2 atlet untuk membuat bracket pertandingan.');
    return;
  }

  const shuffledList = shuffleArray(filteredAthletes.value);
  previewBracket.value = createSingleEliminationBracket(shuffledList);
  isPreviewMode.value = true;
};

// Acak ulang dalam mode preview
const reshufflePairs = () => {
  const shuffledList = shuffleArray(filteredAthletes.value);
  previewBracket.value = createSingleEliminationBracket(shuffledList);
};

// Konfirmasi shuffle dan generate bracket
const confirmShuffle = () => {
  generatedBracket.value = JSON.parse(JSON.stringify(previewBracket.value));
  isPreviewMode.value = false;
  isBracketGenerated.value = true;
  tournamentWinner.value = null;
};

// Batalkan mode preview
const cancelPreview = () => {
  isPreviewMode.value = false;
  previewBracket.value = [];
};

// Reset bracket
const resetBracket = () => {
  isPreviewMode.value = false;
  isBracketGenerated.value = false;
  previewBracket.value = [];
  generatedBracket.value = [];
  tournamentWinner.value = null;
};

// Tukar posisi atlet dalam mode preview
const swapAthletes = (roundIndex, matchIndex) => {
  const match = previewBracket.value[roundIndex][matchIndex];
  if (match.athlete1 && match.athlete2) {
    [match.athlete1, match.athlete2] = [match.athlete2, match.athlete1];
  }
};

// Select a winner for a match
const selectWinner = (roundIndex, matchIndex, winner) => {
  // Get the current match
  const match = generatedBracket.value[roundIndex][matchIndex];

  // Set the winner
  match.winner = winner;

  // If this isn't the final round, advance the winner to the next round
  if (roundIndex < generatedBracket.value.length - 1) {
    const nextRoundMatchIndex = Math.floor(matchIndex / 2);
    const nextRoundMatch = generatedBracket.value[roundIndex + 1][nextRoundMatchIndex];

    // Determine if this winner should be athlete1 or athlete2 in the next match
    if (matchIndex % 2 === 0) {
      nextRoundMatch.athlete1 = winner;
    } else {
      nextRoundMatch.athlete2 = winner;
    }
  } else {
    // This is the final match, set the tournament winner
    tournamentWinner.value = winner;
  }
};

// Simulate random winners for uncompleted matches
const advanceWinners = () => {
  let hasAdvanced = false;

  // Process one round at a time to ensure proper advancement
  for (let roundIndex = 0; roundIndex < generatedBracket.value.length; roundIndex++) {
    const round = generatedBracket.value[roundIndex];

    for (let matchIndex = 0; matchIndex < round.length; matchIndex++) {
      const match = round[matchIndex];

      // Only process matches that have both athletes but no winner yet
      if (match.athlete1 && match.athlete2 && !match.winner) {
        // Randomly select winner
        const winner = Math.random() < 0.5 ? match.athlete1 : match.athlete2;
        selectWinner(roundIndex, matchIndex, winner);
        hasAdvanced = true;
        break; // Only advance one match at a time
      }
    }

    if (hasAdvanced) break; // Stop after processing one match
  }

  if (!hasAdvanced) {
    alert('Semua pertandingan sudah selesai!');
  }
};

// Export to PDF (placeholder)
const exportToPDF = () => {
  if (generatedBracket.value.length === 0) {
    alert('Tidak ada bracket yang tersedia untuk diekspor.');
    return;
  }
  alert('Export to PDF');
};
</script>
