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

export const GET_USER = `
query User($id:String!){
  user(id:$id){
    todos{
      id
      task
      done
    }
  }
}`;

export const GET_TODOS = `
query Todos($userID:String!){
  todos(userID:$userID){
    id
    task
    done
  }
}
`;

// query {
//   todos(userID:"Tb9uBltPQ8Rvbm61n2N0qlMW1VH3"){
//     id
//     task
//     done
//   }
// }
