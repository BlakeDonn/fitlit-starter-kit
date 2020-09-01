class HydrationRepository {
  constructor(hydrationSet) {
    this.hydrationSet = hydrationSet
  }
  userHydrationData(id) {
    return this.hydrationSet.filter(dailyHydration => dailyHydration.userID === id);
  }
  averageAllTimeOunces(id) {
    let userHydration = this.userHydrationData(id)
    let allTimeOunces = userHydration.reduce((ounces, day) =>{
      return ounces += day.numOunces;
    }, 0)
    return Math.round(allTimeOunces / userHydration.length);
  }
  dayOunces(dateSelected, id) {
    return this.hydrationSet.find(day => day.date === dateSelected && day.userID === id);
  }
  weeklyActivityProperties(dateSelected, id) {
    let startingDate = this.dayOunces(dateSelected, id);
    let firstDay = this.userHydrationData(id).indexOf(startingDate);
    return this.userHydrationData(id).slice(firstDay - 6, firstDay + 1).map(day => ({date: day.date, numOunces: day.numOunces,}))
  }
}
if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}
