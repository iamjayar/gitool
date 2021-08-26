<script lang="ts">
  import { currentUser, supabase } from "$lib/auth";

  let email = "";
  let password = "";

  let isLoading = false;
  let error = "";

  const handleSubmit = async () => {
    if (isLoading) return;

    isLoading = true;
    error = "";

    let { user, error: err } = await supabase.auth.signIn({ email, password });

    isLoading = false;
    if (err) {
      error = err.message;
      return;
    }

    email = "";
    password = "";

    currentUser.set(user);
  };
</script>

<div class="sm:max-w-lg p-6 mx-2 sm:mx-auto bg-white border rounded-lg shadow flex flex-col">
  <h1 class="text-2xl mb-4">Sign in</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Email Address
      <input class="form-input" bind:value={email} type="email" id="email" placeholder="example@domain.com" required />
    </label>
    <label>
      Password
      <input
        class="form-input"
        bind:value={password}
        type="password"
        placeholder="******"
        autocomplete="current-password"
        required
      />
    </label>
    <button
      class="px-3 py-1 border border-blue-300 rounded text-sm hover:bg-blue-300"
      type="submit"
      disabled={isLoading}
    >
      {#if isLoading}
        <div class="spinner mr-2" />
      {/if}
      Sign in
    </button>
  </form>
</div>

<style lang="postcss">
  .form-input {
    @apply w-full mb-2 px-4 py-2 border border-gray-300 rounded
    focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:outline-none;
  }
</style>
