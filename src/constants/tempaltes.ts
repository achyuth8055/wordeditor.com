export const templates = [
  {
    id: 'blank',
    label: 'Blank Document',
    imageUrl: '/templates/blank-document.svg',
    initialContent: '<p></p>',
  },
  {
    id: 'software-proposal',
    label: 'Software Development Proposal',
    imageUrl: '/templates/software-proposal.svg',
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>1. Project Overview</h2>
      <p>This project aims to develop a...</p>
      
      <h2>2. Technical Solution</h2>
      <h3>2.1 Technical Architecture</h3>
      <p>The project uses the following tech stack:</p>
      <ul>
        <li>Frontend Framework:</li>
        <li>Backend Technology:</li>
        <li>Database:</li>
      </ul>
      
      <h3>2.2 Feature Modules</h3>
      <p>Main feature modules include:</p>
      <ul>
        <li>User Management</li>
        <li>Content Management</li>
        <li>Data Analytics</li>
      </ul>
      
      <h2>3. Project Timeline</h2>
      <table>
        <tr>
          <th>Phase</th>
          <th>Duration</th>
          <th>Main Tasks</th>
        </tr>
        <tr>
          <td>Requirements Analysis</td>
          <td>2 weeks</td>
          <td>Detailed requirements document</td>
        </tr>
        <tr>
          <td>Development Phase</td>
          <td>8 weeks</td>
          <td>Core feature development</td>
        </tr>
        <tr>
          <td>Testing Phase</td>
          <td>2 weeks</td>
          <td>Function testing and optimization</td>
        </tr>
      </table>
      
      <h2>4. Budget Estimate</h2>
      <p>Total project budget approximately...</p>
      
      <h2>5. Team Configuration</h2>
      <ul>
        <li>Project Manager: 1</li>
        <li>Senior Development Engineers: 2</li>
        <li>Frontend Engineers: 2</li>
        <li>QA Engineers: 1</li>
      </ul>
    `,
  },
  {
    id: 'project-proposal',
    label: 'Project Proposal',
    imageUrl: '/templates/project-proposal.svg',
    initialContent: `
      <h1>Project Proposal</h1>
      
      <h2>1. Project Background</h2>
      <p>In the current market environment...</p>
      
      <h2>2. Project Objectives</h2>
      <ul>
        <li>Short-term objectives:</li>
        <li>Medium-term objectives:</li>
        <li>Long-term objectives:</li>
      </ul>
      
      <h2>3. Market Analysis</h2>
      <h3>3.1 Target Market</h3>
      <p>Our target users are...</p>
      
      <h3>3.2 Competitive Analysis</h3>
      <p>Main competitors include:</p>
      
      <h2>4. Implementation Plan</h2>
      <table>
        <tr>
          <th>Phase</th>
          <th>Timeline</th>
          <th>Objectives</th>
        </tr>
        <tr>
          <td>Phase One</td>
          <td>Q1</td>
          <td>Market Research</td>
        </tr>
        <tr>
          <td>Phase Two</td>
          <td>Q2</td>
          <td>Product Development</td>
        </tr>
      </table>
      
      <h2>5. Expected Benefits</h2>
      <p>The project is expected to bring...</p>
      
      <h2>6. Risk Assessment</h2>
      <ul>
        <li>Market risks:</li>
        <li>Technical risks:</li>
        <li>Operational risks:</li>
      </ul>
    `,
  },
  {
    id: 'business-letter',
    label: 'Business Letter',
    imageUrl: '/templates/business-letter.svg',
    initialContent: `
      <p>[Sender Name]</p>
      <p>[Sender Address]</p>
      <p>[City, ZIP Code]</p>
      <br>
      <p>[Date]</p>
      <br>
      <p>[Recipient Name]</p>
      <p>[Position]</p>
      <p>[Company Name]</p>
      <p>[Address]</p>
      <p>[City, ZIP Code]</p>
      <br>
      <p>Dear [Recipient Name]:</p>
      <br>
      <p>Letter body content...</p>
      <br>
      <p>Sincerely,</p>
      <br>
      <p>[Your Name]</p>
      <p>[Position]</p>
      <p>[Company Name]</p>
    `,
  },
  {
    id: 'resume',
    label: 'Resume',
    imageUrl: '/templates/resume.svg',
    initialContent: `
      <h1>Resume</h1>
      
      <h2>Personal Information</h2>
      <p>Name:</p>
      <p>Gender:</p>
      <p>Age:</p>
      <p>Phone:</p>
      <p>Email:</p>
      
      <h2>Education</h2>
      <table>
        <tr>
          <th>Period</th>
          <th>School</th>
          <th>Major</th>
          <th>Degree</th>
        </tr>
        <tr>
          <td>2020-2024</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      
      <h2>Work Experience</h2>
      <h3>Company Name (2022-Present)</h3>
      <p>Position:</p>
      <p>Responsibilities:</p>
      <ul>
        <li>Responsible for...</li>
        <li>Participated in...</li>
        <li>Completed...</li>
      </ul>
      
      <h2>Skills</h2>
      <ul>
        <li>Skill 1:</li>
        <li>Skill 2:</li>
        <li>Skill 3:</li>
      </ul>
      
      <h2>Project Experience</h2>
      <h3>Project Name</h3>
      <p>Description:</p>
      <p>Main Responsibilities:</p>
      <p>Achievements:</p>
    `,
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    imageUrl: '/templates/cover-letter.svg',
    initialContent: `
      <p>[Your Name]</p>
      <p>[Address]</p>
      <p>[Phone Number]</p>
      <p>[Email Address]</p>
      <br>
      <p>[Date]</p>
      <br>
      <p>[Recipient Name]</p>
      <p>[Position]</p>
      <p>[Company Name]</p>
      <p>[Company Address]</p>
      <br>
      <p>Dear [Recipient Name]:</p>
      <br>
      <p>I am writing with great enthusiasm to apply for the [Position Name] position at your company...</p>
      <br>
      <p>As a professional with a background in [Your Field/Profession], I possess...</p>
      <br>
      <p>I believe my skills and experience perfectly match the requirements of this position. I look forward to the opportunity to discuss further...</p>
      <br>
      <p>Sincerely,</p>
      <br>
      <p>[Your Name]</p>
    `,
  },
  {
    id: 'letter',
    label: 'Letter',
    imageUrl: '/templates/letter.svg',
    initialContent: `
      <p>[Sender Address]</p>
      <p>[City, ZIP Code]</p>
      <br>
      <p>[Date]</p>
      <br>
      <p>[Recipient Name]</p>
      <p>[Recipient Address]</p>
      <p>[City, ZIP Code]</p>
      <br>
      <p>Dear [Recipient Name]:</p>
      <br>
      <p>Letter body...</p>
      <br>
      <p>Sincerely,</p>
      <br>
      <p>[Your Name]</p>
    `,
  },
];
