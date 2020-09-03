class Hydration {
  constructor(hydrationSet) {
    this.hydrationSet = hydrationSet
    this.date = this.hydrationSet[this.hydrationSet.length - 1].date;
  }

  userHydrationData(id) {
    return this.hydrationSet.filter(dailyHydration => dailyHydration.userID === id);
  }

  dayOunces(id, dateSelected) {
    if (!dateSelected) {
      dateSelected = this.date;
    }
    return this.hydrationSet.find(day => day.date === dateSelected && day.userID === id);
  }

  weeklyHydrationProperties(id, dateSelected) {
    if (!dateSelected) {
      dateSelected = this.date;
    }
    let lastDayInWeek = this.dayOunces(id, dateSelected);
    let indexOfLastDay = this.userHydrationData(id).indexOf(lastDayInWeek);
    return this.userHydrationData(id).slice(indexOfLastDay - 6, indexOfLastDay + 1);
  }

  averageAllTimeOunces(id) {
    let userHydration = this.userHydrationData(id)
    let allTimeOunces = userHydration.reduce((ounces, day) =>{
      return ounces += day.numOunces;
    }, 0)
    return Math.round(allTimeOunces / userHydration.length);
  }
  
}
if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
