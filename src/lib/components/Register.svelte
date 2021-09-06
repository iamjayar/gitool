<script lang="ts">
  import { supabase } from "$lib/auth";

  let email = "";
  let password = "";
  let confirmation = "";

  let error = "";
  let success = "";

  let isLoading = false;

  const handleSubmit = async () => {
    if (isLoading) return;

    error = "";
    success = "";

    if (password !== confirmation) {
      error = "Password doesn't matched!";
      return;
    }

    isLoading = true;

    try {
      let { data } = await supabase.auth.signUp({ email, password });
    } catch (err) {
      console.log(err);
    }

    isLoading = false;

    email = "";
    password = "";
    confirmation = "";
  };
</script>

<div>
  <h1>Create an account</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <label for="input-email">Email Address</label>
    <input bind:value={email} type="email" id="input-email" placeholder="address@domain.com" />
  </form>
</div>
