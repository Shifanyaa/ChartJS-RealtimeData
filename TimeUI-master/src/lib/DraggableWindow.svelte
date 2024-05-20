<!-- DraggableBox.svelte -->
<!-- Minus iso bablas browser (benakne) -->
<script>
    import '$src/app.css';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    export let pinned = false;

    const dispatch = createEventDispatcher();

    let minimized = false;

    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    let position = {
        x: window.innerWidth - 200,
        y: 0
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
            // Set padding
            const maxX = window.innerWidth - 202;
            const maxY = window.innerHeight - 40;

            position.x = Math.max(0, Math.min(newX, maxX));
            position.y = Math.max(0, Math.min(newY, maxY));
        }
    }

    function handleMouseUp() {
        dragging = false;
    }

    function toggleMinimized() {
        minimized = !minimized;
    }

    onMount(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', handleResize);
        };
    });

    function handleResize() {
        // Adjust position when window is resized
        position.x = Math.min(position.x, window.innerWidth - 200);
    }
</script>

<style>
    .draggable {
        position: fixed;
        width: 200px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: #007bff;
        color: white;
        border-radius: 4px 4px 0 0;
        cursor: pointer;
    }

    .content {
        padding: 10px;
        transition: height 0.3s ease;
        overflow: hidden;
    }

    .pin-button {
        background-color: transparent;
        border: none;
        color: white;
        cursor: pointer;
    }
</style>

<div
    class="draggable"
    style="left: {position.x}px; top: {position.y}px;"
    on:mousedown={handleMouseDown}
>
    <div class="top-bar">
        <div>
            <button class="pin-button" on:click={toggleMinimized}>
                {minimized ? 'Maximize' : 'Minimize'}
            </button>
        </div>
        <div>
            <button class="pin-button" on:click={() => { pinned = !pinned; dispatch('pinned', { pinned }); }}>
                {pinned ? 'Unpin' : 'Pin'}
            </button>
        </div>
    </div>
    <div class="content" style="height: {minimized ? '0px' : 'auto'}">
        <slot></slot>
    </div>
</div>
