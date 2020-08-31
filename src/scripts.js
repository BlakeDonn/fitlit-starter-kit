



window.addEventListener('load', onLoad);

function onLoad() {
  chooseRandomUser();
  displayUserInfo();
  compareUsersSteps();
  displayFriendList();
  displayWaterConsumption();
  displayWeeklyConsumption();
  displayDailySleep();
  displayWeeklySleep();
  allTimeSleep();
  displayDayActivity();
  displayWeeklyActivity();
  compareDayActivity();
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
    `<h2>INFO</h2>
    <p>Name: ${user.userData.name}</p>
    <p>Address: ${user.userData.address}</p>
    <p>Email: ${user.userData.email}</p>
    <p>Stride: ${user.userData.strideLength} feet</p>
    <p>Steps: ${user.userData.dailyStepGoal} steps per day</p>
    <p class="friend-names">Friends: ${user.userData.friends}</p>`
}


function compareUsersSteps() {
  userRepository = new UserRepository(userData)
  let userComparisons = document.querySelector('.compare-user-steps')
  userComparisons.innerHTML +=
    `<h2>STEPS</h2>
    <p>Your daily step goal is: ${user.userData.dailyStepGoal}</p>
    <p>All users daily step goal is: ${userRepository.getAvgStepGoal()}</p>`
}


function makeFriendList() {
  let userFriends = userRepository.returnFriendFullName(user.userData.friends)
  return userFriends.map(friendName => `<p class="friend-names">${friendName}</p>`)
}

function displayFriendList() {
  let friendList = document.querySelector('.friend-names')
  friendList.insertAdjacentHTML('afterBegin', this.makeFriendList(this.user, this.userRepo))
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
}

// function displayWeeklySleep() {
//   let sleepWeekly = document.querySelector('.week-sleep-card')
//   sleepWeekly.innerHTML +=
//   `<h2>Sleep Data For The Week</h2>
//   <p> Weekly sleep data:
//     Weekly Hours Slept
//     ${sleep.weeklySleepProperties("2019/06/15", user.userData.id, "hoursSlept")}
//     Weekly Sleep Quality
//     ${sleep.weeklySleepProperties("2019/06/15", user.userData.id, "sleepQuality")}
//   </p>
//   `
//   sleepGraph(sleepWeekly)
// }

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
  activity = new Activity(activityData);
  let dayActivity = document.querySelector('.day-activity-card')
  dayActivity.innerHTML +=
  `<h2>Activity Data For The Day</h2>
  <p> Daily Activity Data:
    Today's step data
    ${activity.getDayData("2019/06/15", user.userData.id).numSteps}
    Today's mintues active data
    ${activity.getDayData("2019/06/15", user.userData.id).minutesActive}
    Today's distance walked data
    ${activity.walkedMilesPerDay("2019/06/15", user.userData.id)}
  </p>
  `
}

function displayWeeklyActivity() {
  let weeklyActivity = document.querySelector('.weekly-activity-card')
  weeklyActivity.innerHTML +=
  `<h2>Activity Data For The Week</h2>
  <p> Weekly Activity Data:
    Weekly step data
    ${activity.weeklyActivityProperties("2019/06/15", user.userData.id, 'numSteps')}
    Weekly mintues active data
    ${activity.weeklyActivityProperties("2019/06/15", user.userData.id, 'minutesActive')}
    Weekly flights of stairs climbed data
    ${activity.weeklyActivityProperties("2019/06/15", user.userData.id, 'flightsOfStairs')}
  </p>
  `
}

function compareDayActivity() {
  let compareDayActivity = document.querySelector('.comparison-activity-card')
  let activityFindAllUsers = activity.findDayActivity("2019/06/15")
  compareDayActivity .innerHTML +=
  `<h2>Activity Data For The Day Compared To All Users</h2>
  <p> Daily Activity Data Comparison:
    Average step data compared to all users
    Your Average ${activity.averageWeeklyMinutes("2019/06/15", user.userData.id, "numSteps")}
    All Users Average ${activityFindAllUsers.numSteps}</br>
    Average mintues active data compared to all users
    Your Average ${activity.averageWeeklyMinutes("2019/06/15", user.userData.id, "minutesActive")}
    All Users Average ${activityFindAllUsers.minutesActive}</br>
    Average flights of stairs climbed data compared to all users
    Your Average ${activity.averageWeeklyMinutes("2019/06/15", user.userData.id, "flightsOfStairs")}
    All Users Average ${activityFindAllUsers.flightsOfStairs}
  </p>
  `
}

function hydrationGraph(hydrationData) {
  let hydrationChart = new CanvasJS.Chart("chartContainer", {
    title:{
      text: "Your Weekly Hydration Data in Ounces"
    },
    data: [
      {
      // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: hydrationData[0].date,  y: hydrationData[0].ounces },
          { label: hydrationData[1].date,  y: hydrationData[1].ounces },
          { label: hydrationData[2].date,  y: hydrationData[2].ounces },
          { label: hydrationData[3].date,  y: hydrationData[3].ounces },
          { label: hydrationData[4].date,  y: hydrationData[4].ounces },
          { label: hydrationData[5].date,  y: hydrationData[5].ounces },
          { label: hydrationData[6].date,  y: hydrationData[6].ounces }
        ]
      }
    ]
  });
  hydrationChart.render();
}

function sleepGraph(sleepData) {
  let sleepQualityChart = new CanvasJS.Chart("sleepChartContainer", {
    title:{
      text: "Your Weekly Sleep Quality Data"
    },
    data:[
      {
        type: "column",
        dataPoints: [
          { label: sleepData[0].date, y: sleepData[0].sleepQuality },
          { label: sleepData[1].date, y: sleepData[1].sleepQuality },
          { label: sleepData[2].date, y: sleepData[2].sleepQuality },
          { label: sleepData[3].date, y: sleepData[3].sleepQuality },
          { label: sleepData[4].date, y: sleepData[4].sleepQuality },
          { label: sleepData[5].date, y: sleepData[5].sleepQuality },
          { label: sleepData[6].date, y: sleepData[6].sleepQuality  }
        ]
      }
    ]
  });
  sleepQualityChart.render();
}
