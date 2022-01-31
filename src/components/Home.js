import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import Select from 'react-select';
import { connect } from 'react-redux'
import Post from './Post';
import handleClick from './Post';
//import {blog} from './Home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: 'Fiction',
      title: '',
      copies: 0,
      totalCopies: 0,
      genreChange: 'hold',
    };
    
  }
   handleChangeF = (event) => {
    console.log("Filter Handler Active" + event.value);
   this.setState({
     ...this.state,
     genreChange: event.value
   });
   

 }

   handleChange = (event) => {
    this.setState({
      title: event.target.value
    });
    console.log("}}" + this.Title);
  }

  handleChangeC = (event) => {
    this.setState({
      copies: event.target.value
    });
  }
  render(){
    let blog = {};
    console.log(this.props.posts);
  
   let genre = 'Fiction';
   let Title = 'Hold';
    let copies = 1;
    const options = [
      { value: 'Bibliography', label: 'Bibliography' },
      { value: 'Fiction', label: 'Fiction' },
      { value: 'Science Fiction', label: 'Science Fiction' }
    ]
    const optionsF = [
      { value: 'Bibliography', label: 'Bibliography' },
      { value: 'Fiction', label: 'Fiction' },
      { value: 'Science Fiction', label: 'Science Fiction' },
      { value: 'All', label: 'All' },
    ]
    const handleSubmit = (e) => {
      e.preventDefault();
      let totalCopies = copies;
     blog = { id: this.props.posts.length, title: this.state.title, copies: this.state.copies, totalCopies: this.state.copies, genre: this.state.genre};
     console.log("this should technically have updated info"+ blog);
      this.props.addPost(blog);
      
    }
    const handleSubmitF = (e) => {
      e.preventDefault();
      console.log("UPDATEDG IS " + this.state.genreChange);
      let holdGenre = this.state.genreChange;
      console.log("in Handlesubmit " + holdGenre );
      this.props.filterPost(holdGenre);
      
    }
    
    
    
    const handleChangeG = (event) => {
      this.setState({
        genre: event.target.value
      });
   
     }
     
    const handleDelete = () => {
      this.props.deletePost(this.props.posts[0].id);
      this.props.history.push('/');
    }

    function findIDbyID(id){
      for (var i = 0; i < posts.length; i++) {
          if (posts[i].id === id) {
              return i;
              
          }
          
      }
   }

    const { posts } = this.props
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <div className="card-content">
             <h4> {post.title}</h4>
              <p>Copies: {post.copies}</p>

              <button onClick={()=>{
                this.props.borrowPost(post.id);
              }
              }>Borrow</button>
            &nbsp;
            <button onClick={()=>{
                this.props.returnPost(post.id);
              }
              } >Return</button>
            &nbsp;
            <button onClick={()=>{
              this.props.deletePost(post.id);
      this.props.history.push('/');
      }} >Delete</button>

            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No books to show</div>
    );

    return (
      <div>
        <div className="container home">
          <h4 className="center">Books</h4>
         <p> {postList} </p>
        </div>
        <br></br>
        <form onSubmit={handleSubmitF}>
      <label>Filter </label>
            <Select
             options={optionsF}
             required
                onChange = {this.handleChangeF.bind()}
            >
               
            </Select>
            <br/>
            <button>Go</button>
          </form>
        <br></br>
        <div className="create">
         
         <h5>Add a new book:</h5>

         
        
         <form onSubmit={handleSubmit} >      
             <label>Title: </label>
             <input 
              value = {this.state.title}
             type="text"
             required
            onChange = {(e) => {this.handleChange(e)}}
         
             />
             <br/>
             <label>Genre: </label>
            <Select
                options={options}
               required
               onClick = {(e) => {handleChangeG(e)}}
             
                >
            </Select>
            <br/>
             <label>Copies: </label>
             <input 
             value = {this.state.copies}
             type="number"
             required
             onChange = {(e) => {this.handleChangeC(e)}}
             />
           <br/>
             <button>Add Book</button>
     
        </form>
     </div>
      </div>
    )
  }
}





const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.post_id;
  return {
    post: state.posts.find(post => post.id === id),
  
    posts: state.posts
  }
}

// const mapStateToProps1 = (state) => {
//   return {
//     posts: state.posts
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => dispatch({type: 'DELETE_POST', id: id}),
    borrowPost: (id) => dispatch({type: 'BORROW_POST', id: id}),
    returnPost: (id) => dispatch({type: 'RETURN_POST', id: id}),
    addPost: (post) => dispatch({type: "ADD_POST", post:post}),
    filterPost: (genre) => dispatch({type: "FILTER_POST", genre:genre})
    // When calling addpost, it should take an object of a book {title:, copies: } etc. First will have to create that object using the form!!
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

