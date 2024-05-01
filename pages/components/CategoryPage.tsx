// pages/components/CategoryPage.tsx
import React from "react";
import Link from "next/link";
import { Post } from "./types";
import './../styles/CategoryPage.css';

interface CategoryPageProps {
  posts?: Post[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ posts = [] }) => {
  return (
    <div className="category-container">
      <div className="tags">
        <div className="tag">Tag 1</div>
        <div className="tag">Tag 2</div>
        <div className="tag">Tag 3</div>
      </div>
      <div className="introduce">
        <h1>Category Introduction</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor
          ligula vitae nunc suscipit, eget consequat orci feugiat. Aliquam
          erat volutpat. Quisque at bibendum purus. Nam fermentum augue quis
          tellus egestas, nec faucibus elit convallis.
        </p>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
