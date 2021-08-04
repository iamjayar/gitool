<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentUser, signIn, signUp } from "$lib/auth";

  // Redirect if there is a current user signed in
  if ($currentUser) {
    goto("/");
  }

  let signin = true;
  const toggleForm = () => {
    signin = !signin;
  };

  let isLoading = false;
  let message = {
    error: "",
    success: "",
  };

  let inputSignIn = {
    email: "",
    password: "",
  };

  let inputSignUp = {
    email: "",
    password: "",
    confirmation: "",
  };

  const handleSignIn = async () => {
    if (isLoading) return;

    isLoading = true;

    // Reset to default values
    message.error = "";
    message.success = "";

    let error = await signIn(inputSignIn.email, inputSignIn.password);

    isLoading = false;

    if (error) {
      return (message.error = error.message);
    }

    goto("/");
  };

  const handleSignUp = async () => {
    if (isLoading) return;

    isLoading = true;

    // Reset to default values
    message.error = "";
    message.success = "";

    // Check if password matched
    if (inputSignUp.password !== inputSignUp.confirmation) {
      isLoading = false;
      return (message.error = "Password doesn't match!");
    }

    let error = await signUp(inputSignUp.email, inputSignUp.password);

    isLoading = false;

    if (error) {
      message.error = error.message;
    }

    message.success = "Confirmation sent through email.";
  };
</script>

<div class="center">
  {#if signin}
    <h3>Sign in</h3>
    <form on:submit|preventDefault={handleSignIn}>
      <input type="email" bind:value={inputSignIn.email} placeholder="Email" required />
      <input type="password" bind:value={inputSignIn.password} placeholder="Password" required />
      <input type="submit" value="Sign in" disabled={isLoading} />
    </form>
    <button on:click={toggleForm}>Don't have account?</button>
  {:else}
    <h3>Create an account</h3>
    <form on:submit|preventDefault={handleSignUp}>
      <input type="email" bind:value={inputSignUp.email} placeholder="Email" required />
      <input type="password" bind:value={inputSignUp.password} placeholder="Password" required />
      <input type="password" bind:value={inputSignUp.confirmation} placeholder="Confirm Password" required />
      <input type="submit" value="Sign up" disabled={isLoading} />
    </form>
    <button on:click={toggleForm}>Already have an account?</button>
  {/if}

  <div>{message.error}</div>
</div>

<style>
  .center {
    padding: 12px;
    flex-direction: column;
  }

  h3 {
    color: var(--theme-color);
  }

  form {
    width: clamp(120px, 100%, 420px);
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 12px 32px;
    margin-bottom: 12px;
    border-color: hsl(0, 0%, 25%);
    border-radius: 4px;
  }

  input[type="submit"] {
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: hsla(17, 100%, 74%, 0.5);
  }
</style>
