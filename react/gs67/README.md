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
2. **Cài đặt thêm React-Toastify (nếu chưa có):** npm install react-toastify
3. **Chạy ứng dụng:** npm run dev
4. **Đăng nhập:** Sử dụng tài khoản API cấp để truy cập vào hệ thống quản lý.

## Tính năng chính
- **Đăng nhập:** Lấy accessToken và lưu trữ vào localStorage.
- **Quản lý khách hàng:** Hiển thị danh sách khách hàng dưới dạng bảng.
- **Thao tác nhanh:** Thêm mới và Sửa thông tin trực tiếp qua Modal (Popup).
- **Xác nhận xóa:** Popup cảnh báo trước khi thực hiện xóa.
- **Tìm kiếm & Thống kê:** Tìm kiếm theo Tên/Email và hiển thị tổng số lượng khách hàng.

### 2. Giải thích Luồng dữ liệu (Data Flow)

Hiểu được luồng dữ liệu sẽ giúp bạn giải thích bài tập một cách tự tin hơn. Dưới đây là 4 giai đoạn chính trong ứng dụng của bạn:

1.  **Giai đoạn Xác thực (Authentication)**:
    * Người dùng nhập thông tin vào `Login`.
    * `Login` gọi `api.post('/auth/signin')`.
    * API trả về một mã `accessToken`.
    * Mã này được lưu vào **LocalStorage** (để khi F5 trang không bị mất đăng nhập) và cập nhật vào **State** `token` ở file `App.tsx`.

2.  **Giai đoạn Cấp quyền (Authorization)**:
    * File `App.tsx` kiểm tra nếu có `token` thì mới hiển thị component `CustomerManager`.
    * `token` được truyền xuống `CustomerManager` thông qua **Props**.
    * Mọi yêu cầu gọi API sau đó (GET, POST, PUT, DELETE) đều phải đính kèm token này trong Header: `{ Authorization: 'Bearer <token>' }`.

3.  **Giai đoạn Hiển thị (Rendering)**:
    * Khi `CustomerManager` vừa hiện ra, `useEffect` sẽ tự động kích hoạt hàm `fetchCustomers()`.
    * Dữ liệu từ API được đổ vào State `customers`.
    * Hàm `map()` sẽ duyệt qua mảng này để vẽ ra các dòng `<tr>` trên bảng.

4.  **Giai đoạn Cập nhật (Interaction)**:
    * Khi bạn Thêm/Sửa/Xóa thành công, hệ thống sẽ thực hiện 2 việc:
        1.  Hiện **Toast message** thông báo thành công.
        2.  Gọi lại hàm `fetchCustomers()` để lấy dữ liệu mới nhất từ server và cập nhật lại giao diện (giúp dữ liệu luôn "tươi").