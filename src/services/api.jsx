const API_BASE_URL = 'http://localhost:5000/api';

// Общая функция для выполнения запросов
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Получить все задачи
export async function getTasks(filters = {}) {
  const queryParams = new URLSearchParams();

  if (filters.status) {
    queryParams.append('status', filters.status);
  }

  const queryString = queryParams.toString();
  const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`;

  return request(endpoint);
}

// Получить задачу по ID
export async function getTask(id) {
  return request(`/tasks/${id}`);
}

// Создать новую задачу
export async function createTask(taskData) {
  return request('/tasks', {
    method: 'POST',
    body: taskData,
  });
}

// Обновить задачу
export async function updateTask(id, updates) {
  return request(`/tasks/${id}`, {
    method: 'PATCH',
    body: updates,
  });
}

// Удалить задачу
export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE',
  });
}