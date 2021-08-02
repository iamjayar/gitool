<script lang="ts" context="module">
  import type { ErrorLoad } from "@sveltejs/kit";

  export const load: ErrorLoad = async ({ error, status }) => {
    return {
      props: {
        status,
        message: error.message,
      },
    };
  };
</script>

<script lang="ts">
  export let status: number;
  export let message: string;
</script>

<div class="center">
  <strong>{status}: {message}</strong>
</div>

<style>
  .center {
    height: 100vh;
  }
</style>
