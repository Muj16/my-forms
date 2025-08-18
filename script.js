// Patterns
const namePattern = /^[A-Za-z\s]+$/;
const usernamePattern = /^[A-Za-z0-9_.]+$/;
const pakistaniPattern = /^\+92\s3[0-9]{2}-[0-9]{7}$/;

// Forms
const formStep1 = document.getElementById("form-step1");
const formStep2 = document.getElementById("form-step2");
const backBtn = document.getElementById("backBtn");

// Fields (Step 1)
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("Address");
const phone = document.getElementById("Phone");

// Fields (Step 2)
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const dropdown = document.getElementById("dropdown");
const checkbox = document.getElementById("remember-Me");

// Error fields
const firstNameError = document.getElementById("error-text");
const lastNameError = document.getElementById("lastName-error");
const addressError = document.getElementById("Address-error");
const phoneError = document.getElementById("phone-error");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const confirmMessage = document.getElementById("message");
const dropdownError = document.getElementById("dropdown-error");
const checkboxError = document.getElementById("checkbox-error");
const radioError = document.getElementById("error-msg");

// Format phone number
function formatPhone(input) {
    let numbers = input.replace(/\D/g, "");
    if (numbers.startsWith("92")) numbers = numbers.slice(2);
    if (!numbers.startsWith("3")) numbers = "3" + numbers.replace(/^./, "");
    numbers = numbers.slice(0, 10);
    let formatted = numbers.substring(0, 3);
    if (numbers.length > 3) formatted += "-" + numbers.substring(3);
    return "+92 " + formatted;
}
phone.addEventListener("focus", () => {
    if (!phone.value.startsWith("+92")) phone.value = "+92 3";
});
phone.addEventListener("input", () => {
    phone.value = formatPhone(phone.value);
});

// STEP 1 validation
formStep1.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    if (!namePattern.test(firstName.value.trim())) {
        firstNameError.style.display = "block";
        valid = false;
    } else {
        firstNameError.style.display = "none";
    }

    if (!namePattern.test(lastName.value.trim())) {
        lastNameError.style.display = "block";
        valid = false;
    } else {
        lastNameError.style.display = "none";
    }

    if (address.value.trim() === "") {
        addressError.style.display = "block";
        valid = false;
    } else {
        addressError.style.display = "none";
    }

    if (!pakistaniPattern.test(phone.value)) {
        phoneError.textContent = "Enter valid phone: +92 3xx-xxxxxxx";
        phoneError.style.display = "block";
        valid = false;
    } else {
        phoneError.style.display = "none";
    }

    if (valid) {
        formStep1.style.display = "none";
        formStep2.style.display = "block";
    }
});

// STEP 2 validation
formStep2.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    if (!usernamePattern.test(username.value.trim())) {
        usernameError.style.display = "block";
        valid = false;
    } else {
        usernameError.style.display = "none";
    }

    if (password.value.length < 8) {
        passwordError.style.display = "block";
        valid = false;
    } else {
        passwordError.style.display = "none";
    }

    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        confirmMessage.textContent = "Passwords do not match ❌";
        confirmMessage.style.color = "red";
        valid = false;
    } else {
        confirmMessage.textContent = "Password matches ✅";
        confirmMessage.style.color = "green";
    }

    const radioChecked = formStep2.querySelector('input[name="choice"]:checked');
    if (!radioChecked) {
        radioError.textContent = "Please select an option.";
        valid = false;
    } else {
        radioError.textContent = "";
    }

    if (dropdown.value === "") {
        dropdownError.textContent = "Please select a valid option.";
        valid = false;
    } else {
        dropdownError.textContent = "";
    }

    if (!checkbox.checked) {
        checkboxError.style.display = "block";
        valid = false;
    } else {
        checkboxError.style.display = "none";
    }

    if (valid) {
        alert("Form submitted successfully ✅");
        formStep2.reset();
        formStep1.reset();
        formStep2.style.display = "none";
        formStep1.style.display = "block";
    }
});

// Back button
backBtn.addEventListener("click", function () {
    formStep2.style.display = "none";
    formStep1.style.display = "block";
});
