<script lang="ts">
  import { barchart } from 'nanocharts';
  import { onMount } from 'svelte';
  import '../app.css';

  onMount(() => {
    const tbarchart = barchart({
      data: [50, 100, 30],
      labels: ['aaa', 'bbb', 'ccc'],
      orientation: 'horizontal',
    });
    console.log(tbarchart);
    if (tbarchart instanceof SVGElement) {
      document.body.appendChild(tbarchart);
    }
  });
</script>

<p></p>
