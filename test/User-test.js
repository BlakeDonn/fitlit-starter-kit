const chai = require("chai");
const expect = chai.expect;
const User = require("../src/User")
const UserRepository = require("../src/UserRepository")

describe("User", () => {
  let user1, user;
  beforeEach(() => {
    user1 =  {
      "id": 1,
      "name": "Luisa Hane",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
    },
    userRepository = new UserRepository([user1]);
    user = new User(userRepository.userData[0]);
  });

  it.skip("should be a function", () => {
    expect(User).to.be.a("function")
  });

  it.skip("should instance of User", () => {
    expect(user).to.be.an.instanceOf(User)
  });

  it.skip("should store a user data", () => {
    expect(user.userData).to.be.equal(userRepository.userData[0])
  });

  it.skip("should returns a user first name only", () => {
    expect(user.returnFirstName()).to.be.equal("Luisa")
  });
})
