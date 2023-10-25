document.addEventListener('DOMContentLoaded', () => {
      const selectorOfUsers = document.querySelector('#user-todo');
      const todoList = document.querySelector('#todo-list');
      isOnline();
      fetchUsers();

      selectorOfUsers.addEventListener('change', () => {
            const selectedUserId = selectorOfUsers.value; // ID пользователя
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
                  data.forEach(task => {
                        const taskId = task.id;
                        const taskTitle = task.title;
                        const taskCompleted = task.completed;
                        const authorName = 'имя пользователя';

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
                  data.forEach(user => {
                        const userNameOption = document.createElement('option');
                        userNameOption.id = 'option-' + user.id;
                        userNameOption.value = user.id; // ID пользователя
                        userNameOption.innerHTML = user.name;
                        selectorOfUsers.appendChild(userNameOption);
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
                        taskToRemove.remove();
                  }

            } catch (error) {
                  console.log('There is a problem: ' + error);
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

                  const checkbox = document.getElementById(`todo-${taskId}`).querySelector('.checkbox');
                  checkbox.checked = newStatus;
                  console.log('изменили на сервере')
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


