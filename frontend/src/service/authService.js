import { axiosService } from "./axiosService";

const login = async (email, password) => {
    console.log(email, password);
    return await axiosService.post("/auth/login",
        {
            email: email,
            password: password
        }
    );
};

const loginWithGoogle = async () => {
    return await axiosService.get("/auth/google");
}

export {
    login,
    loginWithGoogle
}