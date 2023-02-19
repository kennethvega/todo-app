// export const GET_TODOS = `
//   query Todos($userId:String!) {
//     getTodos(userId: $userId){
//       id
//       userId
//       task
//       complete
//     }
//   }
// `;

// operation name
export const GET_TODOS = `
  query Todos($userId:String!) { 
    todos(userId: $userId){
      id
      userId
      text
      complete
    }
  }
`;
