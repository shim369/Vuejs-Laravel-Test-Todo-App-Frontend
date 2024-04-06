import { createRouter, createWebHistory } from "vue-router";

import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TaskList },
        { path: '/add_task', component: AddTask },
    ]
})

export default router;