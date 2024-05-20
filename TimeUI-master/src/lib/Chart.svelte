<!-- src/lib/Chart.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import type { User } from '$lib/types';

    export let users: User[] = [];
    export let chartType: "line" | "bar" = "line";
    export let showAge: boolean = true;
    export let showHeight: boolean = true;
    export let showWeight: boolean = true;

    let ctx: HTMLCanvasElement | null = null;
    let chart: Chart | undefined;

    onMount(() => {
        if (ctx) {
            createChart();
        }
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });

    $: if (ctx && users.length) {
        createChart();
    }

    function createChart() {
        if (chart) {
            chart.destroy();
        }

        if (!ctx) return;

        chart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: users.map((user) => `${user.firstName} ${user.lastName}`),
                datasets: [
                    {
                        label: "User's age",
                        data: users.map(({ age }) => age),
                        borderWidth: 2,
                        hidden: !showAge,
                    },
                    {
                        label: "User's height",
                        data: users.map(({ height }) => height),
                        borderWidth: 2,
                        hidden: !showHeight,
                    },
                    {
                        label: "User's weight",
                        data: users.map(({ weight }) => weight),
                        borderWidth: 2,
                        hidden: !showWeight,
                        indexAxis: "x",
                    },
                ],
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
</script>

<div class="canvas-container">
    {#key [showAge, showHeight, showWeight, chartType]}
        <canvas bind:this={ctx} width="100" height="50"></canvas>
    {/key}
</div>

<style>
    .canvas-container {
        width: 700px;
    }
</style>
