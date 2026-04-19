import {
    Button, TextField, MenuItem,
    Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import type { Customer } from '../CommonTable/CommonTable'; // Tái sử dụng type Customer

// Khai báo những dữ liệu/hàm mà Thằng Cha (Manager) sẽ truyền xuống cho Thằng Con (Dialog)
interface CustomerDialogProps {
    open: boolean;                                     // Trạng thái bật/tắt popup
    onClose: () => void;                               // Hàm chạy khi bấm nút "Hủy" hoặc đóng
    formData: Customer;                                // Dữ liệu form hiện tại
    setFormData: (data: Customer) => void;             // Hàm để cập nhật dữ liệu khi gõ phím
    onSave: (e: React.FormEvent<HTMLFormElement>) => void; // Hàm chạy khi bấm "Lưu thông tin"
    isEdit: boolean;                                   // Biến cờ: Đang là trạng thái Sửa (true) hay Thêm mới (false)
}

export default function CustomerDialog({
                                           open, onClose, formData, setFormData, onSave, isEdit
                                       }: CustomerDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                {isEdit ? 'Sửa thông tin' : 'Thêm khách hàng'}
            </DialogTitle>
            <form onSubmit={onSave}>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Tên khách hàng" required fullWidth
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <TextField
                        label="Email" type="email" required fullWidth
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <TextField
                        label="Số điện thoại" fullWidth
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                    <TextField
                        label="Địa chỉ" fullWidth
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                    <TextField
                        select label="Hạng khách hàng" fullWidth
                        value={formData.rank}
                        onChange={e => setFormData({...formData, rank: e.target.value})}
                    >
                        <MenuItem value="BRONZE">BRONZE</MenuItem>
                        <MenuItem value="SILVER">SILVER</MenuItem>
                        <MenuItem value="GOLD">GOLD</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={onClose} color="inherit">Hủy</Button>
                    <Button type="submit" variant="contained" color="primary">Lưu thông tin</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}