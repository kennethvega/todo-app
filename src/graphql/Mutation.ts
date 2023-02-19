export const ADD_TODO = `
mutation CreateTodo($task:String!,$userId:String!){
  createTodo(input:{task:$task,userId:$userId}){
     id
     task
     done
     userID
  }
}`;

// export const DELETE_TODO = `
// mutation DeleteTodo($id:ID!){
//   deleteTodo(id:$id){
//     id
//   }
// }
// `;
export const DELETE_TODO = `
mutation DeleteTodo($id:ID!){
  deleteTodo(id:$id){
    id
  }
}
`;

// mutation {
//   deleteTodo(id:"53c4af2e-21e0-447a-86d6-03951a7365c6")
//   {
//     id
//   }
// }

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
mutation CreateUser($id:String!, $name:String!){
  createUser(input:{id:$id,name:$name}){
    id
    name
  }
}`;
