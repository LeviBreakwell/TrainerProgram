<script>
    import { loginWithGoogle, currentUser } from '../components/Auth.svelte';
    import { addUser } from '../auth';
</script>

<h1>Workout Planner</h1>

<p>
    <a href="/example">/example</a>
</p>
<main>
    <p>Hello</p>
    <button on:click={loginWithGoogle}>Login with Google</button>
    <p>{currentUser}</p>
    <button on:click={addUser}>Add user</button>
</main>
