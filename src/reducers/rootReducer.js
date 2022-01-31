const initState = {
  posts: [
    {id: '0', title: 'Hunger Games', copies: 3, totalCopies: 3, genre: 'Fiction'},
    {id: '1', title: 'Catcher in the Rye', copies: 2, totalCopies: 2, genre: 'Science Fiction'},
    {id: '2', title: 'Holes', copies: 4, totalCopies: 4, genre: 'Bibliography' },
    {id: '3', title: 'Dictionary', copies: 1, totalCopies: 1, genre: 'Bibliography' }
  ]
}



const rootReducer = (state = initState, action) => {
  console.log(action);
  if(action.type === 'DELETE_POST'){
   let newPosts = state.posts.filter(post => {
     return post.id !== action.id
   });
   return {
     ...state,
     posts: newPosts
   }
  } else if(action.type === 'BORROW_POST'){
   
    if(state.posts[action.id].copies > 0){
      let newPosts;
      console.log(state.posts[action.id].copies);
      //var[copies, setCopies] = useState(blogs[id].copies);
      state.posts[action.id].copies--;
          console.log(state.posts[action.id].copies);
           newPosts = state.posts.filter(post => {
            return action.id !== null
          }
          
          );

          return {
            ...state,
            posts: newPosts
          }
          }

         
   
    
  } else if(action.type === 'RETURN_POST'){
   
    if(state.posts[action.id].copies < state.posts[action.id].totalCopies){
      let newPosts;
      console.log(state.posts[action.id].copies);
      //var[copies, setCopies] = useState(blogs[id].copies);
      state.posts[action.id].copies++;
          console.log(state.posts[action.id].copies);
           newPosts = state.posts.filter(post => {
            return action.id !== null
          }
          
          );

          return {
            ...state,
            posts: newPosts
          }
          }

         
   
    
  } else if(action.type === 'ADD_POST'){
   
      let newPosts;
      console.log("Add Attempt");
      //var[copies, setCopies] = useState(blogs[id].copies);
     // state.posts[action.id].copies++;
   
     let holdC = action.post;
     console.log("action"+holdC.title);
     state.posts.push(holdC);
          newPosts = state.posts.filter(post => {
            return action.id !== null
          }
          
          );

          return {
            ...state,
            posts: newPosts
          }
          

         
   
    
  } else if(action.type === 'FILTER_POST'){
  let newPosts;
  if(action.genre !== "All"){
        console.log("OUR GRENRE"  + action.genre);
        newPosts = state.posts.filter(post => {
          return post.genre === action.genre
        }
        
        );
      } else{
        newPosts = state.posts.filter(post => {
          return action.id !== null
        }

        );
        window.location.reload(false);
      }

        return {
          ...state,
          posts: newPosts
        }
        

       
 
  
}

  return state;
}

export default rootReducer