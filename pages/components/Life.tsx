// pages/components/Life.tsx
import React from "react";
import { Post } from "./types";
import "./../styles/life.css";

interface LifeProps {
  posts: Post[]; // Make sure to accept posts as a prop
}

const Life: React.FC<LifeProps> = ({ posts }) => {
  return (
    <div className="category-container">
      <div className="tags">
        <div className="tag">Tag 1</div>
        <div className="tag">Tag 2</div>
        <div className="tag">Tag 3</div>
      </div>
      <div className="introduce">
        <h1>Category Introduction</h1>





        <div className="foot">
          <div className="tags">
            <span className="tag">#HTML</span>
            <span className="tag">#CSS</span>
            <span className="tag">#JS</span>
            <span className="tag">#JQ</span>
            <span className="tag">#bootstrap</span>
            <span className="tag">#PS</span>
            <span className="tag">#AE</span>
            <span className="tag">#Blender</span>
            <span className="tag">#React</span>
            <span className="tag">#Next.js</span>
          </div>
        </div>



      </div>
      <div className="posts">
        {posts &&
          posts.map(
            (
              post // Check if posts is defined before mapping
            ) => (
              <div key={post.id} className="post">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Life;
