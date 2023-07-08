<script context="module">
    import { initAuth } from './../auth/index.js';
    export const { currentUser, loginWithGoogle, logout } = initAuth();
    console.log(currentUser);
    currentUser.subscribe((v) => console.log(v));
</script>
