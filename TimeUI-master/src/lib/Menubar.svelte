<!-- MenuBar.svelte -->
<script>
  import { onMount } from 'svelte';
  let isDragging = false;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  function handleMouseDown(event) {
    isDragging = true;
    initialX = event.clientX - xOffset;
    initialY = event.clientY - yOffset;
  }

  function handleMouseMove(event) {
    if (isDragging) {
      xOffset = event.clientX - initialX;
      yOffset = event.clientY - initialY;
      const menuBar = document.querySelector('.menu-bar');
      menuBar.style.left = `${xOffset}px`;
      menuBar.style.top = `${yOffset}px`;
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  onMount(() => {
    const menuBar = document.querySelector('.menu-bar');
    const rect = menuBar.getBoundingClientRect();
    xOffset = rect.left;
    yOffset = rect.top;
  });
</script>

<style>
  .menu-bar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
  }

  .draggable {
    cursor: move;
  }
</style>

<div
  class="menu-bar draggable"
  style="transform: translate3d(0px, 0px, 0px);"
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mouseleave={handleMouseUp}
  on:mousemove={handleMouseMove}
>
  <!-- Menu items go here -->
  <p>Menu Item 1</p>
  <p>Menu Item 2</p>
</div>
