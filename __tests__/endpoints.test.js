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
    test(`201 with a response object of the posted comment`, () => {
        const sentComment = {
            username: `lurker`,
            body: `I like krabby patties`
        };
        return request(app)
        .post("/api/articles/3/comments").send(sentComment)
        .expect(201)
        .then((res) => {
            const { newComment } = res.body
            expect(typeof newComment.body).toBe('string')
            expect(typeof newComment.author).toBe('string')
            expect(typeof newComment.article_id).toBe('number')
            expect(typeof newComment.votes).toBe('number')
            expect(typeof newComment.created_at).toBe('string')
        })
    })
    test(`404 with a message of Author not found if username is not valid`, () => {
        const sentComment = {
            username: `spondebob`,
            body: `I like krabby patties`
        };
        return request(app)
        .post("/api/articles/3/comments").send(sentComment)
        .expect(404)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('Author not found')
        })
    })
})
describe('Patch: /api/articles/:article_id', () => {
    test(`200 and a article object with the votes updated in regards to the patch object being sent`, () => {
        const patchObj = {
            inc_votes: 5
        }
        return request(app).patch('/api/articles/2').send(patchObj)
        .expect(200)
        .then((res) => {
            const { article } = res.body
            expect(article.article_id).toBe(2)
            expect(article.votes).toBe(5)
        })
    })
    test('200 and a article object with the votes decreased', () => {
        const patchObj = {
            inc_votes: -50
        }
        return request(app).patch('/api/articles/1').send(patchObj)
        .expect(200)
        .then((res) => {
            const { article } = res.body
            expect(article.article_id).toBe(1)
            expect(article.votes).toBe(50)
        })
    })
    test(`404 with message 'Article does not exist' if a number is provided but is an invalid article_id`, () => {
        const patchObj = {
            inc_votes: 5
        }
        return request(app).patch('/api/articles/9999').send(patchObj)
        .expect(404)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('Article does not exist')
        })
    })
    test(`400 with message "Bad request" if an invalid article_id is provided i.e. abcd`, () => {
        const patchObj = {
            inc_votes: 5
        }
        return request(app).patch('/api/articles/abcd').send(patchObj)
        .expect(400)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('Bad request')
        })
    })
    test(`400 with message "Bad request" if inc_votes is not a number`, () => {
        const patchObj = {
            inc_votes: 'abc'
        }
        return request(app).patch('/api/articles/abcd').send(patchObj)
        .expect(400)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toBe('Bad request')
        })
    })
    
})
describe(`delete  /api/comments/:comment_id`, () => {
    test(`204 with no content after the comment has been deleted`, () => {
        return request(app).delete(`/api/comments/2`).expect(204)
        .then((res) => {
            expect(res.body).toEqual({})
        })
    })
    test('404 with a message of no user found', () => {
        return request(app).delete(`/api/comments/99999`).expect(404)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toEqual('No comment found with that id')
        })
    })
    test(`400 with a message of Bad request`, () => {
        return request(app).delete(`/api/comments/abcd`).expect(400)
        .then((res) => {
            const { msg } = res.body
            expect(msg).toEqual('Bad request')
        })
    })
})
describe("/api/users", () => {
    test(`Get 200 and an array of user objects. 
    Each should have the following properties of username, name and avatar_url`, () => {
        return request(app).get("/api/users").expect(200)
        .then((res) => {
            const users = res.body
            expect(users.length).toBe(4)
            users.forEach((user) => {
                expect(typeof user.username).toBe('string')
                expect(typeof user.name).toBe('string')
                expect(typeof user.avatar_url).toBe('string')
            })
        })
    })
})





