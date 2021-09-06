<script lang="ts">
  import { currentUser, supabase } from "$lib/auth";
  import Alert from "./Alert.svelte";

  let email = "";
  let password = "";
  let confirmation = "";

  let isLoading = false;
  let error = "";
  let success = "";

  let register = false;
  const toggleRegister = () => {
    email = "";
    password = "";
    confirmation = "";
    error = "";
    success = "";
    register = !register;
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    isLoading = true;
    error = "";
    success = "";
    confirmation = "";

    if (register && password !== confirmation) {
      isLoading = false;
      error = "Password doesn't matched!";
      return;
    }

    let { user, error: err } = await (register
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signIn({ email, password }));

    isLoading = false;
    if (err) {
      error = err.message;
      return;
    }

    if (!register) {
      currentUser.set(user);
    }

    email = "";
    password = "";
    confirmation = "";
  };
</script>

<div class="sm:max-w-lg p-6 mx-2 sm:mx-auto bg-white border rounded-lg shadow  flex flex-col">
  <h1 class="text-2xl mb-4">{register ? "Create an account" : "Log in"}</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Email Address
      <input class="form-input" bind:value={email} type="email" id="email" placeholder="example@domain.com" required />
    </label>

    <label>
      Password
      <input class="form-input" bind:value={password} type="password" placeholder="******" required />
    </label>

    {#if register}
      <label>
        Confirm Password
        <input class="form-input" bind:value={confirmation} type="password" placeholder="******" required />
      </label>
    {/if}

    <button
      class="px-3 py-1 border border-blue-300 rounded text-sm hover:bg-blue-300"
      type="submit"
      disabled={isLoading}
    >
      {#if isLoading}
        <div class="spinner inline-block mr-2" />
      {/if}
      {register ? "Sign up" : "Log in"}
    </button>
  </form>

  {#if error}
    <Alert alertType="error">
      <p slot="message">{error}</p>
    </Alert>
  {/if}

  {#if success}
    <Alert alertType="success">
      <p slot="message">{success}</p>
    </Alert>
  {/if}

  <button on:click={toggleRegister}>
    {register ? "Already have an account?" : "Don't have account?"}
  </button>
</div>
