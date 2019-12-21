import React from 'react';

const Card = props => {
  const { mod, children } = props;

  return <div className={`card${mod ? '--' + mod : ''}`}>{children}</div>;
};

const About = () => {
  let content = {};  

  content.designer = (
    <>
      <h2>Design</h2>
      <p>Simple, clean, and thoughtful designs are my goals.</p>
      <h3>What</h3>
      <p>UX, UI</p>
      <h3>Tools</h3>
      <ul>
        <li>Adobe Suite</li>
        <li>Balsamiq Mockups</li>
        <li>Figma</li>
        <li>Pen & Paper</li>
        <li>Webflow</li>
        <li>Zeplin</li>
      </ul>
    </>
  );

  content.developer = (
    <>
      <h2>Frontend Developer</h2>
      <p>I prefer coding things from scratch while making thoughts a reality in browsers.</p>
      <h3>Languages</h3>
      <p>HTML, JavaScript, TypeScript, CSS, Sass, Less</p>
      <h3>Favorite Frameworks & Libraries</h3>
      <p>React, Vue, Gatsby, Material UI, Jekyll</p>
      <h3>Tools</h3>
      <ul>
        <li>VS Code</li>
        <li>Atlassian</li>
        <li>GitHub/GitLabs</li>
        <li>Codepen</li>
        <li>CodeSandbox</li>
        <li>Customized Terminal</li>
        <li>Typora</li>
      </ul>
    </>
  );

  return (
    <>
      <div className="about">
        <div className="about__cards">
          <Card children={content.designer} />
          <Card children={content.developer} />
        </div>
      </div>
    </>
  );
};

export default About;
