
// 1. DOM Selectors (get HTML elements)

const workoutForm = document.getElementById('workout-form');
const dateInput = document.getElementById('date');
const exerciseInput = document.getElementById('exercise');
const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const setsInput = document.getElementById('sets');

const logList = document.getElementById('log-list');
const totalVolumeDisplay = document.getElementById('total-volume');

// get data from loaclstorage (if there is not data,get array)
let workouts = JSON.parse(localStorage.getItem('fitnessLogs')) || [];

// 2. show data as soon as page is started
renderWorkouts();


// 3. Form Submit
workoutForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent from Page Refresh

  // create object
  const newWorkout = {
    id: Date.now(),
    date: dateInput.value,
    exercise: exerciseInput.value,
    weight: Number(weightInput.value),
    reps: Number(repsInput.value),
    sets: Number(setsInput.value),
  };

  // insert to array
  workouts.push(newWorkout);

  // save to LocalStorage
  saveToLocalStorage();

  // update UI and form cleaning
  renderWorkouts();
  workoutForm.reset();
});


// 4. Render Function (show at UI Table)
function renderWorkouts() {
  // clear old table
  logList.innerHTML = '';
  let grandTotalVolume = 0;

  //create table row with workouts in array by using loop
  workouts.forEach(function (workout) {
    const volume = workout.weight * workout.reps * workout.sets;
    grandTotalVolume += volume;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${workout.date}</td>
      <td>${workout.exercise}</td>
      <td>${workout.weight} kg</td>
      <td>${workout.reps}</td>
      <td>${workout.sets}</td>
      <td><strong>${volume} kg</strong></td>
      <td>
        <button class="delete-btn" onclick="deleteWorkout(${workout.id})">Delete</button>
      </td>
    `;
    logList.appendChild(row);
  });

  // show Total volume at header card
  if (totalVolumeDisplay) {
    totalVolumeDisplay.textContent = grandTotalVolume;
  }
}

// 5. save to LocalStorage Function
function saveToLocalStorage() {
  localStorage.setItem('fitnessLogs', JSON.stringify(workouts));
}

// 6. Delete Function
function deleteWorkout(id) {
  workouts = workouts.filter(function (workout) {
    return workout.id !== id;
  });

  saveToLocalStorage();
  renderWorkouts();
}