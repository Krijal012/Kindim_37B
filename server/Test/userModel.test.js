const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define("User", {
    id: 1,
    username: "Test User",
    email: "test@gmail.com",
    password: "password123",
    role: "customer"
});

describe("User Model", () => {
    it("should create a user", async () => {
        const user = await UserMock.create({
            username: "New User",
            email: "new@gmail.com",
            password: "newpassword",
            role: "customer"
        });

        expect(user.username).toBe("New User");
        expect(user.email).toBe("new@gmail.com");
        });
    });