
# Resume Analyzer and Ranker

An **AI-powered Resume Analyzer and Ranker** designed to streamline recruitment by automating resume screening, ranking, and feedback. This project uses **Natural Language Processing (NLP)** and **Machine Learning** to evaluate resumes against job descriptions, providing actionable insights for recruiters and personalized feedback for candidates.

---

## Features

- **Automated Resume Parsing:** Supports multiple formats (PDF, DOCX) and extracts key details like skills, education, and work experience.
- **Contextual Matching:** Utilizes **TF-IDF Vectorizer** and **Cosine Similarity** for accurate skill and experience alignment.
- **Bias-Free Screening:** Anonymizes sensitive details to promote diversity and fairness in hiring.
- **Interactive Dashboards:** Provides real-time analysis and visualizations for recruiters and actionable feedback for candidates.
- **Scalable and Secure:** Built with **Flask**, **MySQL**, and deployed on the cloud for high-volume processing with data encryption.

---

## Technologies Used

- **Backend:** Python, Flask, PyPDF2, spaCy
- **Machine Learning:** TF-IDF Vectorizer, Cosine Similarity
- **Database:** MySQL
- **Frontend:** Streamlit (or React.js)
- **Deployment:** Cloud-ready (AWS, Google Cloud, etc.)


## How It Works

1. **Upload Resumes:** Upload multiple resumes in supported formats.
2. **Provide Job Description:** Input a job description to match resumes against.
3. **Analyze and Rank:** The system analyzes resumes using NLP and ML, calculates similarity scores, and ranks them.
4. **View Insights:** Recruiters can view ranked resumes and download detailed reports.

---



## Acknowledgments

- **Libraries Used:** spaCy, PyPDF2, scikit-learn
- **Frameworks:** Flask, Streamlit
