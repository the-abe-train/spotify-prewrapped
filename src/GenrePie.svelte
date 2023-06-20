<script>
import chartjs from 'chart.js';
import { onMount } from 'svelte';

export let genreData

console.log('genreData:', genreData)

let chartValues = [20, 10, 5, 2, 20, 30, 45];
let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// let chartValues = []
// let chartLabels = []

// for (let data in genreData) {
//     chartValues.push[data[0]]
//     chartValues.push(data[1])
// }

let ctx;
let chartCanvas;

function generateCoolColors(num) {
  let colors = [];
  
  for (let i = 0; i < num; i++) {
    let r = Math.floor(Math.random() * 128);
    let g = Math.floor(Math.random() * 128);
    let b = Math.floor(Math.random() * 256);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
}

const colors = generateCoolColors(10)

onMount(async (promise) => {
  ctx = chartCanvas.getContext('2d');
  var chart = new chartjs(ctx, {
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
