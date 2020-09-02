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
  hydration = new Hydration(hydrationData);
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
    ${hydration.dayOunces(user.userData.id).numOunces}oz</p>`
}
function displayWeeklyConsumption() {
  let userHydrationData = hydration.weeklyHydrationProperties(user.userData.id)
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
  let stepData = document.querySelector('.today-step-data')
  let minActive = document.querySelector('.today-minutes-active')
  let walkedMiles = document.querySelector('.today-distance-walked')
  stepData.innerHTML +=
    `${activity.dayData( user.userData.id).numSteps}`
  minActive.innerHTML +=
    `${activity.dayData(user.userData.id).minutesActive}`
  walkedMiles.innerHTML +=
    `${activity.dailyMilesWalked(user.userData.id)}`
}
function displayWeeklyActivity() {
  let weeklyActivity = activity.weeklyActivityProperties(user.userData.id)
  weeklyDataGraphBuilder(weeklyActivity, 'stepCountWeeklyChart', 'Daily Step Count (steps)', 'numSteps')
  weeklyDataGraphBuilder(weeklyActivity, 'minutesActiveChart', 'Daily Minutes Active (minutes)', 'minutesActive')
  weeklyDataGraphBuilder(weeklyActivity, 'flightsClimbedChart', 'Daily Flights of Stairs Climbed (flights)', 'flightsOfStairs')
}
function displayDayComparison() {
  let compareDayActivity = document.querySelector('.comparison-activity-card')
  let activityFindAllUsers = activity.allUserAverage()
  let activityUsers = activity.dayData(user.userData.id)
  comparisonGraphBuilder(activityFindAllUsers.numSteps, activityUsers.numSteps, "comparison-steps", "Number of Steps", 2500)
  comparisonGraphBuilder(activityFindAllUsers.minutesActive, activityUsers.minutesActive, "comparison-minutes", "Minutes Active", 50)
  comparisonGraphBuilder(activityFindAllUsers.flightsOfStairs, activityUsers.flightsOfStairs, "comparison-flights", "Flights of Stairs", 5)
}
function displayHotStreak() {
  let consecutiveDays = activity.consecutiveDays(user.userData.id,)
  let data = []
  consecutiveDays.forEach((day, i) => {
    data.push({
      lineColor: "#5081BC",
      color: "#F79647",
      type: "line",
      lineThickness: 5,
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
    backgroundColor: "#1D222E",
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
  let chart = new CanvasJS.Chart("doughnutChart",{
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
