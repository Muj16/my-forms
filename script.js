
const inputField = document.getElementById("firstName");
const errorText = document.getElementById("error-text");
const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces

inputField.addEventListener("input", function () {
    const name = inputField.value.trim();

    // Remove previous styles
    inputField.classList.remove("error", "valid");

    if (name === "" || !namePattern.test(name)) {
        inputField.classList.add("error");
        errorText.style.display = "block"; // Show error message
    } else {
        inputField.classList.add("valid");
        errorText.style.display = "none"; // Hide error message
    }
});

const lastNameField = document.getElementById("lastName");
const lastNameErrorText = document.getElementById("lastName-error");
//let lastNameNamePattern = /^[A-Za-z\s]+$/; // Only letters and spaces

lastNameField.addEventListener("input", function () {
    const name = lastNameField.value.trim();

    // Remove previous styles
    lastNameField.classList.remove("error", "valid");

    if (name === "" || !namePattern.test(name)) {
        lastNameField.classList.add("error");
        lastNameErrorText.style.display = "block"; // Show error message
    } else {
        lastNameField.classList.add("valid");
        lastNameErrorText.style.display = "none"; // Hide error message
    }
});

const phoneField = document.getElementById("Phone");
const phoneError = document.getElementById("Phone-error");

// Allow: +92XXXXXXXXXX or 03XXXXXXXXX or 3XXXXXXXXX (Pakistan)
const phonePattern = /^(\+92)?[0-9]{10}$/;

phoneField.addEventListener("input", function () {
    let phone = phoneField.value.trim();

    if (phonePattern.test(phone)) {
        phoneField.classList.remove("error");
        phoneError.style.display = "none"; // hide error text
    } else {
        phoneField.classList.add("error");
        phoneError.style.display = "block"; // show error text
    }
});
const addressField = document.getElementById("Address");
const addressError = document.getElementById("Address-error");

addressField.addEventListener("input", function () {
    let value = addressField.value.trim();

    if (value === "") {
        addressField.classList.add("error");
        addressError.style.display = "block"; // Show error
    } else {
        addressField.classList.remove("error");
        addressError.style.display = "none"; // Hide error
    }
});
const usernameField = document.getElementById("username");
const usernameError = document.getElementById("username-error");

const namepPattern = /^[A-Za-z0-9_.]+$/; // Only letters and spaces

usernameField.addEventListener("input", function () {
    let name = usernameField.value.trim();

    if (name === "" || !namepPattern.test(name)) {
        usernameField.classList.add("error");
        usernameError.style.display = "block"; // Show error
    } else {
        usernameField.classList.remove("error");
        usernameError.style.display = "none"; // Hide error
    }
});
const passwordField = document.getElementById("password");
const passwordError = document.getElementById("password-error");

passwordField.addEventListener("input", function () {
    let password = passwordField.value.trim();

    if (password.length > 8) {
        passwordField.classList.add("error");
        passwordError.style.display = "block"; // Show error
    } else {
        passwordField.classList.remove("error");
        passwordError.style.display = "none"; // Hide error
    }
});
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("message");

confirmPassword.addEventListener("input", function () {
    if (confirmPassword.value === password.value) {
        message.textContent = "Password matches ✅";
        message.style.color = "green";
    } else {
        message.textContent = "Passwords do not match ❌";
        message.style.color = "red";
    }
});
const form = document.querySelector("form"); // adjust selector if needed

form.addEventListener("submit", function (e) {
    let isValid = true;
    const radioButtons = document.querySelectorAll('input[name="choice"]');
    const errorMsg = document.getElementById("error-msg");
    let radioSelected = false;
    radioButtons.forEach(radio => {
        if (radio.checked) {
            radioSelected = true;
        }
    });
    if (!radioSelected) {
        errorMsg.textContent = "Please select at least one option.";
        isValid = false;
    } else {
        errorMsg.textContent = "";
    }
    const dropdown = document.getElementById("dropdown");
    const dropdownError = document.getElementById("dropdown-error");
    console.log(dropdown.value);
    if (!dropdown.value) {
        dropdownError.textContent = "Please select a valid option.";
        isValid = false;
    } else {
        dropdownError.textContent = "";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;


    // First Name
    if (inputField.value.trim() === "" || !namePattern.test(inputField.value.trim())) {
        inputField.classList.add("error");
        errorText.style.display = "block";
        isValid = false;
    }

    // Last Name
    if (lastNameField.value.trim() === "" || !namePattern.test(lastNameField.value.trim())) {
        lastNameField.classList.add("error");
        lastNameErrorText.style.display = "block";
        isValid = false;
    }

    // Phone
    if (!phonePattern.test(phoneField.value.trim())) {
        phoneField.classList.add("error");
        phoneError.style.display = "block";
        isValid = false;
    }

    // Address
    if (addressField.value.trim() === "") {
        addressField.classList.add("error");
        addressError.style.display = "block";
        isValid = false;
    }

    // Username
    if (usernameField.value.trim() === "" || !namepPattern.test(usernameField.value.trim())) {
        usernameField.classList.add("error");
        usernameError.style.display = "block";
        isValid = false;
    }

    // Password
    if (passwordField.value.trim().length > 13) {
        passwordField.classList.add("error");
        // passwordError.style.display = "block";
        isValid = false;
    }

    // Confirm Password
    if (passwordField.value.trim() !== confirmPassword.value.trim()) {
        confirmPassword.classList.add("error");
        message.textContent = "Passwords do not match ❌";
        message.style.color = "red";
        isValid = false;
    }

    // Stop form from saving if any error
    if (!isValid) {
        const firstErrorField = form.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
        alert("Please fix the highlighted errors before submitting.");
    } else {
        e.preventDefault(); // remove this if you actually want the form to submit to a server
        alert("Form submitted successfully ✅");
    }
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add("error");
            isValid = false;
        } else {
            field.classList.remove("error");
        }
    });

    // --- Radio button check ---
    const radioChecked = form.querySelector('input[name="choice"]:checked');
    if (!radioChecked) {
        document.getElementById("error-msg").textContent = "Please select an option.";
        isValid = false;
    } else {
        document.getElementById("error-msg").textContent = "";
    }
    if (!inputField()) isValid = true;
    if (!lastNameField()) isValid = true;
    if (!phoneField()) isValid = true;
    if (!passwordField()) isValid = true;
    if (!addressField()) isValid = true;
    if (!isValid) {
        scrollToFirstError();
    } else {
        alert("Form submitted successfully ✅");
    }


});
