import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../plugins/axios';

import {
    Box, Button, TextField, Typography, Container, Paper, MenuItem,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText
} from '@mui/material';

interface Customer {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    rank: string;
}

interface ManagerProps {
    token: string;
    onLogout: () => void;
}

export default function CustomerManager({ token, onLogout }: ManagerProps) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Customer>({ name: '', email: '', phone: '', address: '', rank: 'BRONZE' });
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => { fetchCustomers(); }, []);

    const fetchCustomers = async () => {
        try {
            const res = await api.get('/customers', config);
            setCustomers(res.data);
        } catch { toast.error("Lỗi tải danh sách!"); }
    };

    const executeDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/customers/${deleteId}`, config);
            toast.success("Đã xóa khách hàng!");
            setDeleteId(null);
            fetchCustomers();
        } catch { toast.error("Lỗi khi xóa!"); }
    };

    const openModal = (customer: Customer | null = null) => {
        if (customer) {
            setFormData(customer);
            setEditId(customer.id!);
        } else {
            setFormData({ name: '', email: '', phone: '', address: '', rank: 'BRONZE' });
            setEditId(null);
        }
        setShowModal(true);
    };

    // const handleSave = async (e: React.FormEvent) => {
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/customers/${editId}`, formData, config);
                toast.success("Cập nhật thành công!");
            } else {
                await api.post('/customers', formData, config);
                toast.success("Thêm mới thành công!");
            }
            setShowModal(false);
            fetchCustomers();
        } catch { toast.error("Lưu thất bại!"); }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Quản lý Khách hàng</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>Đăng xuất</Button>
            </Box>

            {/* Thanh công cụ Tìm kiếm & Thêm mới */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TextField
                    label="Tìm kiếm tên, email..." variant="outlined" size="small"
                    value={search} onChange={e => setSearch(e.target.value)} sx={{ width: '300px' }}
                />
                <Button variant="contained" color="success" onClick={() => openModal()}>
                    + Thêm Khách hàng
                </Button>
            </Box>

            {/* Bảng dữ liệu MUI */}
            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Tên</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>SĐT</b></TableCell>
                            <TableCell><b>Hạng</b></TableCell>
                            <TableCell align="center"><b>Hành động</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCustomers.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.rank}</TableCell>
                                <TableCell align="center">
                                    <Button size="small" color="primary" onClick={() => openModal(row)} sx={{ mr: 1 }}>Sửa</Button>
                                    <Button size="small" color="error" onClick={() => setDeleteId(row.id!)}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredCustomers.length === 0 && (
                            <TableRow><TableCell colSpan={6} align="center">Không có dữ liệu</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Popup Dialog Thêm/Sửa bằng MUI */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
                <DialogTitle fontWeight="bold">{editId ? 'Sửa thông tin' : 'Thêm khách hàng'}</DialogTitle>
                <form onSubmit={handleSave}>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField label="Tên khách hàng" required fullWidth value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        <TextField label="Email" type="email" required fullWidth value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        <TextField label="Số điện thoại" fullWidth value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        <TextField label="Địa chỉ" fullWidth value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                        <TextField select label="Hạng khách hàng" fullWidth value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})}>
                            <MenuItem value="BRONZE">BRONZE</MenuItem>
                            <MenuItem value="SILVER">SILVER</MenuItem>
                            <MenuItem value="GOLD">GOLD</MenuItem>
                        </TextField>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, pt: 0 }}>
                        <Button onClick={() => setShowModal(false)} color="inherit">Hủy</Button>
                        <Button type="submit" variant="contained" color="primary">Lưu thông tin</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Popup Dialog Xác nhận Xóa */}
            <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
                <DialogTitle color="error">Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>Bạn có chắc chắn muốn xóa khách hàng này không? Hành động này không thể hoàn tác.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)} color="inherit">Hủy</Button>
                    <Button onClick={executeDelete} variant="contained" color="error">Xóa ngay</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import api from '../../plugins/axios';
//
// interface Customer {
//     id?: number;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     rank: string;
// }
//
// interface ManagerProps {
//     token: string;
//     onLogout: () => void;
// }
//
// export default function CustomerManager({ token, onLogout }: ManagerProps) {
//     const [customers, setCustomers] = useState<Customer[]>([]);
//     const [search, setSearch] = useState('');
//
//     // State quản lý Modal Thêm/Sửa
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState<Customer>({ name: '', email: '', phone: '', address: '', rank: 'BRONZE' });
//     const [editId, setEditId] = useState<number | null>(null);
//
//     // State quản lý Modal Xác nhận Xóa
//     const [deleteId, setDeleteId] = useState<number | null>(null);
//
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//
//     useEffect(() => {
//         fetchCustomers();
//     }, []);
//
//     const fetchCustomers = async () => {
//         try {
//             const res = await api.get('/customers', config);
//             setCustomers(res.data);
//         } catch (error) {
//             toast.error("Lỗi tải danh sách khách hàng!");
//         }
//     };
//
//     // 1. Hàm mở Popup xác nhận xóa
//     const confirmDelete = (id: number) => {
//         setDeleteId(id);
//     };
//
//     // 2. Hàm thực thi gọi API Xóa
//     const executeDelete = async () => {
//         if (!deleteId) return;
//         try {
//             await api.delete(`/customers/${deleteId}`, config);
//             toast.success("Đã xóa khách hàng thành công!"); // Hiện Toast msg
//             setDeleteId(null); // Đóng Popup xóa
//             fetchCustomers();  // Cập nhật lại danh sách
//         } catch (error) {
//             toast.error("Lỗi khi xóa, vui lòng thử lại!");
//         }
//     };
//
//     // Hàm mở Modal Thêm/Sửa
//     const openModal = (customer: Customer | null = null) => {
//         if (customer) {
//             setFormData(customer);
//             setEditId(customer.id!);
//         } else {
//             setFormData({ name: '', email: '', phone: '', address: '', rank: 'BRONZE' });
//             setEditId(null);
//         }
//         setShowModal(true);
//     };
//
//     const handleSave = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             if (editId) {
//                 await api.put(`/customers/${editId}`, formData, config);
//                 toast.success("Cập nhật thành công!");
//             } else {
//                 await api.post('/customers', formData, config);
//                 toast.success("Thêm mới thành công!");
//             }
//             setShowModal(false);
//             fetchCustomers();
//         } catch (error) {
//             toast.error("Lưu thất bại, vui lòng kiểm tra lại!");
//         }
//     };
//
//     const filteredCustomers = customers.filter(c =>
//         c.name.toLowerCase().includes(search.toLowerCase()) ||
//         c.email.toLowerCase().includes(search.toLowerCase())
//     );
//
//     // Các style dùng chung để code gọn
//     const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' } as const;
//     const modalStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
//     const inputStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };
//
//     return (
//         <div style={{ padding: '20px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <h2>Quản lý Khách hàng</h2>
//                 <button onClick={onLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Đăng xuất</button>
//             </div>
//
//             <div style={{ marginBottom: '15px' }}>
//                 <input
//                     type="text" placeholder="Tìm kiếm tên, email..."
//                     value={search} onChange={e => setSearch(e.target.value)}
//                     style={{ ...inputStyle, width: '250px', marginRight: '10px' }}
//                 />
//                 <button onClick={() => openModal()} style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Thêm Mới</button>
//             </div>
//
//             <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead style={{ backgroundColor: '#f8f9fa' }}>
//                 <tr>
//                     <th>ID</th><th>Tên</th><th>Email</th><th>SĐT</th><th>Hạng</th><th>Hành động</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {filteredCustomers.map(item => (
//                     <tr key={item.id}>
//                         <td>{item.id}</td><td>{item.name}</td><td>{item.email}</td>
//                         <td>{item.phone}</td><td>{item.rank}</td>
//                         <td>
//                             <button onClick={() => openModal(item)} style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}>Sửa</button>
//                             {/* Đổi từ việc gọi trực tiếp hàm xóa sang việc mở Popup */}
//                             <button onClick={() => confirmDelete(item.id!)} style={{ padding: '4px 8px', cursor: 'pointer', color: 'red' }}>Xóa</button>
//                         </td>
//                     </tr>
//                 ))}
//                 {filteredCustomers.length === 0 && (
//                     <tr><td colSpan={6} style={{ textAlign: 'center' }}>Không có dữ liệu</td></tr>
//                 )}
//                 </tbody>
//             </table>
//
//             {/* ================= GIAO DIỆN POPUP THÊM/SỬA ================= */}
//             {showModal && (
//                 <div style={overlayStyle}>
//                     <div style={modalStyle}>
//                         <h3 style={{ marginTop: 0 }}>{editId ? 'Sửa thông tin' : 'Thêm khách hàng'}</h3>
//                         <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                             <input type="text" placeholder="Tên (*)" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
//                             <input type="email" placeholder="Email (*)" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} />
//                             <input type="text" placeholder="Số điện thoại" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
//                             <input type="text" placeholder="Địa chỉ" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={inputStyle} />
//                             <select value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})} style={inputStyle}>
//                                 <option value="BRONZE">BRONZE</option>
//                                 <option value="SILVER">SILVER</option>
//                                 <option value="GOLD">GOLD</option>
//                             </select>
//                             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
//                                 <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 12px', cursor: 'pointer' }}>Hủy</button>
//                                 <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Lưu</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//
//             {/* ================= GIAO DIỆN POPUP XÁC NHẬN XÓA ================= */}
//             {deleteId && (
//                 <div style={overlayStyle}>
//                     <div style={modalStyle}>
//                         <h3 style={{ marginTop: 0, textAlign: 'center', color: '#dc3545' }}>Xác nhận xóa</h3>
//                         <p>Bạn có chắc chắn muốn xóa khách hàng này không? Hành động này không thể hoàn tác.</p>
//                         <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
//                             <button onClick={() => setDeleteId(null)} style={{ padding: '8px 12px', cursor: 'pointer' }}>Hủy</button>
//                             <button onClick={executeDelete} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Xóa ngay</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }