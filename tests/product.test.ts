import request from "supertest"
import server from "../src/server"
import express, {Response} from "express"


describe("POST /product", () => {

        let app_:express.Application;


        beforeAll(async () => {
            app_ = server.getServer()

        })

        afterAll(async () => {
        app_ = server.closeServer()
        jest.clearAllTimers();
        })

    it("should return a 200 status code of all products from the store if the user is authenticated", async () => {

        const response = await request(app_)
        .get("/api/v1/products")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWJmZDE1MmUzZDdkNWNlMzY2ZGFmMCIsIm5hbWUiOiJkYW4gdGVzdCIsImlhdCI6MTczODI3NjExNywiZXhwIjoxNzM4MzYyNTE3fQ.9rHM61stEIYtS_ku93nT3vPaKKns5yBVUaQKKQpihRA")

        console.log("response", response.body)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty("message")

    })

    it("should return a 200 status code of a single product from the store if the user is authenticated", async () => {

        const response = await request(app_)
        .get("/api/v1/products/679bbddcba47930f65947fc6")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWJmZDE1MmUzZDdkNWNlMzY2ZGFmMCIsIm5hbWUiOiJkYW4gdGVzdCIsImlhdCI6MTczODI3NjExNywiZXhwIjoxNzM4MzYyNTE3fQ.9rHM61stEIYtS_ku93nT3vPaKKns5yBVUaQKKQpihRA")

        console.log("response", response.body)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty("message")
    })

    it("should return a 200 status code if the product is created from the store", async () => {

        const response = await request(app_)
        .post("/api/v1/products/create")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWJmZDE1MmUzZDdkNWNlMzY2ZGFmMCIsIm5hbWUiOiJkYW4gdGVzdCIsImlhdCI6MTczODI3NjExNywiZXhwIjoxNzM4MzYyNTE3fQ.9rHM61stEIYtS_ku93nT3vPaKKns5yBVUaQKKQpihRA")
        .send({
            name: "iphone11 pro",
            description: "mobile gadget",
            price: 53009
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty("message")

    })

    it("should return a 200 status code if the product is updated from the store", async () => {

        const response = await request(app_)
        .patch("/api/v1/products/679bbbac7e97598476d96d4e")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWJmZDE1MmUzZDdkNWNlMzY2ZGFmMCIsIm5hbWUiOiJkYW4gdGVzdCIsImlhdCI6MTczODI3NjExNywiZXhwIjoxNzM4MzYyNTE3fQ.9rHM61stEIYtS_ku93nT3vPaKKns5yBVUaQKKQpihRA")
        .send({
            name: "iphone11 pro",
            description: "edited mobile gadget",
            price: 53009
        })

        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty("message")
    })

    it("should return a 200 status code if the product is deleted from the store", async () => {

        const response = await request(app_)
        .delete("/api/v1/products/679bbbc7464a25359b9135ec")
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWJmZDE1MmUzZDdkNWNlMzY2ZGFmMCIsIm5hbWUiOiJkYW4gdGVzdCIsImlhdCI6MTczODI3NjExNywiZXhwIjoxNzM4MzYyNTE3fQ.9rHM61stEIYtS_ku93nT3vPaKKns5yBVUaQKKQpihRA")
        
        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty("message")
        
    })

    //when the user is not authenticated

    it("should return a 401 status code if the user is not authenticated", async () => {

        const response = await request(app_)
        .get("/api/v1/products")

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message")
    })

    it("should return a 401 status code if the user is not authenticated", async () => {

        const response = await request(app_)
        .get("/api/v1/products/679bbddcba47930f65947fc6")

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message")
    })


    it("should return a 401 status code if the user is not authenticated", async () => {

        const response = await request(app_)
        .post("/api/v1/products/create")
        .send({
            name: "iphone11 pro",
            description: "mobile gadget",
            price: 53009
        })

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message")
    })

    it("should return a 401 status code if the user is not authenticated", async () => {

        const response = await request(app_)
        .patch("/api/v1/products/679bbbac7e97598476d96d4e")
        .send({
            name: "iphone11 pro",
            description: "edited mobile gadget",
            price: 53009
        })

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message")
    })

    it("should return a 401 status code if the user is not authenticated", async () => {

        const response = await request(app_)
        .delete("/api/v1/products/679bbbac7e97598476d96d4e")

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message")
    })

});
