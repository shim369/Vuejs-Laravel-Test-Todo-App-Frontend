import { createRouter, createWebHistory} from "vue-router";

import TaskList from '../components/TaskList.vue';
import AddTask from '../components/AddTask.vue';
import EditTask from '../components/EditTask.vue';


const routes = [
    { path: '/', name: 'TaskList', component: TaskList },
    { path: '/add_task', name: 'AddTask', component: AddTask },
    { path: '/task/edit/:id', name: 'EditTask', component: EditTask, },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;