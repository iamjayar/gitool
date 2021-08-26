<script lang="ts">
  export let value: number;
</script>

<div class="container relative">
  <div class="h-2 overflow-hidden flex rounded-full bg-blue-200 shadow-inner">
    <div style={`width: ${value * 100}%`} class="bg-blue-500">
      <span class="hidden">{value}</span>
    </div>
  </div>
</div>
