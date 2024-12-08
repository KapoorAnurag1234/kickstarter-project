import React from "react";
import "./ProjectTable.css";

interface Project {
  "s.no": number;
  "amt.pledged": number;
  "percentage.funded": number;
}

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable = ({ projects }: ProjectTableProps) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project["s.no"]}</td>
              <td>{project["percentage.funded"]}%</td>
              <td>${project["amt.pledged"].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
