import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the main CSS file

const Student = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resumeFiles, setResumeFiles] = useState([]);
  const [results, setResults] = useState([]);

  const categories = [
    "Web Development",
    "Python",
    "Java",
    "Software Testing",
    "Data Analyst",
  ];

  const categoryDescriptions = {
    "Web Development":
      "We are looking for a skilled Web Developer to design, build, and maintain responsive, high-performance websites and web applications. You’ll collaborate with cross-functional teams to develop and optimize both frontend (HTML, CSS, JavaScript) and backend (Node.js, PHP, or Python) components, ensuring seamless integration and scalability. Experience with modern frameworks (React, Angular) and databases (SQL, MongoDB) is preferred.",
    Python:
      "We are seeking a Python Developer to build, optimize, and maintain scalable applications that solve real-world problems. You’ll work with cross-functional teams to develop robust backend solutions, manage databases, and integrate APIs. Proficiency in Python frameworks (Django, Flask) and experience with automation and RESTful services are essential.",
    Java:
      "We are looking for a Java Developer to design, develop, and maintain high-performance applications. Your role will involve building scalable backend solutions, managing databases, and ensuring system reliability. Proficiency in Java frameworks (Spring, Hibernate) and RESTful services is required.",
    "Software Testing":
      "We are seeking a Software Tester responsible for ensuring the quality of our applications. You will design and execute test plans, identify bugs, and collaborate with the development team. Familiarity with tools like Selenium, JIRA, and Agile methodologies is preferred.",
    "Data Analyst":
      "We are looking for a Data Analyst to collect, analyze, and visualize data, uncovering trends to drive business decisions. Proficiency in SQL, Excel, and Power BI is required, with Python or R experience being a plus.",
  };

  const handleFileChange = (e) => {
    setResumeFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (resumeFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < resumeFiles.length; i++) {
      formData.append("resumes", resumeFiles[i]);
    }

    try {
      await axios.post("http://localhost:5000/api/upload-resumes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Resumes uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resumes:", error);
      alert("Error uploading resumes.");
    }
  };

  const handleAnalyze = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/analyze", {
        job_description: jobDescription,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error analyzing resumes:", error);
      alert("Error analyzing resumes.");
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setJobDescription(categoryDescriptions[category] || "");
  };

  return (
    <div className="student-page">
      <h2 className="header">Resume Ranker</h2>
      <div className="form-container">
        <section className="upload-section">
          <h3>Upload Resumes</h3>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="file-input"
          />
          <button className="upload-button" onClick={handleUpload}>
            Upload Resumes
          </button>
        </section>

        <section className="analyze-section">
          <h3>Analyze Resumes</h3>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="job-category-select"
          >
            <option value="">Select Job Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Job description will appear here"
            className="job-description-textarea"
          ></textarea>

          <button className="analyze-button" onClick={handleAnalyze}>
            Analyze Resumes
          </button>
        </section>
      </div>

      <section className="results-section">
        <h3>Results</h3>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result-item">
              <h4>{result.resume}</h4>
              <p>Similarity: {result.similarity}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No results to display.</p>
        )}
      </section>
    </div>
  );
};

export default Student;
