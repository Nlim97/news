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
describe("/api", () => {
    test(`Get 200 and a JSON object containing all the endpoint's 
     queries, description, request body format and a response example`, () => {
        return request(app).get("/api").expect(200)
        .then((res) => {
            const endpoints = res.body
            expect(typeof endpoints).toBe('object')
            for(const endpoint in endpoints.parsedData){
                expect(typeof endpoints.parsedData[endpoint].description).toBe('string');
                expect(typeof endpoints.parsedData[endpoint].queries).toBe('object');
                expect(typeof endpoints.parsedData[endpoint].exampleResponse).toBe('object');
                
            }
        })
     })
})
describe("/api/articles/:article_id", () => {
    test(`Get 200 an an article object containing the following properties: 
    author, title, article_id, body, topic, created_at, votes, article_img_url`, () => {
        return request(app).get("/api/articles/2").expect(200)
        .then((res) => {
            const  {article } = res.body
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.title).toBe("string");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.author).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.body).toBe('string');
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
        })
    })
    test('Get 400 and a message for bad request if the the id is invalid', () => {
        return request(app).get("/api/articles/abcd").expect(400)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('Bad request')
        })
    })
    test('Get 404 and a message of no article found if the id is a number but not a valid article_id', () => {
        return request(app).get("/api/articles/9999999").expect(404)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('article does not exist')
        })
    })
})
describe('/api/articles', () => {
    test('Get 200 an check if the articles are order by created_at in descending order', () => {
        return request(app).get('/api/articles?order=desc').expect(200)
        .then((res) => {
            const { articles } = res.body
            expect(articles.length).toBe(13)
            articles.forEach((article) => {
                expect(typeof article.author).toBe('string');
                expect(typeof article.title).toBe("string");
                expect(typeof article.article_id).toBe("number");
                expect(typeof article.topic).toBe("string");
                expect(typeof article.created_at).toBe("string");
                expect(typeof article.votes).toBe("number");
                expect(typeof article.article_img_url).toBe("string");
                expect(typeof article.comment_count).toBe('string');
                expect(articles).toBeSortedBy('created_at', { descending: true });
            })
        })
    })
})
describe('/api/articles/:article_id/comments', () => {
    test('200 with all the comment in ascending order related to the article.article_id', () => {
        return request(app).get('/api/articles/3/comments').expect(200)
        .then((res) => {
            const comments = res.body
            expect(comments.length).toBe(2)
            expect(comments).toBeSortedBy('created_at', { ascending: true })
            comments.forEach((comment) => {
                expect(typeof comment.comment_id).toBe('number')
                expect(typeof comment.votes).toBe('number')
                expect(typeof comment.created_at).toBe('string')
                expect(typeof comment.author).toBe('string')
                expect(typeof comment.body).toBe('string')
                expect(typeof comment.article_id).toBe('number')
            })
        })
    })
    test(`404 with a message of 'Article does not exist' if a numerical value does not match with any artist_id`, () => {
        return request(app).get('/api/articles/99999/comments').expect(404)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('Article does not exist')
        })
    })
    test(`400 with a message of 'Bad request' if an invalid article_id is provided`, () => {
        return request(app).get('/api/articles/abcd/comments').expect(400)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('Bad request')
        })
    })
})



