<script>
    import { createEventDispatcher } from 'svelte';
    import { clickOutside } from '../services/clickOutside';
    export let user;
    export let isOpen = false;

    const dispatch = createEventDispatcher();

    function openMenu() {
        isOpen = !isOpen;
    }

    function handleClickOutside() {
        isOpen = false;
    }
</script>

<div class="menu relative cursor-point">
    <div class="w-8 h-8 rounded-full overflow-hidden" on:click={openMenu}>
        <img src={user} />
    </div>
    {#if isOpen}
        <div
            class="flex flex-col text-right absolute border top-16 right-0 bg-white z-50 rounded-lg p-4 text-black pl-32"
            use:clickOutside
            on:click_outside={handleClickOutside}
        >
            <p on:click={() => dispatch('confirmLogout')}>logout</p>
            >
        </div>
    {/if}
</div>
