// operation name
// export const GET_TODOS = `
//   query Todos($userId:String!) {
//     todos(userId: $userId){
//       id
//       userId
//       text
//       complete
//     }
//   }
// `;

export const GET_TODOS = `
query User($id:String!){
  user(id:$id){
    todos{
      id
      task
      done
    }
  }
}`;
