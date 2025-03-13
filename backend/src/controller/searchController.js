import { searchUsers } from "../service/searchService.js";

export const searchUsersHandler = async (req, res) => {

  const { age, gender, distance, userLat, userLong} = req.query; 

  if (!age) {
      return res.status(400).json({ error: "Thiếu thông tin tìm kiếm! Hãy nhập age, gender" });
  }

    const ageInt = parseInt(age, 10);
    const distanceInt = distance ? parseInt(distance, 10) : null;
    const userLatFloat = userLat ? parseFloat(userLat) : null;
    const userLongFloat = userLong ? parseFloat(userLong) : null;

  if (isNaN(ageInt) || (distance && isNaN(distanceInt))) {
      return res.status(400).json({ error: "Giá trị age hoặc distance không hợp lệ!" });
  }

  try {
      const users = await searchUsers({ age: ageInt, gender: gender === "Tất cả" ? null : gender, distance: distanceInt, userLat: userLatFloat, userLong: userLongFloat, });

      if (!Array.isArray(users)) {
        console.error("Lỗi: API không trả về mảng!", users);
        return res.status(500).json({ error: "Lỗi server! Kết quả không hợp lệ." });
    }

    if (users.length === 0) {
        return res.json({ message: "Không tìm thấy được kết quả.", results: [] });
    }

    res.json({ results: users });
} catch (error) {
    console.error("Lỗi trong searchUsersHandler:", error);
    res.status(500).json({ error: "Lỗi server! Vui lòng thử lại sau." });
}
};