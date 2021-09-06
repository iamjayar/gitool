<script lang="ts">
  export let value: number;
</script>

<div class="relative w-full">
  <div class="h-2 overflow-hidden flex rounded-full bg-blue-100 shadow-inner">
    <div style={`width: ${value * 100}%`} class="bg-blue-400">
      <span class="hidden">{value}</span>
    </div>
  </div>
</div>
