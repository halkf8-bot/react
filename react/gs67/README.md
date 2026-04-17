# Dự án Quản lý Khách hàng (ReactJS + Vite)

Dự án này là một ứng dụng web cơ bản được xây dựng để quản lý thông tin khách hàng, sử dụng API hệ thống DOM.

## Công nghệ sử dụng
- **ReactJS**: Thư viện chính để xây dựng giao diện.
- **TypeScript**: Tăng cường tính chặt chẽ và gợi ý mã nguồn.
- **Axios**: Thư viện xử lý gọi API (cấu hình tại `src/plugins/axios.ts`).
- **React-Toastify**: Hiển thị thông báo (Toast msg) cho người dùng.

## Cấu trúc thư mục
- `src/components/Login`: Xử lý đăng nhập và xác thực.
- `src/components/CustomerManager`: Chức năng chính (Xem, Thêm, Sửa, Xóa, Tìm kiếm).
- `src/plugins/axios.ts`: Cấu hình Base URL và các thiết lập chung cho API.

## Hướng dẫn cài đặt và khởi chạy
1. **Cài đặt thư viện**:
   ```bash
   npm install