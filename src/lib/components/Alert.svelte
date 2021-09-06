<script lang="ts">
  export let alertType: string;
</script>

<div
  class="m-4 p-4"
  class:bg-red={alertType === "error"}
  class:bg-yello={alertType === "warning"}
  class:bg-sky-700={alertType === "info"}
  class:bg-green={alertType === "success"}
>
  <slot name="message" />
</div>
