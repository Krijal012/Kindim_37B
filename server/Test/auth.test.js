const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define("User", {
    id: 1,
    username: "testuser",
    password: "testpassword",
    role: "user",
});

describe("User Model", () => {
    it("should create a user", async () => {
        const user = await UserMock.create({
            username: "testuser",
            password: "testpassword",
            role: "user",
        })

        expect(user.username).toBe("testuser");
        expect(user.password).toBe("testpassword");
        expect(user.role).toBe("user");
    });
});