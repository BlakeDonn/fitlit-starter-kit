



window.addEventListener('load', onLoad);

function onLoad() {
  chooseRandomUser();
  compareUsersSteps();
  displayUserInfo();
  displayFriendList();
  displayWaterConsumption();
  displayWeeklyConsumption();
  displayDailySleep();
  displayWeeklySleep();
  allTimeSleep();
  displayDayActivity();
  displayWeeklyActivity();
  compareDayActivity();
  displayConsecutiveDays()
  createDoughnutProperties();
}

function chooseRandomUser() {
  const randomUserId = Math.floor(Math.random() * userData.length)
  user = new User(userData[randomUserId])
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
    `
}
function compareUsersSteps() {
  userRepository = new UserRepository(userData)
  activity = new Activity(activityData);
}
function makeFriendList() {
  let userFriends = userRepository.returnFriendFullName(user.userData.friends)
  console.log("X", userFriends.map(friendName => `<p class="friend-names">${friendName}</p>`))
  return userFriends.map(friendName => `<p class="friend-names">${friendName}</p>`).join(" ")
}
function displayFriendList() {
  let friendList = document.querySelector('.stride-length')
  friendList.insertAdjacentHTML('beforeEnd', this.makeFriendList())
}
function displayWaterConsumption() {
  hydrationRepository = new HydrationRepository(hydrationData);
  let waterConsumption = document.querySelector('.user-hydration-card')
  waterConsumption.innerHTML +=
    `<h2>Hydration Data For The Day</h2>
    <p> Today's water consumption:
    ${hydrationRepository.dayOunces("2019/06/15", user.userData.id)}oz</p>`
}
function displayWeeklyConsumption() {
  let userHydrationData = hydrationRepository.dailyOuncesPerGivenWeek("2019/06/15", user.userData.id)
  hydrationGraph(userHydrationData);
}
function displayDailySleep() {
  sleep = new Sleep(sleepData)
  let sleepProperties = document.querySelector('.day-sleep-card')
  sleepProperties.innerHTML +=
  `<h2>Sleep Data For The Day</h2>
  <p> Today's sleep data:
  Hours Slept ${sleep.daySleep("2019/06/15", user.userData.id).hoursSlept}
  Sleep Quality ${sleep.daySleep("2019/06/15", user.userData.id).sleepQuality}
  </p>
  `
}
function displayWeeklySleep() {
  let sleepWeekly = sleep.weeklySleepProperties("2019/06/15", user.userData.id)
  sleepGraph(sleepWeekly)
  sleepAmountGraph(sleepWeekly)
}
function allTimeSleep() {
  let sleepAllTime = document.querySelector('.all-time-sleep-card')
  sleepAllTime.innerHTML +=
  `<h2>Sleep Data For All Time</h2>
  <p> All time sleep data:
    All time Average Hours Slept
    ${sleep.averageAllTimeSleep(user.userData.id, "hoursSlept")}
    All time Average Sleep Quality
    ${sleep.averageAllTimeSleep(user.userData.id, "sleepQuality")}
  </p>
  `
}
function displayDayActivity() {
  let dayActivity = document.querySelector('.day-activity-card')
  dayActivity.innerHTML +=  
  `<h2 class="activity-day-data-tile"=>Activity Data For The Day</h2>
  <p class="day-activity today-step-data"> Daily Activity Data:
    Today's step data
    ${activity.getDayData("2019/06/15", user.userData.id).numSteps}
    </p>
    <p class="day-activity today-minutes-active">Today's mintues active data
    ${activity.getDayData("2019/06/15", user.userData.id).minutesActive}</p>
    <p class="day-activity today-distance-walked">Today's distance walked data
    ${activity.walkedMilesPerDay("2019/06/15", user.userData.id)}
  </p>
  `
}
function displayWeeklyActivity() {
  let weeklyActivity = activity.weeklyActivityProperties("2019/06/15", user.userData.id)
  weeklyStepCountGraph(weeklyActivity)
  weeklyStairFlightsClimbed(weeklyActivity)
  weeklyMinutesActive(weeklyActivity)
}
function compareDayActivity() {
  let compareDayActivity = document.querySelector('.comparison-activity-card')
  let activityFindAllUsers = activity.findDayActivity("2019/06/15")
  let activityUsers = activity.getDayData("2019/06/15", user.userData.id)
  compareDayActivity .innerHTML +=
  `<h2 class="comparison-activity-header">You vs the World</h2>
  <p class="comparison-steps-card" id ="comparison-steps"></p>
  <p class="comparison-minutes-card" id ="comparison-minutes"></p>
  <p class="comparison-flights-card" id ="comparison-flights"></p>
  `
  dailyComparisonActivity(activityFindAllUsers.numSteps, activityUsers.numSteps, "comparison-steps", "Number of Steps", 2500)
  dailyComparisonActivity(activityFindAllUsers.minutesActive, activityUsers.minutesActive, "comparison-minutes", "Minutes Active", 50)
  dailyComparisonActivity(activityFindAllUsers.flightsOfStairs, activityUsers.flightsOfStairs, "comparison-flights", "Flights of Stairs", 5)
}
function displayConsecutiveDays() {
  let activityConsecutiveDays = activity.consecutiveDays(user.userData.id)
  consecutiveStepGoalDays(activityConsecutiveDays)
  
}
function hydrationGraph(hydrationData) {
  let dataPoint = hydrationData.map(x => ({label: x.date, y: x.ounces, }))
  let hydrationChart = new CanvasJS.Chart("chartContainer", {
    backgroundColor: "#1D222E",
    title:{
      text: "Your Weekly Hydration Data in Ounces",
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
function sleepGraph(sleepData) {
  console.log(sleepData)
  let dataPoint = sleepData.map(x => ({label: x.date, y: x.sleepQuality}))
  let sleepQualityChart = new CanvasJS.Chart("sleepChartContainer", {
    backgroundColor: "#1D222E",
    title:{
      text: "Your Weekly Sleep Quality Data",
      fontColor: "#EBECF0"
    },
    axisX:{
      labelFontColor: "#EBECF0"
    },
    axisY:{
      labelFontColor: "#EBECF0"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoint
      }
    ]
  });
  sleepQualityChart.render();
}
function sleepAmountGraph(sleepData) {
  let dataPoint = sleepData.map(x => ({label: x.date, y: x.hoursSlept}))
  let sleepAmountChart = new CanvasJS.Chart('sleepChartAmountContainer', {
    backgroundColor: "#1D222E",
    title: {
      text: "Your Weekly Sleep in Hours",
      fontColor: "#EBECF0"
    },
    axisX: {
      labelFontColor: "#EBECF0"
    },
    axisY: {
      labelFontColor: "#EBECF0"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoint
      }
    ]
  })
  sleepAmountChart.render();
}
function weeklyStepCountGraph(activityData) {
  let dataPoint = activityData.map(data => ({label: data.date, y: data.stepCount}))
  let stepCountChart = new CanvasJS.Chart('stepCountWeeklyChart', {
    backgroundColor: "#1D222E",
    title: {
      text: "Your Weekly Step Count Data",
      fontColor: "#EBECF0"
    },
    axisX: {
      labelFontColor: "#EBECF0"
    },
    axisY: {
      labelFontColor: "#EBECF0"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoint
      }
    ]
  })
  stepCountChart.render();
}
function weeklyStairFlightsClimbed(activityData) {
  let dataPoint = activityData.map(data => ({label: data.date, y: data.flightsOfStairsClimbed}))
  let flightsClimbedChart = new CanvasJS.Chart('flightsClimbedChart', {
    backgroundColor: "#1D222E",
    title: {
      text: "Your Weekly Flights of Stairs Climbed",
      fontColor: "#EBECF0"
    },
    axisX: {
      labelFontColor: "#EBECF0"
    },
    axisY: {
      labelFontColor: "#EBECF0"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoint
      }
    ]
  })
  flightsClimbedChart.render();
}
function weeklyMinutesActive(activityData) {
  let dataPoint = activityData.map(data => ({label: data.date, y: data.minutesActive}))
  let minutesActiveChart = new CanvasJS.Chart('minutesActiveChart', {
    backgroundColor: "#1D222E",
    title: {
      text: "Your Weekly Minutes Active",
      fontColor: "#EBECF0"
    },
    axisX: {
      labelFontColor: "#EBECF0"
    },
    axisY: {
      labelFontColor: "#EBECF0"
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoint
      }
    ]
  })
  minutesActiveChart.render()
}
function dailyComparisonActivity(allProperty, userProperty, id, name, pickedInterval ) {
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
function consecutiveStepGoalDays(activityConsecutiveDays) {
  let dataPoints1 = []
  console.log(activityConsecutiveDays.length)
  activityConsecutiveDays.forEach(day => {
    (dataPoints1.push({label: day.date.slice(-4), y: day.steps}))
  })
  let chart = new CanvasJS.Chart("consecutive-days", {
    animationEnabled: true,
    theme: "dark2",
    title:{
      text: "Your Hot Streaks (3 consecutive step increases)"
    },
    axisX:{
      interval: 1,
      labelFontSize: 12
    },
    data: [{        
      type: "line",
      indexLabelFontSize: 4,
      dataPoints: dataPoints1
    }]
  });
  chart.render();
}
function createDoughnutProperties() {
  let stepData = activity.getDayData("2019/06/15", user.userData.id).numSteps;
  let stepGoal = user.userData.dailyStepGoal;
  let displayMessage;
  let titleText;
  let legendStats;
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
  stepDoughnutGraph(stepData,  stepGoal, displayMessage, titleText, legendStatus)
}
  function stepDoughnutGraph (stepData,  stepGoal, displayMessage, titleText, legendStatus) {
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
          {  y: stepGoal, indexLabel: displayMessage, color: "#23BFAA", legendText: "Your Step Goal"}
        ]
      },
    ]
  });
  chart.render();
}
