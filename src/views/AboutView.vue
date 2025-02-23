<template>
  <div class="bg-white min-h-screen p-8">
    <!-- Header Section -->
    <section class="text-center mb-12">
      <h1 class="text-5xl font-bold text-primary mb-4">Tentang Shinobicamp</h1>
      <p class="text-secondary text-lg max-w-2xl mx-auto">
        Shinobicamp adalah platform yang didedikasikan untuk mengorganisir dan mengelola event
        karate. Misi kami adalah menyatukan pecinta karate dari seluruh dunia untuk belajar,
        berkompetisi, dan berkembang bersama.
      </p>
    </section>

    <!-- Visi & Misi Section -->
    <section class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Visi -->
        <div class="bg-quaternary p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-primary mb-4">Visi Kami</h2>
          <p class="text-secondary text-lg">
            Menciptakan komunitas global praktisi karate yang saling menginspirasi dan mendukung
            dalam perjalanan seni bela diri mereka.
          </p>
        </div>

        <!-- Misi -->
        <div class="bg-quaternary p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-primary mb-4">Misi Kami</h2>
          <p class="text-secondary text-lg">
            Menyediakan event karate, pelatihan, dan sumber daya berkualitas tinggi untuk praktisi
            dari semua tingkatan.
          </p>
        </div>
      </div>
    </section>

    <!-- Tim Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-primary text-center mb-8">Kenali Tim Kami</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Anggota Tim 1 -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Anggota Tim"
            class="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-primary mb-2">John Doe</h3>
          <p class="text-secondary">Pendiri & CEO</p>
        </div>

        <!-- Anggota Tim 2 -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Anggota Tim"
            class="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-primary mb-2">Jane Smith</h3>
          <p class="text-secondary">Manajer Event</p>
        </div>

        <!-- Anggota Tim 3 -->
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Anggota Tim"
            class="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-primary mb-2">Mike Johnson</h3>
          <p class="text-secondary">Pelatih Utama</p>
        </div>
      </div>
    </section>

    <!-- Testimoni Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-primary text-center mb-8">Apa Kata Mereka?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimoni 1 -->
        <div class="bg-quaternary p-6 rounded-lg shadow-md">
          <p class="text-secondary mb-4">
            "Shinobicamp telah mengubah cara saya mempelajari karate. Eventnya sangat terorganisir,
            dan komunitasnya sangat mendukung!"
          </p>
          <p class="text-primary font-semibold">- Budi Santoso</p>
        </div>

        <!-- Testimoni 2 -->
        <div class="bg-quaternary p-6 rounded-lg shadow-md">
          <p class="text-secondary mb-4">
            "Saya telah mengikuti beberapa pelatihan, dan setiap pelatihan memberikan pengalaman
            belajar yang luar biasa. Sangat direkomendasikan!"
          </p>
          <p class="text-primary font-semibold">- Ani Wijaya</p>
        </div>

        <!-- Testimoni 3 -->
        <div class="bg-quaternary p-6 rounded-lg shadow-md">
          <p class="text-secondary mb-4">
            "Tim di Shinobicamp sangat profesional dan penuh semangat. Mereka benar-benar peduli
            dengan perkembangan setiap peserta."
          </p>
          <p class="text-primary font-semibold">- Rudi Hermawan</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-primary to-secondary py-12 text-center text-white">
      <h2 class="text-3xl font-bold mb-4">Bergabunglah Bersama Kami!</h2>
      <p class="text-lg mb-8">
        Jadilah bagian dari komunitas Shinobicamp dan tingkatkan kemampuan karate Anda ke level
        berikutnya.
      </p>
      <router-link
        to="/signup"
        class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
      >
        Daftar Sekarang
      </router-link>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
/* Animasi sederhana untuk card */
.bg-quaternary:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>
