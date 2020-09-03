class Sleep {
  constructor(sleepSet) {
    this.sleepSet = sleepSet;
    this.date = this.sleepSet[this.sleepSet.length - 1].date;
  }
  userSleepData(id) {
    return this.sleepSet.filter(dailySleep => dailySleep.userID === id);
  }
  daySleep(id, startingDate ) {
    if(!startingDate) {
      startingDate = this.date;
    }
    return this.sleepSet.find(day => day.date === startingDate && day.userID === id);
  }
  weeklySleepProperties(id, startingDate) {
    if (!startingDate) {
      startingDate = this.date;
    }
    let lastDayInWeek = this.daySleep(id, startingDate)
    let indexOfLastDay = this.userSleepData(id).indexOf(lastDayInWeek);
    return this.userSleepData(id).slice(indexOfLastDay - 6, indexOfLastDay + 1)
  }
  averageAllTimeSleep(id, property) {
    let getUserData = this.userSleepData(id)
    let allTimeSleep = getUserData.reduce((sleep, day) =>{
      return sleep += day[property];
    }, 0)
    return Math.round((allTimeSleep / getUserData.length) * 10) / 10
  }
  averageSleepQuality() {
    let average = this.sleepSet.reduce((quality, user) => {
      return quality += user.sleepQuality;
    }, 0)
    return Math.round(average / this.sleepSet.length * 10) / 10;
  }
  sleepQualityAboveThree(startingDate) {
    if (!startingDate) {
      startingDate = this.date
    }
    let qualityAboveThree = [];
    let uniqueIds = Array.from(new Set(this.sleepSet.map(user => user.userID)))
    uniqueIds.forEach(id => {
      let usersSleepQuality = this.weeklySleepProperties(id, startingDate).map(daySleep => daySleep.sleepQuality);
      let totalQuality = usersSleepQuality.reduce((quality, currentQuality ) =>{
        return quality += currentQuality
      });
      if (totalQuality / 7 > 3) {
        qualityAboveThree.push(id)
      }
    })
    return qualityAboveThree
  }
  userWhoSleptTheMost(startingDate) {
    if (!startingDate) {
      startingDate = this.date
    }
    let sleepDataPerDay = this.sleepSet.filter(user => user.date === startingDate);
    let topSleeper = sleepDataPerDay.sort((a, b) => b.hoursSlept - a.hoursSlept);
    return topSleeper[0].userID;
  }
  userWhoSleptTheLeast(startingDate) {
    if (!startingDate) {
      startingDate = this.date
    }
    let sleepDataPerDay = this.sleepSet.filter(user => user.date === startingDate);
    let topSleeper = sleepDataPerDay.sort((a, b) => a.hoursSlept - b.hoursSlept);
    return topSleeper[0].userID;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
