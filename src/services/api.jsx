import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function request(config, successMessage = null, errorMessage = null) {
  try {
    const response = await apiClient(config);
    if (successMessage) {
      toast.success(successMessage);
    }
    return response.data;
  } catch (error) {
    let errorMsg = errorMessage || 'Произошла ошибка';
    if (error.response) {
      errorMsg = `Ошибка ${error.response.status}: ${error.response.data?.message || errorMsg}`;
    } else if (error.request) {
      errorMsg = 'Ошибка сети: нет ответа от сервера';
    }
    toast.error(errorMsg);
    throw new Error(errorMsg);
  }
}

export async function getTasks(filters = {}, page = 1, limit = 6) {
  const params = {
    page,
    limit,
    ...filters
  };

  return request({
    url: '/tasks',
    method: 'GET',
    params: params,
  });
}

export async function getTask(id) {
  return request({
    url: `/tasks/${id}`,
    method: 'GET',
  });
}

export async function createTask(taskData) {
  return request({
    url: '/tasks',
    method: 'POST',
    data: taskData,
  }, 'Задача успешно создана!', 'Ошибка при создании задачи');
}

export async function updateTask(id, updates) {
  return request({
    url: `/tasks/${id}`,
    method: 'PATCH',
    data: updates,
  }, 'Задача успешно обновлена!', 'Ошибка при обновлении задачи');
}

export async function deleteTask(id) {
  return request({
    url: `/tasks/${id}`,
    method: 'DELETE',
  }, 'Задача успешно удалена!', 'Ошибка при удалении задачи');
}