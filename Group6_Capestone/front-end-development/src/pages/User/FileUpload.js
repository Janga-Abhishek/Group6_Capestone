import React, { useState, useEffect } from "react";
import "../../Stylesheet/FileUpload.css";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (username) {
      fetchDocuments();
    }
  }, [username]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/files?username=${username}`
      );
      const data = await response.json();
      console.log("Fetched documents data:", data); // Debugging
      setDocuments(data.files || []); // Handle case where 'files' might be undefined
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onDocumentNameChange = (e) => {
    setDocumentName(e.target.value);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentName", documentName);
    formData.append("username", username);

    try {
      const response = await fetch("http://localhost:4001/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("File uploaded successfully", data);
      fetchDocuments(); // Refresh the list after upload
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const viewFile = (filename) => {
    const url = `http://localhost:4001/uploads/${filename}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <Menu/>
    <div className="file-upload-container">
      <h1 className="page-title">UPLOAD PRESCRIPTION</h1>
      <div className="upload-form">
        <input
          type="file"
          onChange={onFileChange}
          className="file-input"
        />
        <input
          type="text"
          placeholder="Document Name"
          value={documentName}
          onChange={onDocumentNameChange}
          className="document-name-input"
        />
        <button onClick={onUpload} className="upload-button">
          Upload
        </button>
      </div>
      <h2 className="documents-title">My Documents</h2>
      <ul className="documents-list">
        {documents.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          documents.map((doc) => (
            <li key={doc._id} className="document-item">
              <span className="document-name">{doc.documentName}</span>
              <button
                onClick={() => viewFile(doc.filename)}
                className="view-button"
              >
                View
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
    <Footer/>
    </div>
  );
}

export default FileUpload;