
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
const phoneError = document.getElementById("phone-error");

function formatPhone(input) {
    // Remove everything except digits
    let numbers = input.replace(/\D/g, "");

    // Remove leading 92 if already in digits
    if (numbers.startsWith("92")) {
        numbers = numbers.slice(2);
    }

    // Force starting digit to be 3 for Pakistani mobile
    if (!numbers.startsWith("3")) {
        numbers = "3" + numbers.replace(/^./, "");
    }

    // Limit to 10 digits
    numbers = numbers.slice(0, 10);

    // Apply mask: 3xx-xxxxxxx
    let formatted = "";
    if (numbers.length > 0) {
        formatted = numbers.substring(0, 3); // 3xx
    }
    if (numbers.length > 3) {
        formatted += "-" + numbers.substring(3);
    }

    return "+92 " + formatted;
}

// Ensure +92 is always there when focusing
phoneField.addEventListener("focus", function () {
    if (!phoneField.value.startsWith("+92")) {
        phoneField.value = "+92 3";
    }
});

// Apply mask while typing
phoneField.addEventListener("input", function () {
    phoneField.value = formatPhone(phoneField.value);

    // Show error if not complete
    let rawDigits = phoneField.value.replace(/\D/g, "").slice(2); // after 92
    if (rawDigits.length < 10) {
        phoneError.style.display = "block";
    } else {
        phoneError.style.display = "none";
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
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("message");
password.addEventListener("input", function () {
    if (password.value.length < 8) {
        passwordError.style.display = "block";
        password.classList.add("error"); // Optional red border
    } else {
        passwordError.style.display = "none";
        password.classList.remove("error");
    }
});
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
    const pakistaniPattern = /^\+92[3][0-9]{2}-[0-9]{7}$/


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
    if (!pakistaniPattern.test(phoneField.value)) {
        phoneField.classList.add("error");
        phoneError.style.display = "block";
        phoneField.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        phoneField.classList.remove("error");
        phoneError.style.display = "none";
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
    if (password === "") {
        passwordError.textContent = "Password cannot be empty.";
        passwordError.style.display = "block";
    }
    else if (password.length > 8) {
        passwordError.textContent = "Password must not be more than 8 characters.";
        passwordError.style.display = "block";
    }
    else {
        passwordError.style.display = "none";
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
    if (isValid) {
        scrollToFirstError();
    } else {
        alert("Form submitted successfully ✅");
    }


});
