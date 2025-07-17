<script lang="ts">
  import { barchart } from 'nanocharts';
  import { onMount } from 'svelte';
  import './app.css';

  export let name: string;

  onMount(() => {
    const tbarchart = barchart({
      data: [50, 100, 50],
      labels: ['a', 'b', 'c'],
      type: 'numerical',
      orientation: 'vertical',
    });
    if (tbarchart instanceof SVGElement) {
      document.body.appendChild(tbarchart);
    }
  });
</script>

<h1>Hello {name}!</h1>
