const chai = require("chai");
const expect = chai.expect;
const UserRepository = require("../src/UserRepository")

describe("UserRepository", () => {
  let user1, user2, user3;
  let userRepository;
  beforeEach(() => {
    user1 =  {
      "id": 1,
      "name": "Luisa Hane",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
    },
    user2 =  {
      "id": 2,
      "name": "Jarvis Considine",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
    },
    user3 =  {
      "id": 3,
      "name": "Herminia Witting",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
    },
    userRepository = new UserRepository([user1, user2, user3]);
  });

  it.skip("should be a function", () => {
    expect(UserRepository).to.be.a("function")
  });

  it.skip("should be an instance of UserRepository", () => {
    expect(userRepository).to.be.an.instanceOf(UserRepository)
  });

  it.skip("should store user data", () => {
    expect(userRepository.userData[0]).to.deep.equal(user1)
  });

  it.skip("should return a user given an id", () => {
    expect(userRepository.returnUserData(user1.id)).to.be.equal(user1)
  });

  it.skip("should average step goal amongst all users", () => {
    expect(Math.round(userRepository.getAvgStepGoal())).to.be.equal(6667)
  });
})
