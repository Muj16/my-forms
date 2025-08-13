const form = document.getElementById("myform");

// Patterns
const namePattern = /^[A-Za-z\s]+$/; // letters & spaces
const usernamePattern = /^[A-Za-z0-9_.]+$/; // letters, numbers, _ and .
const pakistaniPattern = /^\+92\s3[0-9]{2}-[0-9]{7}$/;


// Fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("Address");
const phone = document.getElementById("Phone");
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

// Form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // First name
    if (!namePattern.test(firstName.value.trim())) {
        firstNameError.style.display = "block";
        firstName.classList.add("error");
        isValid = false;
    } else {
        firstNameError.style.display = "none";
        firstName.classList.remove("error");
    }

    // Last name
    if (!namePattern.test(lastName.value.trim())) {
        lastNameError.style.display = "block";
        lastName.classList.add("error");
        isValid = false;
    } else {
        lastNameError.style.display = "none";
        lastName.classList.remove("error");
    }

    // Address
    if (address.value.trim() === "") {
        addressError.style.display = "block";
        address.classList.add("error");
        isValid = false;
    } else {
        addressError.style.display = "none";
        address.classList.remove("error");
    }

    // Phone
    if (!pakistaniPattern.test(phone.value)) {
        phoneError.textContent = "Enter valid phone: +92 3xx-xxxxxxx";
        phoneError.style.display = "block";
        phone.classList.add("error");
        isValid = false;
    } else {
        phoneError.style.display = "none";
        phone.classList.remove("error");
    }

    // Username
    if (!usernamePattern.test(username.value.trim())) {
        usernameError.style.display = "block";
        username.classList.add("error");
        isValid = false;
    } else {
        usernameError.style.display = "none";
        username.classList.remove("error");
    }

    // Password
    if (password.value.length < 8) {
        passwordError.style.display = "block";
        password.classList.add("error");
        isValid = false;
    } else {
        passwordError.style.display = "none";
        password.classList.remove("error");
    }

    // Confirm password
    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        confirmMessage.textContent = "Passwords do not match ❌";
        confirmMessage.style.color = "red";
        isValid = false;
    } else {
        confirmMessage.textContent = "Password matches ✅";
        confirmMessage.style.color = "green";
    }

    // Radio
    const radioChecked = form.querySelector('input[name="choice"]:checked');
    if (!radioChecked) {
        radioError.textContent = "Please select an option.";
        isValid = false;
    } else {
        radioError.textContent = "";
    }

    // Dropdown
    if (dropdown.value === "") {
        dropdownError.textContent = "Please select a valid option.";
        isValid = false;
    } else {
        dropdownError.textContent = "";
    }

    // Checkbox
    if (!checkbox.checked) {
        checkboxError.style.display = "block";
        isValid = false;
    } else {
        checkboxError.style.display = "none";
    }

    // Final decision
    if (isValid) {
        alert("Form submitted successfully ✅");
        // form.submit(); // Uncomment to actually submit
    } else {
        const firstErrorField = form.querySelector(".error");
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
            firstErrorField.focus();
        }
    }
});
