import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // Thêm phần proxy này vào
        proxy: {
            '/api': {
                target: 'https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com', // Link AWS gốc
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // Xóa chữ /api khi gửi lên AWS
            }
        }
    }
})