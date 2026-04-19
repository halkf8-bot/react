import axios from 'axios';

// 1. Khởi tạo api với baseURL và các header cơ bản
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// 2. Cài đặt Interceptor: "Trạm chặn" trước khi request được gửi đi
api.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage (Giả sử lúc đăng nhập bạn đã lưu vào đây)
        const token = localStorage.getItem('token');

        // Nếu có token, tự động gắn vào Header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Xử lý lỗi nếu có trước khi gửi
        return Promise.reject(error);
    }
);

export default api;