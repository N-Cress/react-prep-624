import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState(id);
  const n = 10;

  async function fetchPosts(userId) {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`)
    setPosts(data)
    setLoaded(true)
    console.log(data)
  }

  function onSearch() {
    fetchPosts(input)
  }

  useEffect(() => {
    
    fetchPosts();
  }, []);


  return (
    <> 
      <div>
        <div className="post__search">
          <button>← Back</button>
          <div className="post__search--container">
            <label className="post__search--label">Search by Id</label>
            <input
              type="number"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && onSearch()}
            />
            <button  onClick={() => onSearch()}>Enter</button>
          </div>
        </div>
        {loaded ? posts.map((post) => (
          <div key={post.id} className="post">
          <div className="post__title">{post.title}</div>
          <p className="post__body">{post.body}</p>
        </div>
        )) :
        [...Array(n)].map((_, index) => (
          <div key={index} className="post">
          <div className="post__title">
            <div className="post__title--skeleton"></div>
          </div>
          <div className="post__body">
            <p className="post__body--skeleton"></p>
          </div>
        </div>
        ))
        
        }
      </div>
  
   </>
  )
}

export default Posts;