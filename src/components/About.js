import React from 'react';
import wallet from '../assets/img/logo_ppy-wallet.png';
import bookie from '../assets/img/logo_ppy-bookie.png';
import how from '../assets/img/HOW_white-full-logo.png';

const Card = props => {
  // eslint-disable-next-line react/prop-types
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
      <p>
        I prefer coding things from scratch while making thoughts a reality in
        browsers.
      </p>
      <h3>Languages</h3>
      <p>HTML, JavaScript, TypeScript, CSS, Sass, Less</p>
      <h3>Favorite Frameworks & Libraries</h3>
      <p>React, Vue, Gatsby, Material UI, Jekyll</p>
      <h3>Tools</h3>
      <ul>
        <li>VS Code</li>
        <li>Atlassian</li>
        <li className="tooltip">
          <span className="txt">GitHub/GitLab</span>
          <span className="top">
            <a href="https://github.com/mseaward">Work GitHub</a>
            <a href="https://github.com/mamokin">Personal GitHub</a>
            <a href="https://gitlab.com/mamokin">Gitlab</a>
          </span>
        </li>
        <li>SonarCloud</li>
        <li>Codepen</li>
        <li>CodeSandbox</li>
        <li>Customized Terminal</li>
        <li>Typora</li>
      </ul>
    </>
  );

  return (
    <div className="full-block bg">
      <div className="about">
        <div className="about__cards">
          {/* eslint-disable-next-line react/no-children-prop */}
          <Card children={content.designer} />
          {/* eslint-disable-next-line react/no-children-prop */}
          <Card children={content.developer} />
        </div>
        <div className="about__projects">
          <h1>History</h1>
          <div className="about__projects logos">
            <a
              href="https://github.com/peerplays-network/peerplays-core-gui/releases/latest"
              alt="Peerplays Core GUI"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex="0"
            >
              <img src={wallet} alt="Peerplays Core GUI" />
            </a>

            <a
              href="https://bookiepro.com/download"
              alt="Bookie Pro"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex="0"
            >
              <img src={bookie} alt="Bookie Pro" />
            </a>

            <a
              href="https://www.healthoutcomesww.com/"
              alt="Health Outcomes Worldwide"
              className="tooltip"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex="0"
            >
              <img src={how} alt="HOW" className="invert"/>
              <span className="top left">Software That Improves Health Outcomes</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
