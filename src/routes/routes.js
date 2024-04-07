import { createRouter, createWebHistory } from "vue-router";

import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TaskList },
        { path: '/add_task', component: AddTask },
        { path: '/task/edit/:id', component: EditTask, },
    ]
})

export default router;