document.addEventListener('DOMContentLoaded', () => {
      const selectorOfUsers = document.querySelector('#user-todo');
      const todoList = document.querySelector('#todo-list');
      let userInfoArr = [];
      isOnline();
      fetchUsers();

      selectorOfUsers.addEventListener('change', () => {
            const selectedOptionId = selectorOfUsers.value;
            const selectedUserId = selectedOptionId.split('-')[1]; // Извлекаем user ID из id элемента
            fetchUserTasks(selectedUserId);
        });
        

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
                        listItem.id = 'todo-' + element.id;

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'checkbox';
                        checkbox.checked = element.completed;

                        const taskText = document.createElement('span');
                        taskText.className = 'task';
                        taskText.innerHTML = element.title;

                        const deleteButton = document.createElement('span');
                        deleteButton.className = 'close';
                        deleteButton.innerHTML = 'X';

                        deleteButton.addEventListener('click', () => {
                              console.log('нажата del task button');
                              removeTask(element.id);
                        })

                        listItem.appendChild(checkbox);
                        listItem.appendChild(taskText);
                        listItem.appendChild(deleteButton);

                        todoList.appendChild(listItem);
                  });
            } catch (error) {
                  console.log('There is a problem: ' + error);
                  alert('Произошла ошибка при получении данных с сервера. Пожалуйста, попробуйте позже.');
            }
      }

      async function fetchUsers() {
            try {
                  const response = await fetch('https://jsonplaceholder.typicode.com/users');
                  if (!response.ok) {
                        throw new Error('Ошибка сети!');
                  }
                  const data = await response.json();
                  data.forEach(element => {
                        userInfoArr.push({ userId: element.id, userName: element.name});
                        const userName = document.createElement('option');
                        userName.id = 'option-' + element.id;
                        userName.innerHTML = element.name;
                        selectorOfUsers.appendChild(userName);
                  });

            } catch (error) {
                  console.log('There is a problem: ' + error);
                  alert('Произошла ошибка при получении данных с сервера. Пожалуйста, попробуйте позже.');
            }

      }

      async function removeTask(taskId) {
            try {
                  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
                        method: 'DELETE',
                  });

                  if (!response.ok) {
                        throw new Error('Ошибка сети!');
                  }

                  const taskToRemove = document.getElementById(`todo-${taskId}`);
                  if (taskToRemove) {
                        console.log('выбанная задача пользователя удалена');
                        taskToRemove.remove();
                  }

            } catch (error) {
                  console.log('There is a problem: ' + error);
                  alert('Произошла ошибка при получении данных с сервера. Пожалуйста, попробуйте позже.');
            }
      }

      function isOnline() {
            document.addEventListener('click', () => {
                  if (!navigator.onLine) {
                        alert('Вы оффлайн. Подключитесь к интернету, чтобы выполнить это действие.');
                  }
            });

            document.addEventListener('keydown', () => {
                  if (!navigator.onLine) {
                        alert('Вы оффлайн. Подключитесь к интернету, чтобы выполнить это действие.');
                  }
            });

            document.addEventListener('submit', () => {
                  if (!navigator.onLine) {
                        alert('Вы оффлайн. Подключитесь к интернету, чтобы выполнить это действие.');
                  }
            });
      }
})


