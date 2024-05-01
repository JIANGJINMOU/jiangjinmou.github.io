// pages/post/[_id].tsx
import React from 'react';
import MarkdownPage from './../components/MarkdownPage';
import { GetStaticProps, GetStaticPaths } from 'next';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';

interface PostData {
  id: string;
  content: string;
}

interface PostProps {
  postData: PostData;
}

const Post: React.FC<PostProps> = ({ postData }) => {
  return <MarkdownPage content={postData.content} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => ({
    params: {
      _id: fileName.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { _id } = params!;
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${_id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    props: {
      postData: {
        id: _id as string,
        content: matterResult.content,
      },
    },
  };
};

export default Post;
