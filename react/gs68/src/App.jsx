import { useState } from 'react'
import './App.css'
import Button from './components/Button/index.jsx'

function App() {
    const handleButtonClick = () => {
        alert("Tuyệt vời! Bạn vừa bấm nút.");
        // Ghi chú: Về sau, đây chính là nơi bạn sẽ viết code Axios (ví dụ: axios.get(...))
    };
  return (
    <div className="app-container">
        {/* 3. Sử dụng component Button.
          Chữ "Tải dữ liệu" sẽ được truyền vào prop 'children'.
          Hàm handleButtonClick sẽ được truyền vào prop 'onClick'. */}

        <Button onClick={handleButtonClick}> babyyboo </Button>
    </div>
  )
}

export default App
