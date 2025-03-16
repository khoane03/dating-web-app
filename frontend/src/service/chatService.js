import { axiosService } from "./axiosService";

const getChat = async (receiver_id) => {
    return await axiosService.get(`/chat`, { params: { receiver_id } });
};

const getListChat = async () => {
    return await axiosService.get(`/chat/list-chat`);
};

const getInfoUserChat = async (receiver_id) => {
    return await axiosService.get(`/chat/info-chat`,  { params: { receiver_id } });
};

export {
    getChat,
    getListChat,
    getInfoUserChat
};
