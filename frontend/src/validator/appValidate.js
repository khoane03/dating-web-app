const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^0\d{9,11}$/;
    return phoneRegex.test(phoneNumber);
}

const isMatch = (password, confirmPassword) => {
    return password === confirmPassword;
}

const validateRegister = (dataInput) => {
    if (!validateEmail(dataInput.email)) {
        return "Email phải có dạng ...@gmail.com";
    }
    if (!validatePhoneNumber(dataInput.phone)) {
        return "Số điện thoại không hợp lệ";
    }
    if (!validatePassword(dataInput.password)) {
        return "Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số!";
    }
    if (!isMatch(dataInput.password, dataInput.confirmPassword)) {
        return "Mật khẩu không khớp";
    }
    
    return null; 
};

const validateLogin = (dataInput) => {
    if (!validateEmail(dataInput.email)) {
        return "Email phải có dạng ...@gmail.com";
    }
    if (!validatePassword(dataInput.password)) {
        return "Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số!";
    }
    return null;
};

export {
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    validateRegister, 
    validateLogin
}