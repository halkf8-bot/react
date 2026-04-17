// import { useState, useEffect } from 'react'
// import api from './plugins/axios.ts'
// import { ToastContainer, toast } from 'react-toastify'
// // import MyItem from './components/Item'
// // import MyItem2 from './components/Item2'
//
// import { Item, Item2 } from './components'
//
// function App() {
//     // tạo danh sách
//     const [jobs, setJobs] = useState([])
//     const [count, setCount] = useState(0)
//     const notify = () => toast.error("Wow so easy!")
//     // call api
//     const getJobs= async () => {
//         // gọi try catch
//         try {
//             const {data} = await api.get('/todos')
//             setJobs(data)
//         } catch (e) {toast.error("Get data failed")}
//     }
//
//     useEffect(
//         () => {
//             getJobs()}, []
//     )
//
//     const [isShow, setIsShow] = useState(false)
//
//     ontoggle = () => {
//         setIsShow(!isShow)
//     }
//
//     return (
//     <>
//         <ToastContainer />
//         <button onClick={notify}>Notify!</button>
//         <Item color={'green'} text={'heheheheh'} isShow={isShow} onTg={ontoggle}/>
//         <Item2/>
//         {/*{jobs.map((job, index) => <p key={index}>{job.title}</p>)}*/}
//
//         <button onClick={() => setCount(count+1)}>CLICK</button>
//     </>
//   )
// }
//
// export default App

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import các file component vừa tách
import Login from './components/Login';
import CustomerManager from './components/CustomerManager';

export default function App() {
    // Kiểm tra xem trong bộ nhớ trình duyệt đã có token chưa
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
                <CustomerManager token={token} onLogout={handleLogout} />
            )}
        </>
    );
}

