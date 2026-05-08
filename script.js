/*
Rules
----------
FullName.length!== 0 && word(split " ") !<2
Email Address: email.include("@, .")
Password.lenght!<8, .!lowercase, !NaN, .includes(!@#$%^&*()_+-=[]{}|;:',.<>?/)
Confirm Password===Password
Age!<18

*/

// Get the form
const form = document.getElementById("form");

// Inputs
const fullNameInput = document.getElementById("full-name");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const confirmPasswordInput = document.getElementById("confirm-password");

const ageInput = document.getElementById("age");

// Error elements
const nameError = document.getElementById("name-error");

const emailError = document.getElementById("email-error");

const passwordError = document.getElementById("password-error");

const confirmError = document.getElementById("confirm-error");

const ageError = document.getElementById("age-error");

// Helper function
function setError(input, errorElement, message) {
  input.classList.add("error");
  input.classList.remove("success");

  errorElement.textContent = message;
}

function setSuccess(input, errorElement) {
  input.classList.add("success");
  input.classList.remove("error");

  errorElement.textContent = "";
}

// FULL NAME VALIDATION
function validateFullName() {
  const fullName = fullNameInput.value.trim();

  const nameWords = fullName.split(" ").filter((word) => word !== "");

  if (fullName.length === 0) {
    setError(fullNameInput, nameError, "Full name cannot be empty");

    return false;
  }

  if (nameWords.length < 2) {
    setError(fullNameInput, nameError, "Enter at least 2 names");

    return false;
  }

  setSuccess(fullNameInput, nameError);

  return true;
}

// EMAIL VALIDATION
function validateEmail() {
  const email = emailInput.value.trim();

  if (
    !email.includes("@") ||
    !email.includes(".") ||
    email.startsWith("@") ||
    email.endsWith("@")
  ) {
    setError(emailInput, emailError, "Enter a valid email");

    return false;
  }

  setSuccess(emailInput, emailError);

  return true;
}

// PASSWORD VALIDATION
function validatePassword() {
  const password = passwordInput.value;

  // 1. Length check
  if (password.length < 8) {
    setError(
      passwordInput,
      passwordError,
      "Password must be at least 8 characters",
    );
    return false;
  }

  // 2. Uppercase check
  if (password === password.toLowerCase()) {
    setError(
      passwordInput,
      passwordError,
      "Password must contain uppercase letter",
    );
    return false;
  }

  // 3. Number check
  let hasNumber = false;

  for (let i = 0; i < password.length; i++) {
    if (!isNaN(password[i]) && password[i] !== " ") {
      hasNumber = true;
      break;
    }
  }

  if (!hasNumber) {
    setError(
      passwordInput,
      passwordError,
      "Password must contain at least 1 number",
    );
    return false;
  }

  // 4. Special character check
  const specialChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

  let hasSpecialChar = false;

  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      hasSpecialChar = true;
      break;
    }
  }

  if (!hasSpecialChar) {
    setError(
      passwordInput,
      passwordError,
      "Password must contain at least 1 special character",
    );
    return false;
  }

  // SUCCESS
  setSuccess(passwordInput, passwordError);
  return true;
}

// CONFIRM PASSWORD
function validateConfirmPassword() {
  if (passwordInput.value !== confirmPasswordInput.value) {
    setError(confirmPasswordInput, confirmError, "Passwords do not match");

    return false;
  }

  setSuccess(confirmPasswordInput, confirmError);

  return true;
}

// AGE VALIDATION
function validateAge() {
  const age = Number(ageInput.value);

  if (age < 18) {
    setError(ageInput, ageError, "Must be 18 or older");

    return false;
  }

  setSuccess(ageInput, ageError);

  return true;
}

// REAL-TIME VALIDATION
fullNameInput.addEventListener("input", validateFullName);

emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", validatePassword);

confirmPasswordInput.addEventListener("input", validateConfirmPassword);

ageInput.addEventListener("input", validateAge);

// FORM SUBMIT
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isFullNameValid = validateFullName();

  const isEmailValid = validateEmail();

  const isPasswordValid = validatePassword();

  const isConfirmValid = validateConfirmPassword();

  const isAgeValid = validateAge();

  if (
    isFullNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmValid &&
    isAgeValid
  ) {
    alert("Form submitted successfully!");
  }
});
