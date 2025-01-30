import request, { Test } from "supertest"
import server from "../src/server"
import express, {Response} from "express"

describe("POST /auth", () => {

let app_:express.Application;


 beforeAll(async () => {
	app_ = server.getServer()
 })

  afterAll(async () => {
   app_ = server.closeServer()
   jest.clearAllTimers();
})

//test for the login route

	it("should return a 200 status code if the login is successful", async () => {

		const response = await request(app_)
		.post("/api/v1/auth/login")
		.send({
			email: "test5@gmail.com",
			password: "game123#",
		})

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("name")
	}, 40000)

    it("should return a 400 status code if is an invalid user", async () => {
        const response = await request(app_)
		.post("/api/v1/auth/login")
		.send({
			email: "adenirandaniel585@gmail.com",
			password: "polish16#",
		})
        
        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({message: "Wrong credentials provided", statusCode: 500})    
    })

//test for the register route

    it("should return a 200 status code if the registration is successful", async () => {

        const response = await request(app_)
        .post("/api/v1/auth/register")
        .send({
            email: "test5@gmail.com",
            password: "game123#",
            
            name: "titi"
        })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data")

    }, 40000)

    beforeEach(() => {
        const mockResponse = {
            status: 500,
            body: { message: "User with that email already exists", statusCode: 500 },
        } as unknown as Test;

        jest.spyOn(request(app_).post("/api/v1/auth/register"), 'send').mockResolvedValue(mockResponse);
    })

    it("should return a 400 status code if the user already exists", async () => {

          // Mock the request and response

    // Use jest.spyOn to mock the request

        const response = await request(app_)
        .post("/api/v1/auth/register")
        .send({
            email: "test@gmail.com",
            password: "polish416#",
            name: "titi",
        })
        expect(response.body).toHaveProperty("message")
    })

})

// //test for the product route where we use the token to authenticate the user