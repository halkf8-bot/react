import {useState} from 'react'

const App = () => {
    console.log('kkk')

    const [num, setNum] = useState(0)
    const name = 'ha'

    const students = [
        {id: 1, name: 'G'},
        {id: 2, name: 'O'}
    ]

    // const renderStudent = () => {
    //     // const listS = []
    //     // for(const student of students){
    //     //     listS.push(<li key={student.id}>{student.name}</li>)
    //     // }
    //
    //     // const listS = students.map((student) => {
    //     //     return <li key={student.id}>{student.name}</li>
    //     // })
    //
    //     return (
    //         <>
    //             {students.map((student) => {
    //                 return <li key={student.id}>{student.name}</li>
    //             })}
    //         </>
    //     )
    // }

    const onClickBtn = () => {
        setNum(num + 1)
        console.log('onClick')
        console.log(num)
    }

    return (
      <>
        <ul>
            {/*{renderStudent()}*/}
            {students.map((student, index) => {
                return <li key={index}>{student.name}</li>
            })}
        </ul>
        <hr />
        <h1>stupid num</h1>
        <h1>{num}</h1>
        <h1>{name}</h1>
        <button onClick={onClickBtn}>Click</button>
      </>
  )
}

export default App
