<script lang="ts">
  import { barchart } from 'nanocharts';
  import { onMount } from 'svelte';
  import '../app.css';

  let { placed }: { placed: 'top' | 'bottom' | 'left' | 'right' } = $props();

  onMount(() => {
    const tbarchart = barchart({
      data: [50, 100, 30],
      labels: ['aaa', 'bbb', 'ccc'],
      type: 'numerical',
      placement: placed,
    });
    if (tbarchart instanceof SVGElement) {
      document.body.appendChild(tbarchart);
    }
  });
</script>

<p></p>
