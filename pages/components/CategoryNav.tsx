// components/CategoryNav.tsx
import React from 'react';
import Link from 'next/link';
// import styles from '../styles/CategoryNav.css';

const CategoryNav: React.FC = () => {
  return (
    <nav className='categoryNav'>
      <ul>
        <li>
          <Link href="/blog">All</Link>
        </li>
        <li>
          <Link href="/blog/category/technology">Technology</Link>
        </li>
        <li>
          <Link href="/blog/category/lifestyle">Lifestyle</Link>
        </li>
        <li>
          <Link href="/blog/category/travel">Travel</Link>
        </li>
        <li>
          <Link href="/blog/category/food">Food</Link>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryNav;
