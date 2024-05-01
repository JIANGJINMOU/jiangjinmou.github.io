// BlogList.tsx
import React from 'react';
import { Post } from './types';
import Link from 'next/link';

interface Props {
  posts: Post[];
}

const BlogList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h2>{post.title}</h2>
          
          <h2>{post.id}</h2>
          <p>{post.content}</p> 
          <Link href={`/post/${post.id}`} passHref>
            Read More...阅读更多
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
