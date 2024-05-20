<script>
    import { onMount } from 'svelte';
  
    let pinned = false;
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;
  
    let position = {
      x: 100,
      y: 100
    };
  
    function handleMouseDown(event) {
      if (!pinned) {
        dragging = true;
        offsetX = event.clientX - position.x;
        offsetY = event.clientY - position.y;
      }
    }
  
    function handleMouseMove(event) {
      if (dragging) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 100;
  
        position.x = Math.max(0, Math.min(newX, maxX));
        position.y = Math.max(0, Math.min(newY, maxY));
      }
    }
  
    function handleMouseUp() {
      dragging = false;
    }
  
    function pin() {
      pinned = !pinned;
    }
  
    onMount(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    });
  </script>
  
  <style>
    .draggable {
      position: fixed;
      width: 100px;
      height: 100px;
      background-color: #007bff;
    }
    
    .pin-button {
      position: absolute;
      bottom: 5px;
      right: 5px;
      background-color: white;
      border: 1px solid #ccc;
      padding: 5px;
      cursor: pointer;
    }
  </style>
  
  <div
    class="draggable"
    style="left: {position.x}px; top: {position.y}px;"
    on:mousedown={handleMouseDown}
  >
    Draggable Box
    <div class="pin-button" on:click={pin}>{pinned ? 'Unpin' : 'Pin'}</div>
  </div>
  