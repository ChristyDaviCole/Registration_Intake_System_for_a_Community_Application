/*
Phase 1: Name & Username Validation

Requirements
Create two validation functions using regular expressions with literal notation (/.../) and the .test() method:

validateName(name):
Returns true if the name consists only of English letters and spaces (uppercase and lowercase), and is at least 2 characters long.
Returns false otherwise.

validateUsername(username):
Users must create a username between 3 and 12 characters long.
It may only contain alphanumeric word characters and underscores (\w).
The regular expression must use start (^) and end ($) boundary anchors so that the entire string is evaluated from beginning to end.
Test both functions in your script using several names and usernames from the test dataset.

Hints
Remember that without ^ and $, /pattern/ searches for any matching substring. For instance, /\w{3,12}/ will return true for a 25-character string because 12 characters within it matched!
Character sets with ranges allow multiple valid characters: ^[a-zA-Z ]{2,}$.
Quantifiers with ranges use {min,max} syntax.
Context for International Characters: In this assignment we stick to basic English letters for simplicity. However, in modern JavaScript, 
if you wanted to accept international names with accents or non-Latin scripts (like "Renée" or "Müller"), you would use the Unicode property escapes \p{L} along with the u flag: /^\p{L}+$/u.

Phase 2: Phone Verification & Promo Codes

Requirements
Implement two additional validation functions:

validatePhone(phone):
Accepts standard 10-digit phone numbers formatted with hyphens, dots, or without separators (e.g., 555-123-4567, 555.123.4567, or 5551234567).
The pattern must consist of 3 digits, an optional separator (- or .), 3 digits, an optional separator, and 4 digits.
Must use anchors (^ and $) so numbers with extra leading or trailing digits fail.

validatePromoCode(promo):
The app is running a promotional discount for the code "SUMMER".
The check must be case-insensitive, accepting "SUMMER", "summer", "Summer", etc.
Return true if the promo code matches, and false if it does not match or if the input is empty/missing.
Test both functions with inputs from the test data.

Hints
To make a separator optional, you can combine character sets with the ? quantifier: [-.]?.
In regular expressions, a dot . inside square brackets [-.] represents a literal dot, not the wildcard "any character".
The case-insensitive flag i is added after the closing slash of a regex literal (e.g., /pattern/i).

Phase 3: Capturing Groups & Phone Reformatting

Requirements
Instead of just validating phone numbers, reformat them into a clean, uniform presentation standard:

Create a function formatPhoneNumber(phone):
It takes a phone string as input.
It uses a regular expression containing three capturing groups (using parentheses ()): one for the 3-digit area code, one for the 3-digit exchange, and one for the 4-digit line number.
If the phone string is valid, use the .replace() method with backreferences ($1, $2, $3) to return the normalized format: (###) ###-#### (for example, "555-123-4567" and "5551234567" both become "(555) 123-4567").
If the input is not a valid phone number, return null.
Test formatPhoneNumber() with various phone formats from the test suite and log the formatted strings to the console.

Hints
Grouping is achieved by wrapping parts of the pattern in parentheses: ^(\d{3})[-.]?(\d{3})[-.]?(\d{4})$.
In .replace(regex, replacement), backreferences $1, $2, and $3 refer to the text matched by the first, second, and third sets of parentheses.
You can first test if validatePhone(phone) is true, or use phone.replace(...) directly and inspect the result.

Phase 4: Registration Pipeline Integration

Requirements
Integrate all individual validation and formatting routines into a single comprehensive intake function:

Create a function processRegistration(user):
Accepts a user object containing { name, username, phone, promoCode }.
Validates each field using the functions created in Phases 1–3:
Validates name and username.
Validates and reformats phone into standard format using formatPhoneNumber().
Checks if a promoCode was provided and evaluates it with validatePromoCode().
If any required field (name, username, or phone) fails validation, return a result object indicating failure along with a list of specific error messages explaining what went wrong (e.g., { success: false, errors: ["Invalid username", "Invalid phone"] }).
If all required fields are valid, return a result object indicating success, containing the sanitized data and whether the promo code discount was applied:

{
  success: true,
  data: {
    name: "Alex Johnson",
    username: "alex_j",
    phone: "(555) 234-5678",
    discountApplied: true
  }
}

In your main execution code, loop through the entire sampleUsers test array, pass each user through processRegistration(), and print the results clearly in the console.

Hints
You can collect validation errors in an array: const errors = []; and push messages if a test fails (e.g., if (!validateUsername(user.username)) errors.push("Invalid username");).
If errors.length > 0, the registration has failed.
In that case, you can pass the errors list into the error object.
Keep your code modular by calling your helper functions rather than rewriting regexes inside processRegistration().

Phase 5: Validation & Reflection

Requirements
Manual Testing & Edge Cases:
Run your completed program across the entire sampleUsers dataset and verify that valid users are formatted correctly and invalid users generate the appropriate error messages.
Add at least two new edge cases to your test run (such as a username with special characters like @, or a phone number with extra spaces or letters) to ensure your validator handles them gracefully.
AI Tutor Review (Optional / Recommended):
Upload your code along with this assignment markdown to Microsoft 365 Copilot (or another LLM) for feedback on your regex patterns and code structure.

Hints
Verify boundary conditions: does a 3-character username pass? Does a 12-character username pass? Does a 13-character username fail?
Critically evaluate any AI suggestions: ensure suggested patterns use concepts you understand and match the course level.
*/

"use strict";

// Name Validation

function validateName(name) {

    const namePattern = /^[a-zA-Z ]{2,}$/;

    return namePattern.test(name);

}

// Username validation

function validateUsername(username) {

    const usernamePattern = /^\w{3,12}$/;

    return usernamePattern.test(username);

}

// Phone Validation

function validatePhone(phone) {

    const phonePattern = /^\d{3}[-.]?\d{3}[-.]?\d{4}$/;

    return phonePattern.test(phone);

}

// Phone Number Formatting

function formatPhoneNumber(phone) {

    if (!validatePhone(phone)) {

        return null;

    }

    const phonePattern = /^(\d{3})[-.]?(\d{3})[-.]?(\d{4})$/;

    return phone.replace(phonePattern, "($1) $2-$3");

}

// Promo Code Validation

function validatePromoCode(promo) {

    if (!promo) {

        return false;

    }

    const promoPattern = /^SUMMER$/i;

    return promoPattern.test(promo);

}

function processRegistration(user) {

    const errors = [];

    // Validate name
    if (!validateName(user.name)) {

        errors.push("Invalid name");

    }

    // Validate username
    if (!validateUsername(user.username)) {

        errors.push("Invalid username");

    }

    // Validate phone
    if (!validatePhone(user.phone)) {

        errors.push("Invalid phone");

    }

    // Check for validation errors
    if (errors.length > 0) {

        return {

            success: false,
            errors: errors

        };

    }

    // Return successful registration

    return {

        success: true,
        data: {

            name: user.name,
            username: user.username,
            phone: formatPhoneNumber(user.phone),
            discountApplied: validatePromoCode(user.promoCode)

        }

    };

}

// Sample User Data

const sampleUsers = [
    {
        name: "Alex Johnson",
        username: "alex_j",
        phone: "555-234-5678",
        promoCode: "SUMMER"
    },
    {
        name: "B",
        username: "cool_user_123",
        phone: "555.345.6789",
        promoCode: "summer"
    },
    {
        name: "Charlie Brown",
        username: "charlie!brown",
        phone: "5554567890",
        promoCode: "SUMMER2026"
    },
    {
        name: "Dana Scully",
        username: "da",
        phone: "555-567-8901",
        promoCode: "SuMmEr"
    },
    {
        name: "Edward Nygma",
        username: "the_riddler_super_fan",
        phone: "555-678-901",
        promoCode: null
    },
    {
        name: "Fiona Gallagher",
        username: "fiona_g",
        phone: "555-789-0123",
        promoCode: ""
    },
    {
        name: "Grace Miller",
        username: "grace@123",
        phone: "555-234-5678",
        promoCode: "SUMMER"
    },
    {
        name: "Henry Wilson",
        username: "henry_w",
        phone: "555 234 5678",
        promoCode: "summer"
    }
];

// Test Name Validation

console.log("Name Validation:");
console.log(validateName("Alex Johnson"));
console.log(validateName("B"));
console.log(validateName("Dana Scully"));

// Test Username Validation

console.log("Username Validation:");
console.log(validateUsername("alex_j"));
console.log(validateUsername("da"));
console.log(validateUsername("the_riddler_super_fan"));

// Test Phone Validation

console.log("Phone Validation:");
console.log(validatePhone("555-234-5678"));
console.log(validatePhone("555.345.6789"));
console.log(validatePhone("5554567890"));
console.log(validatePhone("555-678-901"));

// Test Promo Code Validation

console.log("Promo Code Validation:");
console.log(validatePromoCode("SUMMER"));
console.log(validatePromoCode("summer"));
console.log(validatePromoCode("SuMmEr"));
console.log(validatePromoCode("SUMMER2026"));
console.log(validatePromoCode(""));
console.log(validatePromoCode(null));

// Test Phone Number Formatting

console.log("Phone Number Formatting");
console.log(formatPhoneNumber("555-234-5678"));
console.log(formatPhoneNumber("555.345.6789"));
console.log(formatPhoneNumber("5554567890"));
console.log(formatPhoneNumber("555-678-901"));

// Test Registration Processing

console.log("Registration Results:");

for (const user of sampleUsers) {

    const result = processRegistration(user);

    console.log(result);

}