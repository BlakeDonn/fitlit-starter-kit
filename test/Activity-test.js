const chai = require("chai");
const expect = chai.expect;
const Activity = require("../src/Activity");
describe("Activity", () => {
  let activity, sampleActivtyData
  beforeEach(() => {
    sampleActivtyData =
    [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 6637,
        "minutesActive": 175,
        "flightsOfStairs": 36
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 14329,
        "minutesActive": 168,
        "flightsOfStairs": 18
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 4419,
        "minutesActive": 165,
        "flightsOfStairs": 33
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numSteps": 8429,
        "minutesActive": 275,
        "flightsOfStairs": 2
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numSteps": 14478,
        "minutesActive": 140,
        "flightsOfStairs": 12
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numSteps": 6760,
        "minutesActive": 135,
        "flightsOfStairs": 6
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "numSteps": 4112,
        "minutesActive": 220,
        "flightsOfStairs": 37
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "numSteps": 13750,
        "minutesActive": 65,
        "flightsOfStairs": 4
      },
      {
        "userID": 2,
        "date": "2019/06/18",
        "numSteps": 4662,
        "minutesActive": 181,
        "flightsOfStairs": 31
      },
      {
        "userID": 2,
        "date": "2019/06/19",
        "numSteps": 9858,
        "minutesActive": 243,
        "flightsOfStairs": 44
      },
      {
        "userID": 2,
        "date": "2019/06/20",
        "numSteps": 8153,
        "minutesActive": 74,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/21",
        "numSteps": 10225,
        "minutesActive": 174,
        "flightsOfStairs": 26
      },
    ]  
    activity = new Activity(sampleActivtyData);
  });

  it.skip("should be a function", () => {
    expect(Activity).to.be.a("function");
  });

  it.skip("should be an instance of Activity", () => {
    expect(activity).to.be.an.instanceof(Activity);
  });

  it.skip("should return minutes active for specific day", () => {
    expect(activity.minutesActivePerDay(1, "2019/06/15")).to.be.equal(140);
  });

  it.skip("should return average minutes active for the most recent week", () => {
    expect(activity.averageWeeklyProperty( 1, 'minutesActive')).to.be.equal(171.1);
  });

  it.skip("should return average minutes active for a specific week", () => {
    expect(activity.averageWeeklyProperty( 1, 'minutesActive', "2019/06/21")).to.be.equal(171.1);
  });

  it.skip("should find a users all-time stair climbing record ", () => {
    expect(activity.findStairRecord(1)).to.be.equal(36);
  });

  it.skip("should find all users average stairs climbed, steps taken, minutes active, for specific date", () => {
    expect(activity.allUserAverage("2019/06/17")).to.be.deep.equal({
      "numSteps": 14040,
      "minutesActive": 117,
      "flightsOfStairs": 11
    });
  });

  /*
  ******FOR THE BELOW TESTS*****
  add the following above line 1 of the Activity.js file to emulate scripts being linked

  const UserRepository = require("./UserRepository")
  const userRepository = new UserRepository([
    {
    "id": 1,
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
  },
  {
    "id": 2,
    "strideLength": 4.5,
    "dailyStepGoal": 5000,
  },
  ]);

  */
  it.skip("should check if user reached step goal for specific day", () => {
    expect(activity.assessStepGoal(1, "2019/06/15")).to.be.equal(false);
  });

  it.skip("should check if user reached step goal for specific day", () => {
    expect(activity.assessStepGoal(1, "2019/06/20")).to.be.equal(true);
  });

  it.skip("should find all days where they reach step goal ", () => {
    expect(activity.daysOverStepGoal(1)).to.be.deep.equal(["2019/06/17", "2019/06/20"]);
  });

  it.skip("should return if a user achieved step goal for the week ", () => {
    expect(activity.weeklyStepGoal(1, 'numSteps', "2019/06/15", )).to.be.equal(false);
  });

  it.skip("should calculate 3+ days of consecutive step increases", () => {
    expect(activity.consecutiveDays(1)).to.deep.equal([sampleActivtyData.slice(0, 3), sampleActivtyData.slice(3, 6)]);
  });

});

