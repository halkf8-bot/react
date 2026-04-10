import {useState} from 'react'

const StudentTable = () => {
    const columns = [
        {
            value: 'id',
            text: 'ID'
        },
        {
            value: 'name',
            text: 'Tên'
        },
        {
            value: 'age',
            text: 'Tuổi',
            style: {color: 'red'}
        },
        {
            value: 'class',
            text: 'lớp',
            style: {textAlign: 'center'}
        },
        {
            value: 'action',
            text: 'Hành động',
            style: {textAlign: 'center'}
        }
    ]

    // const students = [
    //     {id: 1, name: 'Student 1', age: 18, class: '5A1'},
    //     {id: 2, name: 'Student 2', age: 28, class: '6A2'},
    //     {id: 3, name: 'Student 3', age: 38, class: '7A2'},
    //     {id: 4, name: 'Student 4', age: 38, class: '8A2'},
    // ]

    const [studentList, setStudentList] = useState([
        {id: 1, name: 'Student 1', age: 18, class: '5A1'},
        {id: 2, name: 'Student 2', age: 28, class: '6A2'},
        {id: 3, name: 'Student 3', age: 38, class: '7A2'},
        {id: 4, name: 'Student 4', age: 38, class: '8A2'}
    ])

    const onEdit = (id) => {
        console.log("Đang sửa học sinh có ID:", id)
    }

    const onDe = (idToDe) => {
        const newList = studentList.filter((student) => student.id !== idToDe)
        setStudentList(newList)
    }

    return (
        <table width='20%' cellPadding={0} cellSpacing="0" border='1'>
            <thead>
                <tr>
                    {columns.map((column) => {
                        return <th key={column.value}>{column.text}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {studentList.map((student) => {
                    return (
                        <tr key={student.id}>
                            {columns.map((col) => {
                                if(col.value === 'action') {
                                    return <td style={col.style} key={col.value}>
                                        <button onClick={() => onEdit(student.id)}>Edit</button>
                                        <button onClick={() => onDe(student.id)}>Delete</button>
                                    </td>
                                }
                                return <td style={col.style} key={col.value}>{student[col.value]}</td>
                            })}
                            {/*<td>{student.id}</td>*/}
                            {/*<td>{student.name}</td>*/}
                            {/*<td>{student.age}</td>*/}
                            {/*<td>{student.class}</td>*/}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default StudentTable