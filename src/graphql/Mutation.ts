export const ADD_TODO = `
mutation AddTodo($userId:String!,$task:String!,$complete:Boolean!){
  addTodo(userId:$userId, task:$task,complete:$complete){
    id
    userId
    task
    complete
  }
}
`;

export const DELETE_TODO = `
mutation DeleteTodo($id:ID!){
  deleteTodo(id:$id){
    id
  }
}
`;

export const UPDATE_TODO = `
mutation UpdateTodo($id:ID!,$task:String!){
  updateTodo(id:$id,task:$task){
    id
    userId
    task
    complete
  }
}
`;

export const UPDATE_COMPLETE = `
mutation UpdateComplete($id:ID!,$complete:Boolean!){
  updateComplete(id:$id,complete:$complete){
    id
    complete
  }
}
`;

export const CREATE_USER = `
mutation CreateUser($id:ID!, $name:String!){
  createUser(id:$id,name:$name){
    id
    name
  }
}`;
