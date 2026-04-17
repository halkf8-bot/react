import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../plugins/axios';

// Định nghĩa kiểu dữ liệu cho Props truyền từ App
interface LoginProps {
    setToken: (token: string) => void;
}

export default function Login({ setToken }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Sử dụng instance 'api'
            const res = await api.post('/auth/signin', { email, password });

            // Axios tự động parse JSON, dữ liệu nằm trong res.data
            if (res.data && res.data.accessToken) {
                localStorage.setItem('token', res.data.accessToken);
                setToken(res.data.accessToken);
                toast.success("Đăng nhập thành công!");
            } else {
                toast.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            toast.error("Sai tài khoản hoặc lỗi kết nối!");
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '300px auto', textAlign: 'center' }}>
    <h2>Login .ᐟ</h2>
    <input
    type="email" placeholder="Email" required
    value={email} onChange={e => setEmail(e.target.value)}
    style={inputStyle}
    />
    <input
    type="password" placeholder="Password" required
    value={password} onChange={e => setPassword(e.target.value)}
    style={inputStyle}
    />
    <button type="submit" style={btnStyle}>Đăng nhập</button>
    </form>
);
}

// Style cơ bản
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' as const };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' };