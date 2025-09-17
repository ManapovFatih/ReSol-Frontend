import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TasksPage";
import TaskFormPage from "../pages/TaskFormPage";
import TaskViewPage from "../pages/TaskViewPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/new" element={<TaskFormPage />} />
      <Route path="/tasks/edit/:id" element={<TaskFormPage />} />
      <Route path="/tasks/view/:id" element={<TaskViewPage />} />
    </Route>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;