<script>
    export let title;
    export let gray = false;
    export let white = false;
    export let disabled = false;
</script>

<button
    on:click
    class="btn"
    class:btn-gray={gray}
    class:btn-white={white}
    class:disabled
>
    {title}
</button>

<style>
    .btn {
        @apply px-4 py-2 border rounded-lg outline-none;
    }
    .btn-gray {
        @apply text-white bg-gray-900;
    }
    .btn-white {
        @apply text-white border-white;
    }
    .disabled {
        @apply opacity-50 pointer-events-none;
    }
</style>
