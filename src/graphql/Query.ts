export const GET_TODOS = `
  query($userId:String!) {
    getTodos(userId: $userId){
      id
      userId
      task
      complete
    }
  }
`;
