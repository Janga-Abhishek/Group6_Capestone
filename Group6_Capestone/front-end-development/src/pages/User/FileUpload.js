import React, { useState, useEffect } from "react";

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
      <input type="file" onChange={onFileChange} />
      <input
        type="text"
        placeholder="Document Name"
        value={documentName}
        onChange={onDocumentNameChange}
      />
      <button onClick={onUpload}>Upload</button>
      <h2>My Documents</h2>
      <ul>
        {documents.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          documents.map((doc) => (
            <li key={doc._id}>
              {doc.documentName}
              <button onClick={() => viewFile(doc.filename)}>View</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FileUpload;
