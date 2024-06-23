const adminPassword = "8757300503";

function showStudentLogin() {
  document.getElementById("student-login-form").style.display = "block";
  document.getElementById("admin-login-form").style.display = "none";
}

function showAdminLogin() {
  document.getElementById("student-login-form").style.display = "none";
  document.getElementById("admin-login-form").style.display = "block";
}

function hideLogin() {
  document.getElementById("student-login-form").style.display = "none";
  document.getElementById("admin-login-form").style.display = "none";
}

function showAddStudentForm() {
  document.getElementById("add-student-form").style.display = "block";
  document.getElementById("add-result-form").style.display = "none";
}

function showAddResultForm() {
  document.getElementById("add-student-form").style.display = "none";
  document.getElementById("add-result-form").style.display = "block";
}

function hideForm(formId) {
  document.getElementById(formId).style.display = "none";
}

function hideAdminPanel() {
  document.getElementById("admin-panel").style.display = "none";
}

function getResult() {
  const rollNo = document.getElementById("student-rollNo").value;

  fetch(`http://localhost:3001/results/${rollNo}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No result found for the entered Roll No.");
      }
      return response.json();
    })
    .then((data) => {
      const resultDiv = document.getElementById("student-result");
      resultDiv.innerHTML = `
       <div class="R-header">
                <h2>Student Result</h2>
            </div>
            <div class="R-section">
                <h3>Student Information</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Gender:</strong> ${data.gender}</p>
                <p><strong>Branch:</strong> ${data.branchName}</p>
                <p><strong>Father's Name:</strong> ${data.fathername}</p>
            </div>
            <div class="R-section">
                <h3>Subject Scores</h3>
                <table>
                    <tr>
                        <th>Subject</th>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td>Math</td>
                        <td>${data.MATH}</td>
                    </tr>
                    <tr>
                        <td>Chemistry</td>
                        <td>${data.CHEMISTRY}</td>
                    </tr>
                    <tr>
                        <td>Physics</td>
                        <td>${data.PHYSICS}</td>
                    </tr>
                    <tr>
                        <td>English</td>
                        <td>${data.ENGLISH}</td>
                    </tr>
                    <tr>
                        <td>Electrical</td>
                        <td>${data.ELECTRICAL}</td>
                    </tr>
                </table>
            </div>
            <div class="R-section total">
                <p><strong>Total Score:</strong> ${data.TOTAL}</p>
            </div>
      `;
    })
    .catch((error) => {
      const resultDiv = document.getElementById("student-result");
      resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}

function authenticateAdmin() {
  const password = document.getElementById("admin-password").value;

  if (password === adminPassword) {
    document.getElementById("admin-area").style.display = "block";
  } else {
    alert("Incorrect password");
  }
}

function showSection(sectionId) {
  const forms = document.querySelectorAll(".form-container");
  forms.forEach((form) => (form.style.display = "none"));
  document.getElementById(sectionId).style.display = "block";
}

function getAllStudents() {
  fetch(`http://localhost:3001/students`)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("all-students-result");
      resultDiv.innerHTML = "";
      data.forEach((student) => {
        resultDiv.innerHTML = `
           <div class="R-result">
                    <h3>Student Information</h3>
                   <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Gender</th>
                        <th>Father's Name</th>
                        <th>Course</th>
                        <th>Branch</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                      .map(
                        (student) => `
                        <tr>
                            <td>${student.name}</td>
                            <td>${student.rollNo}</td>
                            <td>${student.gender}</td>
                            <td>${student.fathername}</td>
                            <td>${student.courseName}</td>
                            <td>${student.branchName}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
                </div>
        `;
      });
    });
}

function addStudent() {
  const name = document.getElementById("studentName").value;
  const rollNo = document.getElementById("studentRollNo").value;
  const gender = document.getElementById("studentGender").value;
  const fathername = document.getElementById("studentFatherName").value;
  const courseName = document.getElementById("studentCourseName").value;
  const branchName = document.getElementById("studentBranchName").value;

  fetch(`http://localhost:3001/students/add-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      rollNo,
      gender,
      fathername,
      courseName,
      branchName,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      document.getElementById("addStudentForm").reset();
    });
}

function updateStudent() {
  const rollNo = document.getElementById("updateStudentRollNo").value;
  const name = document.getElementById("updateStudentName").value;
  const gender = document.getElementById("updateStudentGender").value;
  const fathername = document.getElementById("updateStudentFatherName").value;
  const courseName = document.getElementById("updateStudentCourseName").value;
  const branchName = document.getElementById("updateStudentBranchName").value;

  fetch(`http://localhost:3001/students/update-student/${rollNo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, gender, fathername, courseName, branchName }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      document.getElementById("updateStudentForm").reset();
    });
}

function deleteStudent() {
  const rollNo = document.getElementById("deleteStudentRollNo").value;

  fetch(`http://localhost:3001/students/delete-student/${rollNo}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      document.getElementById("deleteStudentForm").reset();
    });
}

function getAllResults() {
  fetch(`http://localhost:3001/results`)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("all-results-result");
      resultDiv.innerHTML = "";
      resultDiv.innerHTML += `
          <div class="R-result">
             <h3>Students Result</h3>
                   <table>
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>MATH</th>
                        <th>CHEMISTRY</th>
                        <th>PHYSICS</th>
                        <th>ENGLISH</th>
                        <th>ELECTRICAL</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                      .map(
                        (result) => `
                        <tr>
                            <td>${result.rollNo}</td>
                            <td>${result.MATH}</td>
                            <td>${result.CHEMISTRY}</td>
                            <td>${result.PHYSICS}</td>
                            <td>${result.ENGLISH}</td>
                            <td>${result.ELECTRICAL}</td>
                            <td>${result.TOTAL}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        </div>`;
    });
}


function addResult() {
  const rollNo = document.getElementById("resultRollNo").value;
  const MATH = document.getElementById("resultMath").value;
  const CHEMISTRY = document.getElementById("resultChemistry").value;
  const PHYSICS = document.getElementById("resultPhysics").value;
  const ENGLISH = document.getElementById("resultEnglish").value;
  const ELECTRICAL = document.getElementById("resultElectrical").value;
  const TOTAL = document.getElementById("resultTotal").value;

  fetch(`http://localhost:3001/results/add-result`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rollNo,
      MATH,
      CHEMISTRY,
      PHYSICS,
      ENGLISH,
      ELECTRICAL,
      TOTAL,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      document.getElementById("addResultForm").reset();
    });
}

function updateResult() {
  const rollNo = document.getElementById("updateResultRollNo").value;
  const MATH = document.getElementById("updateResultMath").value;
  const CHEMISTRY = document.getElementById("updateResultChemistry").value;
  const PHYSICS = document.getElementById("updateResultPhysics").value;
  const ENGLISH = document.getElementById("updateResultEnglish").value;
  const ELECTRICAL = document.getElementById("updateResultElectrical").value;
  const TOTAL = document.getElementById("updateResultTotal").value;

  fetch(`http://localhost:3001/results/update-result/${rollNo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      MATH,
      CHEMISTRY,
      PHYSICS,
      ENGLISH,
      ELECTRICAL,
      TOTAL,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      document.getElementById("updateResultForm").reset();
    });
}

function deleteResult() {
  const rollNo = document.getElementById("deleteResultRollNo").value;

  fetch(`http://localhost:3001/results/delete-result/${rollNo}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      document.getElementById("deleteResultForm").reset();
    });
}
