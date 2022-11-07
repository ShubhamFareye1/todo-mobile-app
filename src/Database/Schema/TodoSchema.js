import Realm from "realm";

// Declare Schema
export const TodoSchema = {
    name: 'todo',
    properties: {
        id: 'int',
        title: 'string',
        body:'string',
        status: 'string',
        dueDate: 'string',
        dueTime: 'string',
    },
      primaryKey: 'id',
};

export const UserSchema = {
    name: 'user',
    properties: {
        userName: 'string',
        email:  'string',
        password: 'string'
    }
};

// // Create realm
// let realm = new Realm({schema: [TodoSchema,UserSchema], schemaVersion: 1});

// // Export the realm
// export default realm;