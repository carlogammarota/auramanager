<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-hidden">
      <!-- Hero Section with Parallax -->
      <section class="relative h-screen flex items-center justify-center">
        <div
          class="absolute inset-0 bg-cover bg-center parallax"
          :style="{ backgroundImage: `url('https://picsum.photos/1920/1080')` }"
        ></div>
        <div class="relative z-10 text-center">
          <h1 class="text-6xl md:text-8xl font-bold animate-pulse text-purple-400 drop-shadow-lg">
            DJ ElectroVibe
          </h1>
          <p class="mt-4 text-xl md:text-2xl text-gray-300">
            Unleashing the Ultimate EDM Experience
          </p>
          <button
            class="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:scale-105 transition-transform duration-300"
          >
            <i class="fas fa-play mr-2"></i> Listen Now
          </button>
        </div>
      </section>
  
      <!-- About Section -->
      <section class="py-20 px-6 bg-gray-800">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 class="text-4xl font-bold text-pink-500">About Me</h2>
            <p class="mt-4 text-gray-300">
              I’m DJ ElectroVibe, a master of electronic beats and immersive soundscapes. With over a decade of experience, I bring the party to life with pulsating rhythms and electrifying vibes.
            </p>
          </div>
          <div class="relative">
            <img
              src="https://picsum.photos/600/400"
              alt="DJ ElectroVibe"
              class="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
  
      <!-- Events Section -->
      <section class="py-20 px-6 bg-gray-900">
        <h2 class="text-4xl font-bold text-center text-purple-500 mb-10">Upcoming Events</h2>
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="event in events"
            :key="event.id"
            class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-bounce-slow"
          >
            <img :src="event.image" alt="Event" class="w-full h-48 object-cover rounded-t-lg" />
            <h3 class="mt-4 text-xl font-bold text-pink-400">{{ event.name }}</h3>
            <p class="text-gray-400">{{ event.date }}</p>
            <button class="mt-4 px-4 py-2 bg-purple-600 rounded-full hover:bg-purple-700">
              <i class="fas fa-ticket-alt mr-2"></i> Get Tickets
            </button>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="py-10 bg-gray-800 text-center">
        <div class="flex justify-center space-x-6">
          <a href="#" class="text-2xl text-purple-400 hover:text-purple-600">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="text-2xl text-purple-400 hover:text-purple-600">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-2xl text-purple-400 hover:text-purple-600">
            <i class="fab fa-soundcloud"></i>
          </a>
        </div>
        <p class="mt-4 text-gray-400">&copy; 2025 DJ ElectroVibe. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: [
          { id: 1, name: "Neon Nights", date: "March 15, 2025", image: "https://picsum.photos/400/300?random=1" },
          { id: 2, name: "Electric Pulse", date: "April 20, 2025", image: "https://picsum.photos/400/300?random=2" },
          { id: 3, name: "Rave Odyssey", date: "May 10, 2025", image: "https://picsum.photos/400/300?random=3" },
        ],
      };
    },
    mounted() {
      // Parallax Effect
      window.addEventListener("scroll", () => {
        const parallax = document.querySelector(".parallax");
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      });
    },
  };
  </script>
  
  <style scoped>
  /* Custom Animations */
  .animate-bounce-slow {
    animation: bounce 3s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  /* Parallax Styling */
  .parallax {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  </style>