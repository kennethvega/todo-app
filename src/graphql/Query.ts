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
  query Todos($userID:String!) { 
    todos(userID: $userID){
      id
      userID
      text
      complete
    }
  }
`;
