<template>
    <div class="loading-overlay h-screen">
      <!-- <span class="loading loading-spinner loading-lg"></span> -->
      <!-- <img
        src="@/assets/AuthLogo.svg"
        style="margin-top: -200px"
        class="w-36 mx-12 mt-2 logo ease-in duration-300 animate-ping"
        alt="tailus logo"
      /> -->
      <img
        src="../assets/logo.png"
        style="margin-top: -287px"
        class="mx-12 mt-2 logo ease-in duration-300 animate-ping"
        alt="tailus logo"
      />
    </div>
  </template>
  
  <script>
    export default {};
  </script>
  
  <style scoped>
    .loading-overlay {
      position: fixed;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  
    .loading-spinner {
      z-index: 99999;
      /* Estilos para tu spinner, puedes personalizarlos según tus necesidades */
    }
  </style>
  