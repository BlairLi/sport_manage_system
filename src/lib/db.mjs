import fsPromises from 'fs/promises'
// import { promises as fsPromises } from 'fs';
// const fsPromises = require('fs').promises;

export const openDb = async () => {
    // @type {dbObject}
    let dbObject = {
        programs: []
    }

    try {
      const text = await fsPromises.readFile('./db_schedule.json')
      return JSON.parse(text)
    } catch (err) {
      await saveData(dbObject)
      return dbObject
    }
}

export const getPrograms = async () => {
    const dbObject = await openDb();
    // console.log("dbObject", dbObject.programs);
    return dbObject.programs;
};
  
export const getProgramByName = async (programName) => {
    const dbObject = await openDb();
    return dbObject.programs.find(program => program.programName === programName);
};

export const createProgram = async ({id=0, location='', programName='', programId='', rating='', startDay='', nextSession='', confirmed=0, lastNumber=0, capacity=0, sessionsAfterToday=0, notes=''}) => {
    const dbObject = await openDb();
    // Check if program already exists
    if (dbObject.programs.find(program => program.programName === programName)) return null;
    const newProgram = { id, location, programName, programId, rating, startDay, nextSession, confirmed, lastNumber, capacity, sessionsAfterToday, notes};
    dbObject.programs.push(newProgram);
    await saveData(dbObject);
    return newProgram;
};

// TODO: Implement this function
export const updateProgram = async (programName, updatedProgram) => {
    const dbObject = await openDb();
    const programFound = dbObject.programs.find(program => program.programName === programName);

    if (!programFound) return null;

    dbObject.programs[programIndex] = { ...dbObject.programs[programIndex], ...updatedProgram };
    await saveData(dbObject);
    return dbObject.programs[programIndex];
};

// TODO: Implement this function
export const deleteProgram = async (programId) => {
    const dbObject = await openDb();
    dbObject.programs = dbObject.programs.filter(program => program.id !== programId);
    await saveData(dbObject);
};

// -------------------------------
// Do not edit the functions below
const saveData = async (dbObject) => {
    await fsPromises.writeFile('./db_schedule.json', JSON.stringify(dbObject));
};

export const clear = async () => {
    try {
        await fsPromises.rm('./db_schedule.json');
    } catch (err) {} // ignore error if file doesn't exist
};
  
  
// const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 50 }),
//   username: varchar('username', { length: 50 }),
//   email: varchar('email', { length: 50 })
// });

// export async function getUsers(search, offset) {
//   // Always search the full table, not per page
//   if (search) {
//     return {
//       users: await db
//         .select()
//         .from(users)
//         .where(ilike(users.name, `%${search}%`))
//         .limit(1000),
//       newOffset: null
//     };
//   }

//   if (offset === null) {
//     return { users: [], newOffset: null };
//   }

//   const moreUsers = await db.select().from(users).limit(20).offset(offset);
//   const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
//   return { users: moreUsers, newOffset };
// }

// export async function deleteUserById(id) {
//   await db.delete(users).where(eq(users.id, id));
// }
