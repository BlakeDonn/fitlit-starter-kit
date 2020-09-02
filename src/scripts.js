window.addEventListener('load', onLoad);

function onLoad() {
  populateRepos();
  displayGreeting();
  displayUserInfo();
  displayFriendList();
  displayDayConsumption();
  displayWeeklyConsumption();
  displayDaySleep();
  displayWeeklySleep();
  displayDayActivity();
  displayWeeklyActivity();
  displayDayComparison();
  displayHotStreak()
  displayStepGoal();
  
}
function populateRepos() {
  const randomUserId = Math.floor(Math.random() * userData.length)
  user = new User(userData[randomUserId])
  userRepository = new UserRepository(userData);
  hydrationRepository = new HydrationRepository(hydrationData);
  sleep = new Sleep(sleepData);
  activity = new Activity(activityData);
}
function displayGreeting() {
  let greeting = document.querySelector('.user-profile-display')
  greeting.innerHTML = `Welcome, ${user.returnFirstName()}!`
}
function displayUserInfo() {
  let infoCard = document.querySelector('.user-info-card')
  infoCard.innerHTML +=
    `<p class="user-name">${user.userData.name}</p>
    <p class="user-address">${user.userData.address}</p>
    <p class="user-email">${user.userData.email}</p>
    <p class="stride-length">Your stride length is : ${user.userData.strideLength} feet</p>
    <p class="user-friends">Your Friends:</p>
    `
}
function makeFriendList() {
  let userFriends = userRepository.returnFriendFullName(user.userData.friends)
  return userFriends.map(friendName => `<p class="friend-names">${friendName}</p>`).join(" ")
}
function displayFriendList() {
  let friendList = document.querySelector('.user-friends')
  friendList.insertAdjacentHTML('afterend', this.makeFriendList())
}
function displayDayConsumption() {
  let waterConsumption = document.querySelector('.user-hydration-card')
  waterConsumption.innerHTML +=
    `<h2>Hydration Data For The Day</h2>
    <p> Today's water consumption:
    ${hydrationRepository.dayOunces(user.userData.id).numOunces}oz</p>`
}
function displayWeeklyConsumption() {
  let userHydrationData = hydrationRepository.weeklyHydrationProperties(user.userData.id)
  weeklyDataGraphBuilder(userHydrationData, 'hydrationChart','Ounces Drank Per Day (oz)', 'numOunces');
}
function displayDaySleep() {
  let sleepProperties = document.querySelector('.day-sleep-card')
  sleepProperties.innerHTML +=
  `<h2>Sleep Data For The Day</h2>
  <p> Today's sleep data:
  Hours Slept ${sleep.daySleep( user.userData.id).hoursSlept}
  Sleep Quality ${sleep.daySleep(user.userData.id).sleepQuality}
  <h2>Sleep Data For All Time</h2>
  <p> All time sleep data:
    All time Average Hours Slept
    ${sleep.averageAllTimeSleep(user.userData.id, "hoursSlept")}
    All time Average Sleep Quality
    ${sleep.averageAllTimeSleep(user.userData.id, "sleepQuality")}
  </p>
  </p>
  `
}
function displayWeeklySleep() {
  let sleepWeekly = sleep.weeklySleepProperties(user.userData.id)
  weeklyDataGraphBuilder(sleepWeekly, 'sleepQualityChart', 'Nightly Sleep Quality', 'sleepQuality')
  weeklyDataGraphBuilder(sleepWeekly, 'sleepAmountChart', 'Nightly Sleep Amount (hours)', 'hoursSlept')
}
function displayDayActivity() {
  let dayActivity = document.querySelector('.day-activity-card')
  dayActivity.innerHTML +=
  `<h2 class="activity-day-data-tile"=>Activity Data For The Day</h2>
  <p class="day-activity today-step-data"> Daily Activity Data:
    Today's step data
    ${activity.dayData(user.userData.id).numSteps}
    </p>
    <p class="day-activity today-minutes-active">Today's mintues active data
    ${activity.dayData(user.userData.id).minutesActive}</p>
    <p class="day-activity today-distance-walked">Today's distance walked data
    ${activity.dailyMilesWalked(user.userData.id)}
  </p>
  `
}
function displayWeeklyActivity() {
  let weeklyActivity = activity.weeklyActivityProperties(user.userData.id)
  weeklyDataGraphBuilder(weeklyActivity, 'stepCountWeeklyChart', 'Daily Step Count (steps)', 'numSteps') 
  weeklyDataGraphBuilder(weeklyActivity, 'minutesActiveChart', 'Daily Minutes Active (minutes)', 'minutesActive')
  weeklyDataGraphBuilder(weeklyActivity, 'flightsClimbedChart', 'Daily Flights of Stairs Climbed (flights)', 'flightsOfStairs')
}
function displayDayComparison() {
  let compareDayActivity = document.querySelector('.comparison-activity-card')
  let allUsersDayAverage = activity.allUserAverage()
  let userDailyData = activity.dayData(user.userData.id)
  compareDayActivity .innerHTML +=
  `<h2 class="comparison-activity-header">You vs the World</h2>
  <p class="comparison-steps-card" id ="comparison-steps"></p>
  <p class="comparison-minutes-card" id ="comparison-minutes"></p>
  <p class="comparison-flights-card" id ="comparison-flights"></p>
  `
  comparisonGraphBuilder(userDailyData.numSteps, allUsersDayAverage.numSteps, "comparison-steps", "Number of Steps", 2500)
  comparisonGraphBuilder(userDailyData.minutesActive, allUsersDayAverage.minutesActive, "comparison-minutes", "Minutes Active", 50)
  comparisonGraphBuilder(userDailyData.flightsOfStairs, allUsersDayAverage.flightsOfStairs, "comparison-flights", "Flights of Stairs", 5)
}
function displayHotStreak() {
  let consecutiveDays = activity.consecutiveDays(user.userData.id,)
  let data = []
  consecutiveDays.forEach((day, i) => {
    data.push({
      type: "line",
      indexLabelFontSize: 4,
      dataPoints: [
        {x: i, label: day[0].date.slice(-4), y: day[0].numSteps},
        {x: i + 1, label: day[1].date.slice(-4), y: day[1].numSteps},
        {x: i + 2, label: day[2].date.slice(-4), y: day[2].numSteps},
      ]
    })
  })
  hotStreakGraphBuilder(data)
}
function displayStepGoal() {
  let stepData = activity.dayData(user.userData.id).numSteps;
  let stepGoal = user.userData.dailyStepGoal;
  let displayMessage;
  let titleText;
  let legendStatus;
  if (stepGoal > stepData) {
    stepGoal = stepGoal - stepData
    displayMessage = `${stepGoal} steps left to go!`
    titleText = 'Keep On Steppin!'
    legendStatus = true;
  } else {
    displayMessage = `${stepData - stepGoal} steps above your goal!`;
    stepGoal = 0;
    titleText = 'You Crushed Your Step Goal!'
    legendStatus = false;
  }
  stepGoalGraphBuilder(stepData,  stepGoal, displayMessage, titleText, legendStatus)
}
function weeklyDataGraphBuilder(userData, chartName, title, prop1) {
  let dataPoint = userData.map(x => ({label: x.date, y: x[prop1]}))
  let hydrationChart = new CanvasJS.Chart(chartName, {
    backgroundColor: "#1D222E",
    title:{
      text: title,
      fontColor: "#EBECF0",
    },
    axisX:{
      labelFontColor: "#EBECF0"
    },
    axisY:{
      labelFontColor: "#EBECF0"
    },
    data: [
      {
      // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: dataPoint
      }
    ]
  });
  hydrationChart.render();
}
function comparisonGraphBuilder(allProperty, userProperty, id, name, pickedInterval ) {
  let chart = new CanvasJS.Chart(id, {
    animationEnabled: true,
    theme: 'dark1',
    title: {
      text: `Daily ${name}`
    },
    dataPointWidth: 65,
    axisY: {
      title: name,
      interval: pickedInterval,
      minimum: 0
    },
    data: [{
      type: "column",
      dataPoints: [
        { y: allProperty, label: "You" },
        { y: userProperty,  label: "User Average" },
      ]
    }]
  });
  chart.render();
}
function hotStreakGraphBuilder(data) {
  let chart = new CanvasJS.Chart("consecutive-days", {
    animationEnabled: true,
    theme: "dark1",
    title:{
      text: "Your Hot Streaks"
    },
    axisX:{
      interval: 1,
      labelFontSize: 12
    },
    axisY:{
      minimum: 0,
    },
    data: data
  });
  chart.render();
}
function stepGoalGraphBuilder (stepData,  stepGoal, displayMessage, titleText, legendStatus) {
  var chart = new CanvasJS.Chart("doughnutChart",{
    backgroundColor: "#1D222E",
    title:{
      text: titleText,
      fontColor: "#EBECF0"
    },
    legend: {
      fontColor: "#EBECF0"
    },
    data: [
      {
        indexLabelFontColor: "#EBECF0",
        type: "doughnut",
        showInLegend: legendStatus,
        dataPoints: [
          {  y: stepData, indexLabel: `${stepData} Steps Walked`, color: "#9CBB58", legendText: "Steps So Far Today" },
          {  y: stepGoal, indexLabel: displayMessage, color: "#23BFAA", legendText: "Steps Left To Goal"}
        ]
      },
    ]
  });
  chart.render();
}
