export const isValidForm = (form, specificTypesToCheck = []) => {
    console.log(form);
    if (!form) {
        return false;
    }

    const inputs = form.getElementsByTagName('input');
    for (const input of inputs) {
        if (specificTypesToCheck.length > 0 && !specificTypesToCheck.includes(input.type)) {
            continue;
        }
        const error = document.getElementById(input.name + '_error');
        if (error) {
            error.innerHTML = '';
        }
    }


    let password = ''
    let isValid = true;
    for (const input of inputs) {
        console.log(input, input.type);
        if (specificTypesToCheck.length > 0 && !specificTypesToCheck.includes(input.type)) {
            continue;
        }
        if (input.disabled === true) {
            continue;
        }

        let errField = document.getElementById(input.name + '_error');
        if (errField === null) {
            errField = document.getElementById(input.id + '_error');
        }
        if (input.type === 'text') {
            if (input.name.includes('firstName') && ((isValid  = nameValidation(input)) !== true)) {
                errField.innerHTML = 'Incorrect or empty First Name!';
            } else if (input.name.includes('lastName') && ((isValid = nameValidation(input)) !== true)) {
                errField.innerHTML = 'Incorrect or empty Last Name!';
            } else if (input.id === 'email') {
                if ((isValid = emailValidation(input)) !== true) {
                    errField.innerHTML = 'Incorrect Email!';
                }
            }
        } else if (input.type === 'email') {
            if ((isValid = emailValidation(input)) !== true) {
                errField.innerHTML = 'Incorrect Email!';
            }
        } else if (input.type === 'file') {
            if ((isValid = fileValidation(input)) !== true) {
                errField.innerHTML = 'Incorrect File!';
            }
        } else if (input.type === 'password') {
            if (input.id === 'password') {
                if ((isValid = passwordValidation(input)) !== true) {
                    errField.innerHTML = 'Incorrect password!';
                }
                password = input.value;
            } else if (input.id === 'repeat_password') {
                if ((isValid = passwordRepeatValidation(input, password)) !== true) {
                    errField.innerHTML = 'Incorrect repeat password!';
                }
            }
        }
    }

    return isValid;
};

const loginValidation = (input) => {
    return /^[a-zA-Z][a-zA-Z0-9]*$/.test(input.value);
};

const nameValidation = (input) => {
    return /^[a-zA-Zа-яА-Я]+$/.test(input.value);
};

const emailValidation = (input) => {
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
};

const passwordValidation = (input) => {
    return input.value.length >= 3 && input.value.length <= 20;
};

const passwordRepeatValidation = (input, password) => {
    const value = input.value;
    return value.length >= 6 && value.length <= 10 && value === password;
};
const MAX_FILE_SIZE = 10e6;
const fileValidation = (input) => {
    const file = input.files[0];
    if (typeof file === 'undefined') {
        return true;
    }
    return file.size < MAX_FILE_SIZE && /.*\.(jpeg|png|jpg)$/i.test(file.name);
};