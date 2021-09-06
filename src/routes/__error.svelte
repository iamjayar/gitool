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

<div class="max-w-lg mx-auto p-8 border border-gray-200 rounded shadow">
  <strong>{status}: {message}</strong>
</div>
