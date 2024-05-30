import * as db from "../lib/db.mjs"
/*
Run these with `npm run test-db`
*/

describe("database", () => {
  afterEach(async () => {
    await db.clear();
  });

  it("CreateProgram", async () => {
    const newProgram = {id: 0, location: 'Toronto', programName: 'abc', programId: 123, rating: 5.0, startDay: 'today', nextSession: 'tmr', confirmed: 1, lastNumber: 1, capacity: 2, sessionsAfterToday: 10, notes: 'notes'};
    await db.createProgram(newProgram);
    
    const program = await db.getProgramByName("abc");
    // expect(program.length).toEqual(1);
    expect(program).toEqual(
      jasmine.objectContaining(newProgram)
    );
  });

  it("Check getPrograms", async () => {
    const newProgram_1 = {id: 0, location: 'Toronto', programName: 'abc', programId: 123, rating: 5.0, startDay: 'today', nextSession: 'tmr', confirmed: 1, lastNumber: 1, capacity: 2, sessionsAfterToday: 10, notes: 'notes'};
    const newProgram_2 = {id: 0, location: 'Toronto', programName: 'cba', programId: 123, rating: 5.0, startDay: 'today', nextSession: 'tmr', confirmed: 1, lastNumber: 1, capacity: 2, sessionsAfterToday: 10, notes: 'notes'};
    await db.createProgram(newProgram_1);
    await db.createProgram(newProgram_2);
    
    const programs = await db.getPrograms();
    expect(programs[0]).toEqual(
      jasmine.objectContaining(newProgram_1)
    );
    expect(programs[1]).toEqual(
      jasmine.objectContaining(newProgram_2)
    );
  });

  it("UpdateProgram", async () => {
    const newProgram = {id: 0, location: 'Toronto', programName: 'abc', programId: '123', rating: "5.0", startDay: 'today', nextSession: 'tmr', confirmed: 1, lastNumber: 1, capacity: 2, sessionsAfterToday: 10, notes: 'notes'};
    const newClass = await db.createClassCode(newProgram);

    await db.createQuestionForClassCode(newClass.id, {
      question: "is the sky blue?",
      name: "anon456",
    });
    const questions = await db.getQuestions(newClass.id);

    expect(questions[0]).toEqual(
      jasmine.objectContaining({
        question: "is the sky blue?",
        name: "anon456",
      })
    );
  });


  it("createQuestionForClassCode returns null when class code doesnt exist", async () => {
    const question = await db.createQuestionForClassCode("fakeId", {
      question: "is the sky blue?",
      name: "anon123",
    });
    expect(question).toEqual(null);
  });
  
  it("deleteQuestion deletes the question", async () => {
    const newClass = await db.createClassCode({ id: 'cs5356' });
    const question = await db.createQuestionForClassCode(newClass.id, {
      question: "is the sky blue?",
      name: "anon123",
    });
    await db.deleteQuestion(question.id);

    const questions = await db.getQuestions(newClass.id);

    expect(questions).toHaveSize(0)
  });
});