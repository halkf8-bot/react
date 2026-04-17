import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../plugins/axios';

import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

interface LoginProps {
    setToken: (token: string) => void;
}

export default function Login({ setToken }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/signin', { email, password });
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
        <Container maxWidth="xs">
            {/* Paper tạo hiệu ứng đổ bóng cho form */}
            <Paper elevation={3} sx={{ padding: 4, marginTop: 10, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Đăng nhập hệ thống
                </Typography>

                {/* Box hoạt động như thẻ div nhưng hỗ trợ style bằng props 'sx' */}
                <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Email" variant="outlined" type="email" required fullWidth
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Mật khẩu" variant="outlined" type="password" required fullWidth
                        value={password} onChange={e => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 1 }}>
                        Đăng nhập
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../../plugins/axios';
//
// // Định nghĩa kiểu dữ liệu cho Props truyền từ App
// interface LoginProps {
//     setToken: (token: string) => void;
// }
//
// export default function Login({ setToken }: LoginProps) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//
//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             // Sử dụng instance 'api'
//             const res = await api.post('/auth/signin', { email, password });
//
//             // Axios tự động parse JSON, dữ liệu nằm trong res.data
//             if (res.data && res.data.accessToken) {
//                 localStorage.setItem('token', res.data.accessToken);
//                 setToken(res.data.accessToken);
//                 toast.success("Đăng nhập thành công!");
//             } else {
//                 toast.error("Đăng nhập thất bại!");
//             }
//         } catch (error) {
//             toast.error("Sai tài khoản hoặc lỗi kết nối!");
//         }
//     };
//
//     return (
//         <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '300px auto', textAlign: 'center' }}>
//             <h2>Login .ᐟ</h2>
//             <input
//                 type="email" placeholder="Email" required
//                 value={email} onChange={e => setEmail(e.target.value)}
//                 style={inputStyle}
//             />
//             <input
//                 type="password" placeholder="Password" required
//                 value={password} onChange={e => setPassword(e.target.value)}
//                 style={inputStyle}
//             />
//             <button type="submit" style={btnStyle}>Đăng nhập</button>
//         </form>
//     );
// }
//
// // Style cơ bản
// const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' as const };
// const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' };

