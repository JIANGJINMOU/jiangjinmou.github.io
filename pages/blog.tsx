// pages/blog.tsx
import React from "react";
import path from "path";
import matter from "gray-matter";
import fs from "fs";
import BlogList from "./components/BlogList";
import { Post } from "./components/types";
import "./styles/Blog.css";

// 获取 md 文件路径
const postsDirectory = './posts';

// 从文件中获取文章内容
const getPostData = (fileName: string) => {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  // 如果 title 不存在，则设置为空字符串
  const title = matterResult.data.title || "";
  const category = matterResult.data.category || ""; // 添加分类属性
  // 截取内容，限制在200个字符内
  const content = matterResult.content.slice(0, 200);
  return { id, title, content, category };
};

// 获取 md 文件列表
const getAllPosts = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(getPostData);
};

const Blog: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="blog-container">
      <BlogList posts={posts} />
    </div>
  );
};

export const getStaticProps = async () => {
  const posts: Post[] = getAllPosts();
  return {
    props: {
      posts,
    },
    revalidate: 1, // 每秒钟重新验证页面内容
  };
};

export default Blog;
