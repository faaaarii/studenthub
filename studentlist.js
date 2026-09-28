let students = [
    { name: "Ahmad", course: "Computer Science", age: 21 },
    { name: "Siti", course: "Information Technology", age: 22 },
    { name: "Daniel", course: "Software Engineering", age: 20 }
];

const searchInput = document.getElementById("searchinput");
const courseFilter = document.getElementById("course");
const tableBody = document.getElementById("studentTbody");
const countText = document.getElementById("countText");

const formModal = document.getElementById("formmodal");
const openFormBtn = document.getElementById("openform");
const closeFormBtn = document.getElementById("closeform");
const cancelFormBtn = document.getElementById("cancelbtn");

const form = document.getElementById("studentform");
const nameInput = document.getElementById("nameinput");
const courseInput = document.getElementById("courseinput");
const ageInput = document.getElementById("ageinput");
const formError = document.getElementById("formerror");


function showStudents() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCourse = courseFilter.value;

    const results = students.filter(function (student) {
        const matchName = student.name.toLowerCase().includes(searchText);
        const matchCourse = selectedCourse === "All Courses" || student.course === selectedCourse;
        return matchName && matchCourse;
    });

    tableBody.innerHTML = "";

    if (results.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="empty">No students found.</td></tr>';
    }

    results.forEach(function (student) {
        const row = document.createElement("tr");

        addCell(row, "Name", student.name);
        addCell(row, "Course", student.course);
        addCell(row, "Age", student.age);

        // Delete button
        const actionCell = document.createElement("td");
        actionCell.dataset.label = "Actions";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteStudent(student);
        });

        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });

    countText.textContent = "Showing " + results.length + " of " + students.length + " students";
}

function addCell(row, label, value) {
    const cell = document.createElement("td");
    cell.dataset.label = label;
    cell.textContent = value;
    row.appendChild(cell);
}


// open and close form
function openForm() {
    form.reset();
    formError.textContent = "";
    formModal.classList.add("show");
    nameInput.focus();
}

function closeForm() {
    formModal.classList.remove("show");
}

openFormBtn.addEventListener("click", openForm);
closeFormBtn.addEventListener("click", closeForm);
cancelFormBtn.addEventListener("click", closeForm);

formModal.addEventListener("click", function (event) {
    if (event.target === formModal) {
        closeForm();
    }
});


// form & validation
form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const name = nameInput.value.trim();
    const course = courseInput.value;
    const ageText = ageInput.value.trim();
    const age = Number(ageText);

    // required
    if (name === "" || course === "Select course" || ageText === "") {
        formError.textContent = "Please fill in all fields.";
        return;
    }

    if (name.length < 2) {
        formError.textContent = "Name must be at least 2 characters.";
        return;
    }

    if (/[0-9]/.test(name)) {
        formError.textContent = "Name cannot contain numbers.";
        return;
    }

    if (!Number.isInteger(age) || age < 16 || age > 30) {
        formError.textContent = "Age must be a whole number between 16 and 30.";
        return;
    }

    // save
    students.push({ name: name, course: course, age: age });

    closeForm();
    showStudents();
});


// delete
function deleteStudent(student) {
    const sure = confirm("Delete " + student.name + "?");
    if (!sure) return;

    const index = students.indexOf(student);
    students.splice(index, 1);
    showStudents();
}


// search and filter
searchInput.addEventListener("input", showStudents);
courseFilter.addEventListener("change", showStudents);

showStudents();
