const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));
afterAll(() => db.end())

describe("/api/topics", () => {
    test(`Get 200 and an array of topic objects. 
    Each should have the following properties of slug and description`, () => {
        return request(app).get("/api/topics").expect(200)
        .then((res) => {
            const topics = res.body
            expect(topics.length).toBe(3)
            topics.forEach((topic) => {
                expect(topic.hasOwnProperty('slug')).toBe(true)
                expect(topic.hasOwnProperty('description')).toBe(true)
            })
        })
    })
})


