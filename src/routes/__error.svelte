<script lang="ts" context="module">
  import type { ErrorLoad } from "@sveltejs/kit";
  export const load: ErrorLoad = async ({ error, status }) => ({
    props: { status, message: error.message },
  });
</script>

<script lang="ts">
  export let status: number;
  export let message: string;
</script>

<div class="flex-center">
  <strong>{status}: {message}</strong>
</div>

<style>
  div {
    height: 100vh;
  }
</style>
