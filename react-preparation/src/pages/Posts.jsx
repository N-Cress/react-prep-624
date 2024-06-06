import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const n = 10;

  useEffect(() => {
    async function fetchPosts() {
      function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
      }
    await timeout(1000)
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      setPosts(data)
      setLoaded(true)
      console.log(data)
    }
    fetchPosts();
  }, [id]);

   

  return (
    <> 
      <div>
        <div className="post__search">
          <button>← Back</button>
          <div className="post__search--container">
            <label className="post__search--label">Search by Id</label>
            <input
              type="number"
            />
            <button>Enter</button>
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