const saveBtn = document.getElementById('btnSave')
const inputTodo = document.getElementById('name')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

saveBtn.addEventListener('click', () => {
    const myTodo = {
        id: getRandomInt(1, 100),
        name: inputTodo.value
    }

    const currentTodoStr = localStorage.getItem('todo')

    if (currentTodoStr) {
        const currentTodo = JSON.parse(currentTodoStr)
        currentTodo.push(myTodo)
        localStorage.setItem('todo', JSON.stringify([currentTodo]))
    } else {
        localStorage.setItem('todo', JSON.stringify([myTodo]))
    }
    // window.location.href = "test.html"
})

const generateTodo = () => {
    const todoListStr = localStorage.getItem('todo')
    if (todoListStr) {
        const todoList = JSON.parse(todoListStr)

        const tbody = document.querySelector('#todoList tbody')
        if (todoList && todoList.length) {
            data.forEach((todo, index) => {
                tbody.innerHTML += `
                     <tr>
                        <td>${todo.id}</td>
                        <td>${todo.name}</td>
                        <td><button>Xóa</button></td>
                    </tr>
                    `
            })
        }
    }
}

generateTodo()