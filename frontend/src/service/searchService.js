import { axiosService } from "./axiosService";

const search = async (keyword) => {
    return await axiosService.get("/api/search", { params: keyword });
};

export {
    search
}