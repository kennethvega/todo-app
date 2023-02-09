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
