import { searchUsers } from "../service/searchService.js";

export const searchUsersHandler = async (req, res) => {
  console.log("Received Query Params:", req.query); 

  const { age, gender} = req.query; // Lấy dữ liệu từ query

  if (!age || !gender) {
      return res.status(400).json({ error: "Thiếu thông tin tìm kiếm! Hãy nhập age, gender" });
  }

  const ageInt = parseInt(age, 10);
  // const distanceInt = parseInt(distance, 10);

  if (isNaN(ageInt)) {
      return res.status(400).json({ error: "Giá trị age hoặc distance không hợp lệ!" });
  }

  try {
      const users = await searchUsers({ age: ageInt, gender });

      if (!Array.isArray(users)) {
        console.error("Lỗi: API không trả về mảng!", users);
        return res.status(500).json({ error: "Lỗi server! Kết quả không hợp lệ." });
    }

    if (users.length === 0) {
        return res.json({ message: "🙅‍♂️ Không tìm thấy kết quả.", results: [] });
    }

    res.json({ results: users });
} catch (error) {
    console.error("Lỗi trong searchUsersHandler:", error);
    res.status(500).json({ error: "Lỗi server! Vui lòng thử lại sau." });
}
};