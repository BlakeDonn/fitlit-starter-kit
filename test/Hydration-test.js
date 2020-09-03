const chai = require("chai");
const expect = chai.expect;
const Hydration = require("../src/Hydration")

describe("Hydration", () => {
  let sampleHydrationData, hydration, filterUser1, filterUser2, weeklyData;
  beforeEach(() => {
    sampleHydrationData = [ {
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numOunces": 69
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numOunces": 96
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "numOunces": 61
    },
    {
      "userID": 1,
      "date": "2019/06/19",
      "numOunces": 91
    },
    {
      "userID": 1,
      "date": "2019/06/20",
      "numOunces": 50
    },
    {
      "userID": 1,
      "date": "2019/06/21",
      "numOunces": 50
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "numOunces": 91
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "numOunces": 96
    },
    ]
    filterUser1 = sampleHydrationData.slice(0, 7);
    filterUser2 = sampleHydrationData.slice(7, 10);
    hydration = new Hydration(sampleHydrationData);
  });

  it.skip("should be a function", () => {
    expect(Hydration).to.be.a("function")
  });

  it.skip("should be an instance of Hydration", () => {
    expect(hydration).to.be.an.instanceof(Hydration)
  });

  it.skip("should store user hydration data", () => {
    expect(hydration.userHydrationData(1)).to.be.deep.equal(filterUser1);
  });

  it.skip("should store another users data", () => {
    expect(hydration.userHydrationData(2)).to.be.deep.equal(filterUser2);
  });

  it.skip("should return average all-time ounces per a user", () =>{
    expect(hydration.averageAllTimeOunces(1)).to.be.equal(65)
  });

  it.skip("should should return ounces for a specified day", () =>{
    expect(hydration.dayOunces(1, "2019/06/16").numOunces).to.equal(69)
  });

  it.skip("should return daily ounces over 7 day period", () => {
    let weeklyHydration = hydration.weeklyHydrationProperties(1, "2019/06/21")
    expect(weeklyHydration).to.deep.equal(sampleHydrationData.slice(0, 7))
  });

});
