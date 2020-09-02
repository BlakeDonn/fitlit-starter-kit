// const UserRepository = require("./UserRepository")
// const userData = require("../data/users")
// const userRepository = new UserRepository([userData[0],userData[1]]);
// const activityData = require("../data/activity")

class Activity {
  constructor(activitySet) {
    this.activitySet = activitySet;
    this.date = this.activitySet[this.activitySet.length - 1].date;
  }
  getUserID(id) {
    return userRepository.returnUserData(id);
  }
  userActivityData(id) {
    return this.activitySet.filter(dailySleep => dailySleep.userID === id)
  }
  dayData(id, dateSelected) {
    if(!dateSelected) {
      dateSelected = this.date
    }
    return this.activitySet.find(day => day.date === dateSelected && day.userID === id);
  }
  weeklyActivityProperties(id, dateSelected) {
    if(!dateSelected) { 
      dateSelected = this.date
    }
    let lastDayInWeek = this.dayData(id, dateSelected);
    let indexOfLastDay = this.userActivityData(id).indexOf(lastDayInWeek);
    return this.userActivityData(id).slice(indexOfLastDay - 6, indexOfLastDay + 1)
  }
  dailyMilesWalked(id, dateSelected) {
    if(!dateSelected) {
      dateSelected = this.date
    }
    let userSet = this.dayData(id, dateSelected)
    let userStrideLength = this.getUserID(id).strideLength;
    return Math.round((userSet.numSteps * userStrideLength / 5280) * 10) / 10;
  }
  minutesActivePerDay(id, dateSelected) {
    return this.dayData(id, dateSelected).minutesActive;
  }
  averageAverageProperty(id, property, dateSelected)  {
    let weeklyActivity = this.weeklyActivityProperties(id, dateSelected, property)
    return Math.round((weeklyActivity.reduce((allMinutes, minute) => allMinutes + minute, 0) / 7) * 10) / 10;
  }
  stepGoalAchieved(id, dateSelected) {
    let userStepGoal = this.getUserID(id).dailyStepGoal;
    let dailySteps = this.dayData(id, dateSelected).numSteps;
    return dailySteps >= userStepGoal;
  }
  daysStepGoalAchieved(id) {
    let usersActivityData = this.activitySet.filter(day => {
      return day.userID === id && this.stepGoalAchieved(day.date, day.userID);
    })
    return usersActivityData.map(day => day.date);
  }
  findStairRecord(id) {
    let userActivityData =  this.activitySet.filter(day => day.userID === id)
    return userActivityData.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0].flightsOfStairs
  }
  findDayActivity(dateSelected) {
    let allUsers = this.activitySet.filter(day => day.date === dateSelected);
    let dayData = allUsers.reduce((allData, userDay)=>{
      allData.numSteps += userDay.numSteps
      allData.minutesActive += userDay.minutesActive
      allData.flightsOfStairs += userDay.flightsOfStairs
      return allData
    }, {numSteps: 0, minutesActive: 0, flightsOfStairs: 0})
    Object.keys(dayData).forEach(key => dayData[key] = Math.round(dayData[key] / allUsers.length))
    return dayData
  }
  weeklyStepGoal(id, property, dateSelected) {
    let weeklyAverage = this.averageAverageProperty(id, property, dateSelected)
    return weeklyAverage >= this.getUserID(id).dailyStepGoal
  }
  consecutiveDays(id) {
      let perUser = this.activitySet.filter(user => user.userID === id);
      let consecDays = [];
      perUser.forEach((day, i) => {
        if (i < 2 ) {
          return
        }
        if (day.numSteps > perUser[i - 1].numSteps &&
        perUser[i - 1].numSteps > perUser[i - 2].numSteps) {
          consecDays.push({date: day.date, steps: day.numSteps})
      }
  })
      return consecDays;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
