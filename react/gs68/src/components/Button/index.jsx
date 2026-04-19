// src/components/Button/index.jsx

import React from 'react';
import './index.css'; // Nhúng file CSS thiết kế ở Bước 1 vào đây

// Component Button nhận vào 2 tham số (props):
// - children: Là đoạn chữ sẽ hiển thị bên trong nút
// - onClick: Là hàm sẽ chạy khi người dùng bấm vào nút
function Button({ children, onClick }) {
    return (
        <button className="my-basic-button" onClick={onClick}> {children} </button>
    );
}

export default Button;