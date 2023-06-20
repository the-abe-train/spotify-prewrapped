<script>
import chartjs from 'chart.js';
import { onMount } from 'svelte';

export let genreData

let chartValues = []
let chartLabels = []

async function getData () {
  for (let data of genreData) {
    chartLabels.push(data[0])
    chartValues.push(data[1])
  }
}

let ctx;
let chartCanvas;

function generateCoolColors(num) {
  let colors = [];
  
  for (let i = 0; i < num; i++) {
    let r = Math.floor(Math.random() * 60);
    let g = Math.floor(Math.random() * 60);
    let b = Math.floor(Math.random() * 60);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
}

const colors = generateCoolColors(50)

onMount(async (promise) => {
  await getData()
  ctx = chartCanvas.getContext('2d');
  new chartjs(ctx, {
    type: 'pie',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Genres',
        backgroundColor: colors,
        borderColor: '#297242',
        data: chartValues
        }]
    }
  });
});

</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>
