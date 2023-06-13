<template>
  <div class="flex justify-start">
    <span class="dot dot1"></span>
    <span class="dot dot2"></span>
    <span class="dot dot3"></span>
  </div>
</template>

<style scoped>
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #818181;
  margin-right: 2px;
  animation: typing 1.1s infinite;
}

.dot1 {
  animation-delay: 0s;
}

.dot2 {
  opacity: 0.3;
  animation-delay: 0.2s;
}

.dot3 {
  opacity: 0.3;
  animation-delay: 0.4s;
}

@keyframes typing {
  0% {
    opacity: 0.3;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
