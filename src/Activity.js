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
  averageWeeklyProperty(id, property, dateSelected)  {
    let weeklyActivity = this.weeklyActivityProperties(id, dateSelected, property)
    return Math.round((weeklyActivity.reduce((combinedActivity, activity) => combinedActivity + activity, 0) / 7) * 10) / 10;
  }
  assessStepGoal(id, dateSelected) {
    let userStepGoal = this.getUserID(id).dailyStepGoal;
    let dailySteps = this.dayData(id, dateSelected).numSteps;
    return dailySteps >= userStepGoal;
  }
  calculateStreaks(id) {
    let usersActivityData = this.activitySet.filter(day => {
      return day.userID === id && this.assessStepGoal(day.date, day.userID);
    })
    return usersActivityData.map(day => day.date);
  }
  findStairRecord(id) {
    let userActivityData =  this.activitySet.filter(day => day.userID === id)
    return userActivityData.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0].flightsOfStairs
  }
  allUserAverage(dateSelected) {
    if (!dateSelected) {
      dateSelected = this.date
    }
    let allUsers = this.activitySet.filter(day => day.date === dateSelected);
    let allAverage = allUsers.reduce((allData, userDay)=> {
      allData.numSteps += userDay.numSteps
      allData.minutesActive += userDay.minutesActive
      allData.flightsOfStairs += userDay.flightsOfStairs
      return allData
    }, {numSteps: 0, minutesActive: 0, flightsOfStairs: 0})
    Object.keys(allAverage).forEach(key => allAverage[key] = Math.round(allAverage[key] / allUsers.length))
    return allAverage
  }
  weeklyStepGoal(id, property, dateSelected) {
    let weeklyAverage = this.averageWeeklyProperty(id, property, dateSelected)
    return weeklyAverage >= this.getUserID(id).dailyStepGoal
  }
  consecutiveDays(id) {
    let userActivityData = this.userActivityData(id);
    let streakDays = [];
    userActivityData.forEach((day, i) => {
      if (i < 2 ) {
        return
      }
      if (day.numSteps > userActivityData[i - 1].numSteps &&
        userActivityData[i - 1].numSteps > userActivityData[i - 2].numSteps) {
        streakDays.push({date: day.date, steps: day.numSteps})
      }
    })
    return streakDays;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
