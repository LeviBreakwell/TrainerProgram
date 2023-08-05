<script>
    import {
        loginWithGoogle,
        logout,
        currentUser,
    } from '../components/Auth.svelte';
    import { Button, Menu } from '../components';
    import { url } from '@roxi/routify';
    // let _user;
    // currentUser.subscribe((v) => (_user = v));
    console.log(currentUser);
</script>

<main class="w-full flex justify-between items-center nav p-4 text-white">
    <div>
        <a href={$url('../')}>
            <img src="/assets/images/logo.png" alt="logo" />
        </a>
    </div>
    {#if !$currentUser}
        <Button title="login with Google" gray on:click={loginWithGoogle} />
    {:else}
        <Menu user={$currentUser.photoURL} on:confirmLogout={logout} />
    {/if}
</main>

<style>
    .nav {
        background-color: #222222;
    }
</style>