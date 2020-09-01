class Sleep {
  constructor(sleepSet) {
    this.sleepSet = sleepSet
  }
  userSleepData(id) {
    return this.sleepSet.filter(dailySleep => dailySleep.userID === id);
  }
  averageAllTimeSleep(id, property) {
    let getUserData = this.userSleepData(id)
    let allTimeSleep = getUserData.reduce((sleep, day) =>{
      return sleep += day[property];
    }, 0)
    return Math.round((allTimeSleep / getUserData.length) * 10) / 10
  }
  daySleep(dateSelected, id) {
    let dayData = this.sleepSet.find(day => day.date === dateSelected && day.userID === id);
    return dayData
  }
  weeklySleepProperties(dateSelected, id,) {
    let startingDate = this.daySleep(dateSelected, id);
    let firstDay = this.userSleepData(id).indexOf(startingDate);
    return this.userSleepData(id).slice(firstDay - 6, firstDay + 1).map(day => ({date: day.date, hoursSlept: day.hoursSlept,  sleepQuality: day.sleepQuality}))

  }
  averageSleepQuality() {
    let average = this.sleepSet.reduce((quality, user) => {
      return quality += user.sleepQuality;
    }, 0)
    return Math.round(average / this.sleepSet.length * 10) / 10;
  }

  sleepQualityAboveThree(date) {
    let qualityAboveThree = [];
    let uniqueIds = Array.from(new Set(this.sleepSet.map(user => user.userID)))
    uniqueIds.forEach(id => {
      let usersSleepQuality = this.weeklySleepProperties(date, id).map(daySleep => daySleep.sleepQuality);
      let totalQuality = usersSleepQuality.reduce((quality, currentQuality ) =>{
        return quality += currentQuality
      });
      if (totalQuality / 7 > 3) {
        qualityAboveThree.push(id)
      }
    })
    return qualityAboveThree
  }

  userWhoSleptTheMost(targetDate) {
    let sleepDataPerDay = this.sleepSet.filter(user => user.date === targetDate);
    let topSleeper = sleepDataPerDay.sort((a, b) => b.hoursSlept - a.hoursSlept);
    return topSleeper[0].userID;
  }

  userWhoSleptTheLeast(targetDate) {
    let sleepDataPerDay = this.sleepSet.filter(user => user.date === targetDate);
    let topSleeper = sleepDataPerDay.sort((a, b) => a.hoursSlept - b.hoursSlept);
    return topSleeper[0].userID;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
