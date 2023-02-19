export const ADD_TODO = `
mutation CreateTodo($task:String!,$userId:String!){
  createTodo(input:{task:$task,userId:$userId}){
     id
     task
     done
     userID
  }
}`;

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

// export const UPDATE_COMPLETE = `
// mutation UpdateComplete($id:ID!,$complete:Boolean!){
//   updateComplete(id:$id,complete:$complete){
//     id
//     complete
//   }
// }
// `;

export const UPDATE_COMPLETE = `
mutation UpdateTodoDone($id:ID!, $done:Boolean!){
    updateTodoDone(input:{id:$id, done:$done}){
      id
      done   
    }
}
`;

// mutation{
//   updateTodoDone(input:{
//     id:"0f105b32-9bde-480d-bf66-2180bd39921d"
//     done:true
//   }){
//     id
//     done
//   }
// }

export const CREATE_USER = `
mutation CreateUser($id:String!, $name:String!){
  createUser(input:{id:$id,name:$name}){
    id
    name
  }
}`;
