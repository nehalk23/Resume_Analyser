import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

UPLOAD_FOLDER = 'uploaded_resumes'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create the upload folder if it doesn't exist

nlp = spacy.load("en_core_web_sm")

def preprocess_text(text):
    doc = nlp(text.lower())
    tokens = [token.text for token in doc]
    return ' '.join(tokens)

def clear_upload_folder():
    for filename in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        if os.path.isfile(file_path):
            os.unlink(file_path)

@app.route('/api/upload-resumes', methods=['POST'])
def upload_resumes():
    clear_upload_folder()  # Clear the folder before uploading new resumes

    if 'resumes' not in request.files:
        return jsonify({'message': 'No files uploaded'}), 400

    files = request.files.getlist('resumes')
    if not files:
        return jsonify({'message': 'No files selected'}), 400

    for file in files:
        if file.filename == '':
            return jsonify({'message': 'One or more files have no name'}), 400
        
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

    return jsonify({'message': 'Files uploaded successfully'}), 200

@app.route('/api/analyze', methods=['POST'])
def analyze():
    user_type = request.json.get('user_type')  # Get the user type (student or manager)
    job_description = request.json.get('job_description')
    if not job_description:
        return jsonify({'message': 'Job description is required.'}), 400

    # Load and preprocess resumes
    resumes = [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith('.pdf')]
    preprocessed_resumes = []
    for resume_file in resumes:
        filepath = os.path.join(UPLOAD_FOLDER, resume_file)
        with open(filepath, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            resume_text = ''
            for page in reader.pages:
                resume_text += page.extract_text()
        preprocessed_resumes.append(preprocess_text(resume_text))

    preprocessed_job_description = preprocess_text(job_description)

    # TF-IDF vectorization
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(preprocessed_resumes)
    job_vector = vectorizer.transform([preprocessed_job_description])
    similarities = cosine_similarity(X, job_vector)
    
    sorted_resumes = [(resumes[i], similarities[i][0]) for i in range(len(resumes))]
    sorted_resumes.sort(key=lambda x: x[1], reverse=True)

    # Prepare the result
    result = [{'resume': resume, 'similarity': f'{similarity * 100:.2f}%'} for resume, similarity in sorted_resumes]

    return jsonify(result), 200

if __name__ == '__main__':
    app.run(port=5000)
