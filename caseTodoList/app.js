document.addEventListener('DOMContentLoaded', () => {
      const selectorOfUsers = document.querySelector('#user-todo');
      const todoList = document.querySelector('#todo-list');
      let userInfoArr = [];
      fetchData();

      selectorOfUsers.addEventListener('change', () => {
            console.log('выбрали пользователя');
            let selectedUserName = selectorOfUsers.value;
            let selectedUser = userInfoArr.find(user => user.userName === selectedUserName);

            if (selectedUser) {
                  let selectedUserId = selectedUser.userId;
                  fetchUserTasks(selectedUserId);
            }
      })

      async function fetchUserTasks(selectedUserId) {
            try {
                  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${selectedUserId}`);
                  if (!response.ok) {
                        throw new Error('Ошибка сети!');
                  }
                  const data = await response.json();
                  todoList.innerHTML = '';
                  data.forEach(element => {
                        const listItem = document.createElement('li');
                        listItem.className = 'todo-item';

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'checkbox';

                        const taskText = document.createElement('span');
                        taskText.className = 'task';
                        taskText.innerHTML = element.title;

                        const deleteButton = document.createElement('span');
                        deleteButton.className = 'close';
                        deleteButton.innerHTML = 'X';

                        deleteButton.addEventListener('click', () => {
                              console.log('нажата del task button');
                              removeTask(listItem);
                        })

                        listItem.appendChild(checkbox);
                        listItem.appendChild(taskText);
                        listItem.appendChild(deleteButton);

                        todoList.appendChild(listItem);
                  });
            } catch (error) {
                  console.log('There is a problem: ' + error);
            }
      }

      async function fetchData() {
            try {
                  const response = await fetch('https://jsonplaceholder.typicode.com/users');
                  if (!response.ok) {
                        throw new Error('Ошибка сети!');
                  }
                  const data = await response.json();
                  data.forEach(element => {
                        userInfoArr.push({ userId: element.id, userName: element.name });
                        console.log(userInfoArr);
                        const userName = document.createElement('option');
                        userName.innerHTML = element.name;
                        selectorOfUsers.appendChild(userName);
                  });

            } catch (error) {
                  console.log('There is a problem: ' + error);
            }

      }

      async function removeTask() {
            try {
                  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                        // Тут будет запрос на удаление. 
                  });

                  if (!response.ok) {
                        throw new Error('Ошибка сети!');
                  }
            } catch (error) {
                  console.log('There is a problem: ' + error);
            }
      }
})


