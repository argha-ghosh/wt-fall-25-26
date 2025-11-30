document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(err => err.textContent = "");

    let valid = true;

    let name = document.getElementById("name").value.trim();
    let father = document.getElementById("father").value.trim();
    let mother = document.getElementById("mother").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let age = document.getElementById("age").value.trim();
    let dob = document.getElementById("dob").value.trim();
    let city = document.getElementById("city").value.trim();
    let pass = document.getElementById("pass").value.trim();
    let cpass = document.getElementById("cpass").value.trim();

    // Name
    if (name === "") {
        document.getElementById("err_name").textContent = "Name cannot be empty.";
        valid = false;
    }

    // Father's name (no space)
    if (father.includes(" ")) {
        document.getElementById("err_father").textContent = "Father's name cannot contain spaces.";
        valid = false;
    }

    // Mother's name (must have 8 letters ignoring spaces)
    if (mother.replace(/\s/g, "").length < 8) {
        document.getElementById("err_mother").textContent = "Mother's name must have at least 8 letters.";
        valid = false;
    } else if (/[^A-Za-z\s]/.test(mother)) {
        document.getElementById("err_mother").textContent = "Mother's name must contain letters and spaces only.";
        valid = false;
    }

    // Phone (11 digits)
    if (!/^\d{11}$/.test(phone)) {
        document.getElementById("err_phone").textContent = "Phone must be 11 digits only.";
        valid = false;
    }

    // Age
    if (age === "" || age <= 0) {
        document.getElementById("err_age").textContent = "Age is invalid.";
        valid = false;
    } else {
        const ageNum = Number(age);
        if (!Number.isInteger(ageNum) || ageNum <= 0 || ageNum > 120) {
            document.getElementById("err_age").textContent = "Enter a valid age (1-120).";
            valid = false;
        }
    }

    // DOB
    if (dob === "") {
        document.getElementById("err_dob").textContent = "Please select your date of birth.";
        valid = false;
    } else {
        const dobDate = new Date(dob);
        const now = new Date();
        if (isNaN(dobDate.getTime()) || dobDate >= now) {
            document.getElementById("err_dob").textContent = "Date of birth must be a valid date in the past.";
            valid = false;
        }
    }

    // City
    if (city === "") {
        document.getElementById("err_city").textContent = "Please select a city.";
        valid = false;
    }

    // Password
    if (pass === "") {
        document.getElementById("err_pass").textContent = "Password cannot be empty.";
        valid = false;
    } else if (pass.length < 6) {
        document.getElementById("err_pass").textContent = "Password must be at least 6 characters.";
        valid = false;
    }

    // Confirm password
    if (pass !== cpass || cpass === "") {
        document.getElementById("err_cpass").textContent = "Passwords do not match.";
        valid = false;
    }

    // If valid → you can add next action
    if (valid) {
        console.log("Form submitted.");
    }
});

document.getElementById("deleteBtn").addEventListener("click", function() {
    document.getElementById("myForm").reset();
    document.querySelectorAll(".error").forEach(err => err.textContent = "");
});

// Full client-side validation and error message display in <p> tags

(function () {
    const form = document.getElementById("myForm");

    const fields = {
        name: document.getElementById("name"),
        father: document.getElementById("father"),
        mother: document.getElementById("mother"),
        phone: document.getElementById("phone"),
        age: document.getElementById("age"),
        dob: document.getElementById("dob"),
        city: document.getElementById("city"),
        pass: document.getElementById("pass"),
        cpass: document.getElementById("cpass")
    };

    const errs = {};
    Object.keys(fields).forEach(k => {
        errs[k] = document.getElementById("err_" + k);
    });

    function clearErrors() {
        Object.values(errs).forEach(p => p.textContent = "");
    }

    // Prevent letters/characters in phone; keep only digits and limit length to 11
    fields.phone.addEventListener("input", () => {
        let digits = fields.phone.value.replace(/\D/g, "").slice(0, 11);
        if (fields.phone.value !== digits) fields.phone.value = digits;
    });

    // Prevent spaces in father's name as user types (keeps user informed)
    fields.father.addEventListener("input", () => {
        if (/\s/.test(fields.father.value)) {
            // don't automatically strip; show hint/error until corrected
            errs.father.textContent = "Father's name must not contain spaces.";
        } else {
            if (errs.father.textContent === "Father's name must not contain spaces.") errs.father.textContent = "";
        }
    });

    // Optional: ensure mother's characters are letters or spaces only (helpful)
    fields.mother.addEventListener("input", () => {
        if (/[^a-zA-Z\s]/.test(fields.mother.value)) {
            errs.mother.textContent = "Mother's name can contain only letters and spaces.";
        } else {
            if (errs.mother.textContent === "Mother's name can contain only letters and spaces.") errs.mother.textContent = "";
        }
    });

    // Age: prevent decimals in display (number input allows decimals in some browsers)
    fields.age.addEventListener("input", () => {
        if (fields.age.value === "") return;
        const val = Math.floor(Number(fields.age.value));
        if (!isNaN(val) && String(val) !== fields.age.value) fields.age.value = val;
    });

    // Main submit validation
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        let valid = true;

        const name = fields.name.value.trim();
        const father = fields.father.value;
        const mother = fields.mother.value.trim();
        const phone = fields.phone.value.trim();
        const age = fields.age.value;
        const dob = fields.dob.value;
        const city = fields.city.value;
        const pass = fields.pass.value;
        const cpass = fields.cpass.value;

        // Name
        if (name === "") {
            errs.name.textContent = "Name cannot be empty.";
            valid = false;
        }

        // Father's name: must not include spaces and not empty
        if (father.trim() === "") {
            errs.father.textContent = "Father's name cannot be empty.";
            valid = false;
        } else if (/\s/.test(father)) {
            errs.father.textContent = "Father's name cannot contain spaces.";
            valid = false;
        } else if (/[^A-Za-z]/.test(father)) {
            errs.father.textContent = "Father's name must contain letters only (no digits or symbols).";
            valid = false;
        }

        // Mother's name: allow spaces; must have at least 8 letters ignoring spaces
        const motherLettersOnly = mother.replace(/\s/g, "");
        if (motherLettersOnly.length < 8) {
            errs.mother.textContent = "Mother's name must have at least 8 letters (spaces ignored).";
            valid = false;
        } else if (/[^A-Za-z\s]/.test(mother)) {
            errs.mother.textContent = "Mother's name must contain letters and spaces only.";
            valid = false;
        }

        // Phone: exactly 11 digits
        if (!/^\d{11}$/.test(phone)) {
            errs.phone.textContent = "Phone must be exactly 11 digits.";
            valid = false;
        }

        // Age: required, integer, between 1 and 120
        const ageNum = Number(age);
        if (age === "" || !Number.isInteger(ageNum) || ageNum <= 0 || ageNum > 120) {
            errs.age.textContent = "Enter a valid age (1-120).";
            valid = false;
        }

        // DOB: required and must be a valid date in past
        if (!dob) {
            errs.dob.textContent = "Please select your date of birth.";
            valid = false;
        } else {
            const dobDate = new Date(dob);
            const now = new Date();
            if (isNaN(dobDate.getTime()) || dobDate >= now) {
                errs.dob.textContent = "Date of birth must be a valid date in the past.";
                valid = false;
            }
        }

        // City
        if (!city) {
            errs.city.textContent = "Please select a city.";
            valid = false;
        }

        // Password
        if (!pass) {
            errs.pass.textContent = "Password cannot be empty.";
            valid = false;
        } else if (pass.length < 6) {
            errs.pass.textContent = "Password must be at least 6 characters.";
            valid = false;
        }

        // Confirm password
        if (!cpass) {
            errs.cpass.textContent = "Please confirm your password.";
            valid = false;
        } else if (pass !== cpass) {
            errs.cpass.textContent = "Passwords do not match.";
            valid = false;
        }

        if (!valid) {
            // Focus first field with error
            for (const k of Object.keys(errs)) {
                if (errs[k].textContent) {
                    fields[k].focus();
                    break;
                }
            }
            return;
        }

        // If valid, proceed (placeholder action)
        console.log("Form is valid. Submitting...");
        // Example: show success or actually submit.
        alert("Form submitted successfully.");
        form.reset();
        clearErrors();
    });

    // Delete (reset) button: clears values and errors
    document.getElementById("deleteBtn").addEventListener("click", function () {
        form.reset();
        clearErrors();
    });

    // Clear errors only
    document.getElementById("clearBtn").addEventListener("click", function () {
        clearErrors();
    });
})();
