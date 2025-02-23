import apiResponse from "../utils/apiResponse.js";
import { login as loginService, register as registerService } from "../service/authService.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  return apiResponse(res, result.code, result.message, result.data);
};

export const register = async (req, res) => {
  const { email, password, phone } = req.body;
  const result = await registerService(email, password, phone);
  return apiResponse(res, result.code, result.message, result.data);
};
