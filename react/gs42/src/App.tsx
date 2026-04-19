import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import CustomerManager from './components/CustomerManager/CustomerManager.tsx';

export default function App() {
    // Kiểm tra bộ nhớ trình duyệt đã có token chưa
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />

            {/* Logic điều hướng đơn giản: Có token thì vào trong, chưa có thì ở Login */}
            {!token ? (
                <Login setToken={setToken} />
            ) : (
                <CustomerManager onLogout={handleLogout} />
            )}
        </>
    );
}