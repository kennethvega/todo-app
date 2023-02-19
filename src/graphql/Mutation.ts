// export const ADD_TODO = `
// mutation AddTodo($userId:String!,$task:String!,$complete:Boolean!){
//   addTodo(userId:$userId, task:$task,complete:$complete){
//     id
//     userId
//     task
//     complete
//   }
// }
// `;
// export const CREATE_USER = `
// mutation CreateUser($id:String!, $name:String!){
//   createUser(input:{id:$id,name:$name}){
//     id
//     name
//   }
// }`;
export const ADD_TODO = `
mutation CreateTodo($task:String!,$userId:String!){
  createTodo(input:{task:$task,userId:$userId}){
     id
     task
     done
     userID
  }
}`;
// export const ADD_TODO = `
// mutation{
//   createTodo(input:{
//     task:"asdasd"
//     userId:"Tb9uBltPQ8Rvbm61n2N0qlMW1VH3"
//   }){
//     id
//     task
//     done
//     userID
//   }
// }`

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
mutation CreateUser($id:String!, $name:String!){
  createUser(input:{id:$id,name:$name}){
    id
    name
  }
}`;
