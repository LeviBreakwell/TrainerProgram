<script>
    // @ts-nocheck
    import '../global.css';
    // import incrementFlyIn from './incrementFlyIn.svelte';
    import CreateExercise from '../components/CreateExercise.svelte';
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    // import NavBar from './NavBar.svelte';

    // <slot />;
    /**
     * Handles animation of object moving between components
     */
    const [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),
        fallback(node) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;
            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
                    transform: ${transform} scale(${t});
                    opacity: ${t}
                `,
            };
        },
    });

    /** New Workout and Exercise
     * Defining a new workout
     */

    let workout = {
        name: 'New Workout',
        exercises: [],
    };
    let uid = 1;
    let exercise = {
        id: uid++,
        name: '',
        description: '',
        sets: [],
    };

    /**
     * Creating list of exercises for the libary eventually to be replaced with Database call.
     */

     let exercises = [
        {
            id: uid++,
            name: 'Squats',
            description: 'Barbell on back',
            sets: [5, 5, 5],
        },
        {
            id: uid++,
            name: 'Pull Ups',
            description: 'Controlled full range of motion',
            sets: [5, 5, 5],
        },
        {
            id: uid++,
            name: 'RDL',
            description: '',
            sets: [5, 5, 5],
        },
        {
            id: uid++,
            name: 'Hamstring Bridge',
            description: '',
            sets: [5, 5, 5],
        },
        {
            id: uid++,
            name: 'Calf Raises',
            description: '',
            sets: [5, 5, 5],
        },
        {
            id: uid++,
            name: 'Push Ups',
            description: '',
            ets: [5, 5, 5],
        },
    ];

    /** Exercise Builder Functions
     * function to allow mutliple sets to be added with a rep and weight value
     *  + to add N number of props within the set object to add extra things like time, distance, etc
     */
    function addSet() {
        if (exercise.sets.length == 0) {
            exercise.sets = [...exercise.sets, { reps: 0, weight: 0 }];
        } else {
            console.log(exercise.sets.length);
            exercise.sets = [
                ...exercise.sets,
                {
                    reps: exercise.sets[exercise.sets.length - 1].reps,
                    weight: exercise.sets[exercise.sets.length - 1].weight,
                },
            ];
        }
    }

    function removeSet(index) {
        exercise.sets = exercise.sets.filter((set, i) => {
            return i != index;
        });
    }

    /**adds the newly created exercise to the workout
     *
     * @param newExercise
     */
    function addExercise(newExercise) {
        exercises = [newExercise, ...exercises];
        exercise = {
            name: '',
            description: '',
            sets: [{ reps: 0, weight: 0 }],
        };
    }

    /**
     * Deletes an exercise from  the workout or library
     * @param exercise
     */
    function remove(exercise) {
        workout.exercises = workout.exercises.filter((e) => e !== exercise);
    }

    /**
     * switches the exercises include value to add or remove from list
     * @param exercise
     * @param include
     */
    function mark(exercise) {
        workout.exercises = [...workout.exercises, exercise];
        // exercises = exercises.concat(exercise);
    }

    // const addAttribute = (i) => {

    // }
</script>

<!-- <NavBar /> -->
<div class="body">
    <div class="createExercise">
        <form on:submit|preventDefault={() => addExercise(exercise)}>
            <button type="submit">Create Exercise</button>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" bind:value={exercise.name} />
            </div>
            <div>
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>Sets:</label>
                <button type="button" on:click={addSet}>Add Set</button>
                {#each exercise.sets as set, i}
                    <div>
                        <input
                            type="number"
                            min="1"
                            step="1"
                            bind:value={set.reps}
                        />
                        <!-- <button on:click={addAttribute(i)}> +</button> -->
                    </div>

                    <div class="set-item">
                        <input
                            type="number"
                            min="1"
                            step="1"
                            bind:value={set.reps}
                        />
                        <input
                            type="number"
                            min="0"
                            step="2"
                            bind:value={set.weight}
                        />
                        <button type="button" on:click={() => removeSet(i)}
                            >Remove</button
                        >
                    </div>
                {/each}
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" bind:value={exercise.description} />
            </div>
        </form>
    </div>

    <div class="library">
        <h2 class="text-3xl font-bold underline">Exercise Library</h2>
        {#each exercises as exercise (exercise.id)}
            <label
                in:receive={{ key: exercise.id }}
                out:send={{ key: exercise.id }}
            >
                <input type="checkbox" on:change={() => mark(exercise, true)} />
                {exercise.name}
                <button on:click={() => remove(exercise)}>remove</button>
            </label>
        {/each}
    </div>

    <!-- Workout being built -->
    <div class="workouts">
        <h2>Workouts</h2>
        {#each workout.exercises as exercise}
            <ol
                class="exercise"
                in:receive={{ key: exercise.id }}
                out:send={{ key: exercise.id }}
            >
                <li>{exercise.name}</li>
                <p>{exercise.description}</p>
                {#each exercise.sets as set}
                    <p>{set.reps} reps at {set.weight} kgs</p>
                {/each}
                <input type="checkbox" on:change={() => mark(exercise, true)} />
                {exercise.name}
                <button on:click={() => remove(exercise)}>remove</button>
            </ol>
        {/each}
    </div>
</div>

<style>
    .createExercise {
        display: inline-block;
        background-color: #3d3d3f;
        width: 33%;
        margin: 5px;
        justify-content: space-between;
        justify-items: center;
    }
    .createExercise form {
        display: inline-block;
        background-color: #3d3d3f;

        margin: 5px;
        justify-content: space-between;
        justify-items: center;
    }

    .set-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .set-item input[type='number'] {
        margin-right: 1rem;
        width: 40px;
    }

    .set-item button {
        margin-left: 1rem;
    }
    .body {
        display: flex;
        width: 100%;
        height: 100em;
        margin: 0px;
        padding: 0px;
        background-color: #222222;
    }

    .library {
        display: flex;
        flex-direction: column;
        background-color: #3d3d3f;
        width: 33%;
        margin: 5px;
    }

    .workouts {
        display: flex;
        flex-direction: column;
        background-color: #3d3d3f;
        width: 33%;
        margin: 5px;
    }

    h2 {
        font-size: 2em;
        font-weight: 200;
        user-select: none;
        margin: 0 0 0.5em 0;
    }

    label {
        position: relative;
        /* line-height: 1.2; */
        /* padding: 0.5em 2.5em 0.5em 2em; */
        margin: 0 0 0.5em 0;
        border-radius: 2px;
        user-select: none;
        border: 1px solid hsl(240, 8%, 70%);
        background-color: hsl(240, 8%, 93%);
        color: #333;
    }

    .exercise {
        position: relative;
        line-height: 1.2;
        padding: 0.5em 2.5em 0.5em 2em;
        margin: 0 0 0.5em 0;

        border-radius: 2px;
        user-select: none;
        border: 1px solid hsl(240, 8%, 70%);
        background-color: hsl(240, 8%, 93%);
        color: #333;
    }

    input[type='checkbox'] {
        /* position: absolute; */
        left: 0.5em;
        top: 0.6em;
        margin: 0;
    }

    label > button {
        position: absolute;
        top: 0;
        workouts: 0.2em;
        width: 2em;
        height: 100%;
        background: no-repeat 50% 50%
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
        background-size: 1.4em 1.4em;
        border: none;
        opacity: 0;
        transition: opacity 0.2s;
        text-indent: -9999px;
        cursor: pointer;
    }

    label:hover button {
        opacity: 1;
    }
</style>
