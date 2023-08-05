<script>
// @ts-nocheck
    let exercise = {
      name: "",
      description: "",
      sets: []
    };
  
    function addSet() {
      exercise.sets = [...exercise.sets, { reps: 0, weight: 0 }];
    }
  
    function removeSet(index) {
      exercise.sets.splice(index, 1);
    }
    let workout = {
        exercises: [],
    };

    function addExercise(newExercise) {
        workout.exercises = [...workout.exercises, newExercise];
    }

</script>
  
  <style>
    input[type="number"] {
      width: 4rem;
    }
  
    .set-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }
  
    .set-item input[type="number"] {
      margin-right: 1rem;
    }
  
    .set-item button {
      margin-left: 1rem;
    }
  </style>
  
  