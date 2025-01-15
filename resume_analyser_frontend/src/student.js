import React, { useState } from "react";
import axios from "axios";
import "./App.css"; 

const Student = () => {
  const [jobDescription, setJobDescription] = useState("");//hold
  const [resumeFiles, setResumeFiles] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    setResumeFiles(e.target.files);  //capture (resume files)
  };

  const handleUpload = async () => { //click on  upload resume
    if (resumeFiles.length === 0) {
      alert("Please select files to upload");//post rquest send
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
      alert("Error uploading resumes");
    }
  };

  const handleAnalyze = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/analyze", {
        job_description: jobDescription,  // job description to backend api
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error analyzing resumes:", error);
      alert("Error analyzing resumes");
    }
  };

  return (
    <div className="student-page">
      <h2>Resume Ranker</h2>
      <div className="form-container">
        <section className="upload-section">
          <h3>Upload Resumes</h3>
          <input type="file" multiple onChange={handleFileChange} /> 
          <button onClick={handleUpload}>Upload Resumes</button>
        </section>

        <section className="analyze-section">
          <h3>Analyze Resumes</h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description"
          ></textarea>
          <button onClick={handleAnalyze}>Analyze Resumes</button>
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
