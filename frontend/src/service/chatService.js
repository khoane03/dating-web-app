import { axiosService } from "./axiosService";

const getChat = async (receiver_id) => {
    console.log(receiver_id);
    return await axiosService.get(`/chat`, { params: { receiver_id }});
};

export { getChat };
