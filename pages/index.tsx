// pages/index.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./styles/Home.css";

const IndexPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  const updateTime = () => {
    const now = new Date();
    const year = String(now.getFullYear()).padStart(4, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}`);
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <nav className="shell">
        <header>
          <div className="image-text">
            <span className="image">
              <Image src="/1.jpg" alt="logo" width={75} height={45} />
            </span>
            <div className="text logo-text">
              <span className="name">bl0g</span>
              <span className="software">-嘿嘿-</span>
            </div>
          </div>
          <div className="time">{currentTime}</div>
          <i
            className="iconfont icon-xiangyoujiantou toggle"
            onClick={toggleDarkMode}
          ></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <Link href="/">
                  <i className="iconfont icon-shouye icon"></i>
                  <span className="text nac-text">主页</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link href="/blog">
                  <i className="iconfont icon-shoucangxiao icon"></i>
                  <span className="text nac-text">博客</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link href="/components/CategoryPage">
                  <i className="iconfont icon-xiaoxi icon"></i>
                  <span className="text nac-text">分类</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link href="/components/CategoryNav">
                  <i className="iconfont icon-xiaoxi icon"></i>
                  <span className="text nac-text">分类2</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link href="/components/Life">
                  <i className="iconfont icon-xiaoxi icon"></i>
                  <span className="text nac-text">生活</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link href="/components/about">
                  <i className="iconfont icon-xiaoxi icon"></i>
                  <span className="text nac-text">关于</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="mode" onClick={toggleDarkMode}>
              <div className="sun-moon">
                <i
                  className={`iconfont icon-rijian sun ${
                    darkMode ? "hide" : ""
                  }`}
                ></i>
                <i
                  className={`iconfont icon-yejian moon ${
                    darkMode ? "" : "hide"
                  }`}
                ></i>
              </div>
              <span className="mode-text text">
                {darkMode ? "白日模式" : "夜间模式"}
              </span>
            </li>
          </div>
        </div>
      </nav>
      <main className="main-content">
      <h1>Welcome to my blog</h1>
        <div className="tfc">
          
          <p>
            hello everyone,
            <br />
            我是一个大学牲，很高兴有机会向大家介绍自己。我对CSS有浓厚的兴趣，也喜欢运动。首先，让我谈谈我对CSS的热爱。CSS
            是一种用于网页设计和布局的语言，它使网页美观、可读且易于浏览。我喜欢CSS的一件事是它的灵活性，通过使用不同的样式和布局......
          </p>
        </div>
      </main>
      <footer>
        <p>Check out my corror.</p>
      </footer>
    </div>
  );
};

export default IndexPage;
