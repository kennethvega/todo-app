export const ADD_TODO = `
mutation CreateTodo($task:String!,$userId:String!){
  createTodo(input:{task:$task,userId:$userId}){
     id
     task
     done
     userID
  }
}`;

export const UPDATE_TODO_DONE = `
mutation UpdateTodoDone($id:ID!, $done:Boolean!){
    updateTodoDone(input:{id:$id, done:$done}){
      id
      done    
    }
}
`;

export const UPDATE_TODO_TASK = `
mutation UpdateTodoTask($id:ID!,$task:String!){
  updateTodoTask(input:{id:$id,task:$task}){
    id
    task
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

export const CREATE_USER = `
mutation CreateUser($id:String!, $name:String!){
  createUser(input:{id:$id,name:$name}){
    id
    name
  }
}`;
