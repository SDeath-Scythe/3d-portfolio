// src/components/UI/InfoCard.jsx
import React, { useEffect, useState } from 'react';
import './InfoCard.css';

const InfoCard = ({ visible, planetName, onClose, onRequestCombatMode }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Handle ESC key to close InfoCard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && visible) {
        handleClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  // Enhanced close handler that returns to combat mode
  const handleClose = () => {
    onClose();
    // Small delay to ensure InfoCard is fully closed before entering combat mode
    setTimeout(() => {
      onRequestCombatMode?.();
    }, 100);
  };

  if (!visible) return null;

  const getCardContent = () => {
    switch (planetName) {
      case 'Planet_About':
        return {
          title: '🌟 About Me',
          type: 'about',
          avatar: '/assets/images/avatar.jpg',
          overview: {
            intro: "Hi! I'm a passionate full-stack developer with 5+ years of experience creating immersive web experiences.",
            highlights: [
              "🚀 Frontend Expert: React, TypeScript, Three.js",
              "🎨 3D Graphics: WebGL, R3F, Unreal Engine",
              "⚡ Backend: Node.js, Python, APIs",
              "🛠️ Tools: Git, VS Code, Figma"
            ],
            mission: "I love pushing the boundaries of what's possible in the browser, creating interactive experiences that inspire and engage users."
          },
          skills: [
            { category: "Frontend", items: ["React", "TypeScript", "Three.js", "Next.js", "Tailwind CSS"] },
            { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Access DB"] },
            { category: "3D/Graphics", items: ["Three.js", "WebGL", "Unreal Engine"] },
            { category: "Database Design", items: ["Access DB", "ERD Modeling", "Database Architecture"] },
            { category: "Tools", items: ["Git", "Figma", "VS Code"] }
          ],
          contact: {
            email: "salihdeath1111@gmail.com",
            linkedin: "linkedin.com/in/salid-deth",
            github: "github.com/SDeath-Scythe"
          }
        };
      case 'Planet_Projects':
        return {
          title: '🛠️ My Projects',
          type: 'projects',
          projects: [
            {
              id: 1,
              title: "3D FPS Portfolio",
              description: "Interactive portfolio with Three.js and React. Features first-person shooter mechanics, 3D environments, and immersive UI.",
              image: "/assets/images/projects/3d-portfolio.jpg",
              technologies: ["React", "Three.js", "WebGL", "GLSL"],
              github: "https://github.com/SDeath-Scythe",
              demo: "https://3d-portfolio-demo.com",
              status: "Completed"
            },
            {
              id: 2,
              title: "Nike E-commerce Platform",
              description: "Modern Nike-inspired e-commerce platform showcasing stylish shoe collections with sleek design, product showcases, and smooth user experience.",
              image: "/assets/images/projects/nike-shop.jpg",
              technologies: ["React", "Node.js", "Tailwind CSS"],
              github: "https://github.com/SDeath-Scythe/Vite_Repositry",
              demo: "https://sdeath-scythe.github.io/Vite_Repositry/",
              status: "Completed"
            },
            {
              id: 3,
              title: "AI-Powered Chatbot",
              description: "Intelligent chatbot with natural language processing, sentiment analysis, and multi-language support.",
              image: "/assets/images/projects/in-progres.jpg",
              technologies: ["Python", "TensorFlow", "FastAPI", "React"],
              github: "https://github.com/SDeath-Scythe/ai-chatbot",
              demo: "https://chatbot-demo.com",
              status: "In Progress"
            },
            {
              id: 4,
              title: "Prompt to Image Fullstack App",
              description: "Full-stack web application that generates images from text prompts using AI. Features user authentication, image gallery, and real-time generation.",
              image: "/assets/images/projects/project4.jpg",
              technologies: ["React", "Node.js", "Python", "AI APIs"],
              github: "https://github.com/SDeath-Scythe/react-ai-image-generator",
              demo: "https://prompt-to-image-demo.com",
              status: "Completed"
            }
          ]
        };
      case 'Planet_Skills':
        return {
          title: '⚡ Technical Skills',
          type: 'skills',
          skillCategories: [
            {
              category: "Frontend Development",
              icon: "🌐",
              skills: [
                { name: "React", level: 95, years: 5 },
                { name: "TypeScript", level: 90, years: 4 },
                { name: "Three.js", level: 85, years: 3 },
                { name: "Next.js", level: 88, years: 3 },
                { name: "CSS/SCSS", level: 92, years: 6 }
              ]
            },
            {
              category: "Backend Development",
              icon: "🔧",
              skills: [
                { name: "Node.js", level: 90, years: 4 },
                { name: "Python", level: 85, years: 3 },
                { name: "Access DB", level: 80, years: 3 },
                { name: "FastAPI", level: 75, years: 2 }
              ]
            },
            {
              category: "Database Design",
              icon: "🗄️",
              skills: [
                { name: "Access DB", level: 85, years: 3 },
                { name: "ERD Modeling", level: 80, years: 3 },
                { name: "Database Architecture", level: 75, years: 2 },
                { name: "Data Normalization", level: 80, years: 3 }
              ]
            },
            {
              category: "3D & Graphics",
              icon: "🎨",
              skills: [
                { name: "WebGL", level: 80, years: 3 },
                { name: "Three.js", level: 85, years: 3 },
                { name: "Unreal Engine", level: 65, years: 1 }
              ]
            }
          ]
        };
      default:
        return {
          title: '🌌 Unknown Planet',
          type: 'unknown',
          content: ['This planet holds mysteries yet to be discovered...']
        };
    }
  };

  const cardData = getCardContent();

  const renderAboutContent = () => (
    <div className="about-content">
      <div className="about-header">
        <div className="avatar-container">
          <img src={cardData.avatar} alt="Developer Avatar" className="avatar" />
          <div className="avatar-glow"></div>
        </div>
        <div className="about-intro">
          <p className="intro-text">{cardData.overview.intro}</p>
          <div className="highlights">
            {cardData.overview.highlights.map((highlight, index) => (
              <div key={index} className="highlight-item">{highlight}</div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="about-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <p className="mission-text">{cardData.overview.mission}</p>
          </div>
        )}
        
        {activeTab === 'skills' && (
          <div className="skills-tab">
            {cardData.skills.map((skillGroup, index) => (
              <div key={index} className="skill-group">
                <h4>{skillGroup.category}</h4>
                <div className="skill-items">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'contact' && (
          <div className="contact-tab">
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>{cardData.contact.email}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💼</span>
                <span>{cardData.contact.linkedin}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🐙</span>
                <span>{cardData.contact.github}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProjectsContent = () => (
    <div className="projects-content">
      <div className="projects-grid">
        {cardData.projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-status">{project.status}</div>
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                  🐙 GitHub
                </a>
                <a href={project.demo} className="project-link demo-link" target="_blank" rel="noopener noreferrer">
                  🚀 Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsContent = () => (
    <div className="skills-content">
      {cardData.skillCategories.map((category, index) => (
        <div key={index} className="skill-category">
          <h3 className="category-title">
            <span className="category-icon">{category.icon}</span>
            {category.category}
          </h3>
          <div className="skills-list">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-years">{skill.years} year{skill.years > 1 ? 's' : ''}</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-level">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (cardData.type) {
      case 'about':
        return renderAboutContent();
      case 'projects':
        return renderProjectsContent();
      case 'skills':
        return renderSkillsContent();
      default:
        return (
          <div className="default-content">
            {cardData.content.map((line, index) => (
              <p key={index} className={line === '' ? 'spacer' : ''}>{line}</p>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="info-card-overlay" onClick={handleClose}>
      <div className="info-card enhanced-card" onClick={(e) => e.stopPropagation()}>
        <div className="info-card-header">
          <h2>{cardData.title}</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="info-card-content">
          {renderContent()}
        </div>
        <div className="info-card-footer">
          <p>🎯 Right-click to revive destroyed planets | Press ESC to close and return to combat</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
