<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentUser, supabase } from "$lib/auth";

  if ($currentUser) goto("/");

  let email = "";
  let password = "";
  let confirmation = "";

  let isLoading = false;
  let error = "";
  let success = "";

  const handleSubmit = async () => {
    if (isLoading) return;

    isLoading = true;
    error = "";
    success = "";

    if (password !== confirmation) {
      isLoading = false;
      error = "Password doesn't matched!";
      return;
    }

    let { error: err } = await supabase.auth.signUp({ email, password });

    isLoading = false;
    if (err) {
      error = err.message;
      return;
    }

    email = "";
    password = "";
    confirmation = "";

    success = "Confirmation sent through email.";
  };
</script>

<svelte:head>
  <title>Create an account</title>
</svelte:head>

<div class="container">
  <h1>Create an account</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={email} type="email" placeholder="Email" required />
    <input bind:value={password} type="password" placeholder="Password" required />
    <input bind:value={confirmation} type="password" placeholder="Confirm Password" required />
    <button type="submit" disabled={isLoading}>
      {#if isLoading}
        <div class="spinner" />
      {/if}
      Sign up
    </button>
  </form>

  <a href="/signin">Already have an account?</a>

  {#if error}
    <div class="alert error">{error}</div>
  {/if}

  {#if success}
    <div class="alert success">{success}</div>
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
    font-family: var(--font-monospace);
  }

  button[type="submit"] {
    padding: 12px 12px;
    border: 1px solid var(--theme-color);
    border-radius: 4px;
  }

  button[type="submit"]:hover {
    background-color: var(--theme-color);
    color: hsl(0, 0%, 10%);
  }

  .spinner {
    margin-right: 4px;
  }

  .error {
    color: hsl(355, 61%, 32%);
    background-color: hsl(355, 70%, 91%);
    border-color: hsl(354, 72%, 86%);
  }

  .success {
    color: hsl(216, 90%, 31%);
    background-color: hsl(216, 100%, 91%);
    border-color: hsl(215, 97%, 85%);
  }
</style>
