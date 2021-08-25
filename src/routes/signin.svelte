<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentUser, supabase } from "$lib/auth";

  if ($currentUser) goto("/");

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
    goto("/");
  };
</script>

<svelte:head>
  <title>Sign in</title>
</svelte:head>

<div class="container">
  <h1>Sign in</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={email} type="email" placeholder="Email" required />
    <input bind:value={password} type="password" placeholder="Password" required />
    <button type="submit" class="btn-primary" disabled={isLoading}>
      {#if isLoading}
        <div class="spinner" />
      {/if}
      Sign in
    </button>
  </form>

  <a href="/signup">Don't have an account?</a>

  {#if error}
    <div class="alert error">{error}</div>
  {/if}
</div>

<style>
  .container {
    width: min(100%, 480px);
    padding: 32px 16px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  h1 {
    color: var(--theme-color);
  }

  form,
  a {
    margin-bottom: 16px;
  }

  input[type="email"],
  input[type="password"] {
    width: 100%;
    margin-bottom: 16px;
    padding: 12px 16px;
    border: 1px solid hsl(0, 0%, 20%);
    border-radius: 4px;
    font-family: "Inconsolata", monospace;
  }

  .spinner {
    margin-right: 4px;
  }

  .error {
    color: hsl(355, 61%, 32%);
    background-color: hsl(355, 70%, 91%);
    border-color: hsl(354, 72%, 86%);
  }
</style>
