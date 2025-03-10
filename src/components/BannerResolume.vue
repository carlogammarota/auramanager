<template>
    <div>
      <div>
        <video 
          id="video1"
          style="object-fit: cover; width: 100%;" 
          autoplay 
          muted 
          loop 
          playsinline>
        </video>
      </div>
  
      <div>
        <video 
          id="video2"
          style="width: 100%;" 
          autoplay 
          muted 
          playsinline
          controls>
        </video>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
//   import Hls from "hls"; // Importamos hls.js
  
  const stream1 = "https://live.auraproducciones.lat/stream/hls/otro.m3u8";
  const stream2 = "https://live.auraproducciones.lat/stream/hls/playlist.m3u8";
  
  const setupHls = (videoElement, streamUrl) => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play().catch(error => console.error("Error reproduciendo:", error));
      });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = streamUrl;
      videoElement.addEventListener("loadedmetadata", () => {
        videoElement.play().catch(error => console.error("Error reproduciendo:", error));
      });
    }
  };
  
  onMounted(() => {
    const video1 = document.getElementById("video1");
    const video2 = document.getElementById("video2");
  
    if (video1) setupHls(video1, stream1);
    if (video2) setupHls(video2, stream2);
  });
  </script>
  