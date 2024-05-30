import request from "supertest";
/*
API Tests
*/

describe("API Endpoints", () => {
  let req;
  beforeEach(() => {
    req = request.agent('http://localhost:3000');
  });

  afterEach(async () => {
    // await req.post('/api/reset').send()
  });

  it("GET /api/schedule returns 200 with programs", async () => {
    const response = await req.get("/api/schedule");
    console.log('response.programs',response.body);
    expect(response.statusCode).toBe(200);
  });

});