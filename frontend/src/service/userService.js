import { axiosService } from "./axiosService";

const getUserLogin = async () => {
    return await axiosService.get("/user/info");
};

export {
    getUserLogin
}