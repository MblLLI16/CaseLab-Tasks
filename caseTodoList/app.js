document.addEventListener('DOMContentLoaded', () => {
      const newTodoInput = document.querySelector('#new-todo');
      const selectorOfUsers = document.querySelector('#user-todo');
      const addTaskButton = document.querySelector('.addTask-button');
      const todoList = document.querySelector('#todo-list');
      isOnline();
      fetchUsersAndTasks();

      addTaskButton.addEventListener('click', (event) => {
            const taskTitle = newTodoInput.value;
            const userId = selectorOfUsers.value;
            const completed = false;
            const authorName = selectorOfUsers.options[selectorOfUsers.selectedIndex].text;

            if (taskTitle === '') {
                  alert('Введите текст новой задачи.');
                  event.preventDefault();
            } else if (userId === 'select user') {
                  alert('Выберите пользователя, от которого добавляется задача.');
                  event.preventDefault();
            }
            console.log('пользователь выбран, срабатывает код создания таски с его авторством.')
            addTask(taskTitle, userId, completed, authorName)
      })

      async function fetchUsersAndTasks() {
            try {
                  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
                  if (!usersResponse.ok) {
                        throw new Error('Ошибка сети при получении пользователей!');
                  }
                  const users = await usersResponse.json();

                  // для селектора
                  users.forEach(user => {
                        const userNameOption = document.createElement('option');
                        userNameOption.id = 'option-' + user.id;
                        userNameOption.value = user.id; // ID пользователя
                        userNameOption.innerHTML = user.name;
                        selectorOfUsers.appendChild(userNameOption);
                  });

                  for (const user of users) {
                        const tasksResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
                        if (!tasksResponse.ok) {
                              throw new Error('Ошибка сети при получении задач пользователя!');
                        }
                        const tasks = await tasksResponse.json();

                        tasks.forEach(task => {
                              renderTask(task, user.name);
                        });
                  }
            } catch (error) {
                  console.log(`Ошибка сети: ${error.message}`);
                  console.log(`Статус ответа: ${error.response.status}`);
                  alert('Произошла ошибка при получении данных с сервера. Пожалуйста, попробуйте позже.');
            }
      }

      async function addTask(taskTitle, userId, completed, authorName) {
            try {
                const taskResponse = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: userId,
                        title: taskTitle,
                        completed: completed,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
        
                if (!taskResponse.ok) {
                    throw new Error('Ошибка при добавлении задачи');
                }
        
                const newTask = await taskResponse.json();
                
                // Добавляем задачу в интерфейс
                renderTask(newTask, authorName);
        
            } catch (error) {
                console.error('Произошла ошибка:', error);
                alert('Произошла ошибка при добавлении задачи. Пожалуйста, попробуйте позже.');
            }
        }        

      function renderTask(task, authorName) {
            const taskId = task.id;
            const taskTitle = task.title;
            const taskCompleted = task.completed;

            const listItem = document.createElement('li');
            listItem.className = 'todo-item';
            listItem.id = 'todo-' + taskId;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = taskCompleted;

            // Изменение checkbox таски
            checkbox.addEventListener('click', (event) => {
                  event.preventDefault(); // Избегаем изменений до ответа от сервера
                  toggleTaskStatus(taskId, taskCompleted);
            });

            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';

            const taskText = document.createElement('span');
            taskText.textContent = taskTitle;

            const bySpan = document.createElement('span');
            bySpan.textContent = ' by ';
            bySpan.style.fontStyle = 'italic';

            const authorSpan = document.createElement('span');
            authorSpan.textContent = authorName;
            authorSpan.style.fontWeight = 'bold';

            taskDiv.appendChild(taskText);
            taskDiv.appendChild(bySpan);
            taskDiv.appendChild(authorSpan);

            const deleteButton = document.createElement('span');
            deleteButton.className = 'close';
            deleteButton.innerHTML = 'X';

            // Удаление таски
            deleteButton.addEventListener('click', () => {
                  removeTask(taskId);
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(taskDiv);
            listItem.appendChild(deleteButton);

            todoList.appendChild(listItem);
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
                        taskToRemove.remove();
                  }

            } catch (error) {
                  console.log(`Ошибка сети: ${error.message}`);
                  console.log(`Статус ответа: ${error.response.status}`);
                  alert('Произошла ошибка при получении данных с сервера. Пожалуйста, попробуйте позже.');
            }
      }

      async function toggleTaskStatus(taskId, taskCompleted) {
            const newStatus = !taskCompleted;
            try {
                  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
                        method: 'PATCH',
                        body: JSON.stringify({
                              completed: newStatus,
                        }),
                        headers: {
                              'Content-type': 'application/json; charset=UTF-8'
                        }
                  })

                  if (!response.ok) {
                        throw new Error('Ошибка сети!');
                  }

                  const updatedTask = await response.json()
                  console.log('Ответ от сервера:', updatedTask);
                  const checkbox = document.getElementById(`todo-${taskId}`).querySelector('.checkbox');
                  checkbox.checked = updatedTask.completed;
                  console.log('изменили на сервере')
            } catch (error) {
                  console.log(`Ошибка сети: ${error.message}`);
                  console.log(`Статус ответа: ${error.response.status}`);
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


