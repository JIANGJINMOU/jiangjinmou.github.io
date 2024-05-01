// pages/about.tsx
import React from "react";
import "./../styles/About.css";

const About: React.FC = () => {
  return (
    <div>
      <div className="md">
        <h2>About Us</h2>

        <div>
          <p>This is the about page of our blog.</p>
          <p>
            Our blog is dedicated to sharing knowledge about various topics.
          </p>
        </div>
      </div>

      <div className="about-container">
        <div className="about-section">
          <div className="about-content">
            <h2>前端（博客展示页面）：</h2>
            <p>
              主要技术栈为react+next.js+TS
              <br />
              hooks+antd+axios+dayjs+marked+highlight.js
              <br />
              react相关库React-Router、Redux等
              <br />
              AntD组件库（自定义样式/按需导入）
              <br />
              ahooks库提供常用的hooks
              <br />
              axios网络请求库
              <br />
              echarts图标库绘制饼图
              <br />
              时间格式化工具dayjs
              <br />
              markdown格式渲染工具marked
              <br />
              代码高亮渲染工具highlight.js
            </p>
          </div>
        </div>
        <div className="about-section">
          <div className="about-content">
            <h2>后端（数据展示）：</h2>
            <p>Node.js + Express + MongoDB</p>
          </div>
        </div>
        <div className="about-section">
          <div className="about-content">
            <h2>网站参考：</h2>
            <p>
              <a href="https://lzxjack.top/">https://lzxjack.top/</a>
              <a href="https://www.cnblogs.com/">https://www.cnblogs.com/</a>
              <a href="https://www.runoob.com/">https://www.runoob.com/</a>
              <a href="https://www.bilibili.com/">https://www.bilibili.com/</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
