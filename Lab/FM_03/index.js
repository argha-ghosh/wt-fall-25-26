document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop form from submitting

    let name = document.getElementById("name").value.trim();
    let fatherName = document.getElementById("fatherName").value.trim();
    let motherName = document.getElementById("motherName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let age = document.getElementById("age").value.trim();
    let dob = document.getElementById("dob").value;
    let city = document.getElementById("city").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Name check
    if (name === "") {
        alert("Name cannot be empty");
        return;
    }

    // Father's name: no spaces allowed
    if (fatherName.includes(" ")) {
        alert("Father's name cannot contain spaces");
        return;
    }

    // Mother's name: exactly 8 letters (spaces allowed)
    let motherClean = motherName.replace(/ /g, ""); 
    if (motherClean.length !== 8) {
        alert("Mother's name must be exactly 8 letters (spaces are allowed)");
        return;
    }

    // Phone number: 11 digits only, no characters
    if (!/^[0-9]{11}$/.test(phone)) {
        alert("Phone number must be exactly 11 digits");
        return;
    }

    // Age check
    if (age === "" || age <= 0) {
        alert("Enter a valid age");
        return;
    }

    // DOB check
    if (dob === "") {
        alert("Date of birth cannot be empty");
        return;
    }

    // City dropdown check
    if (city === "") {
        alert("Select your city");
        return;
    }

    // Password match
    if (password === "" || confirmPassword === "") {
        alert("Password fields cannot be empty");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    alert("Form submitted successfully!");
});

// Delete button clears all values (custom behavior)
document.getElementById("deleteBtn").addEventListener("click", function () {
    document.getElementById("name").value = "";
    document.getElementById("fatherName").value = "";
    document.getElementById("motherName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("age").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("city").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";

    alert("All fields deleted!");
});
