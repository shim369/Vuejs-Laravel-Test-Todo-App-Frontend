<template>
    <main>
        <h2>Task List</h2>

        <section class="tasks-container">
            <div class="tasks">
                <div class="single-task" v-for="task in tasks" :key="task.id">
                    <div class="task-name">
                        <span class="check">
                            <font-awesome-icon v-if="Number(task.completed)===1" icon="fas fa-check" />
                        </span>
                        <h2>
                            {{ task.name }}
                        </h2>
                    </div>
                    <div class="task-links">
                        <button class="edit-link" @click="() => $router.push({ path: `/task/edit/${task.id}`})">
                            <font-awesome-icon icon="fas fa-edit" />
                        </button>
                        <button type="submit" class="delete-btn" @click.prevent="deleteTask(task.id)">
                            <font-awesome-icon icon="fas fa-trash" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>


<script lang="ts">
import axios from 'axios';
import { Task } from '../../types/task';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TaskList',
    data() {
        return {
            tasks: [] as Task[],
        }
    },
    created() {
        this.getTasks();
    },
    methods: {
        async getTasks() {
            let url = 'http://127.0.0.1:8000/api/tasks';
            await axios.get<{tasks: Task[]}>(url).then(response => {
                this.tasks = response.data.tasks;
                console.log(this.tasks);
            }).catch(error => {
                console.log(error);
            });
        },
        async deleteTask(id: number) {
            let url = `http://127.0.0.1:8000/api/delete_task/${id}`;
            await axios.delete(url).then(response => {
                if (response.data.code == 200) {
                    alert(response.data.message);
                    this.getTasks();
                }
            }).catch(error => {
                console.log(error);
            });
        }
    },
    mounted() {
        console.log('Task List Component mounted!');
    }
})
</script>

<style lang="scss" scope>
.tasks {
    margin-top: 3rem;

    .empty-message {
        color: var(--yellow);
        text-align: center;
        font-size: 1rem;
    }

}

.single-task {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--deep-black);
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: #302f2f 0px 8px 0px 0px;

    .task-name {
        display: flex;
    }

    .check {
        width: 20px;
        svg {
            font-size: 1rem;

            path {
                fill: var(--yellow);
            }
        }
    }

    h2 {
        font-size: 1rem;
        font-weight: normal;
        color: #fff;
    }
    
    &:has(.check svg) {
        h2 {
            color: #6a6a6a;
            text-decoration: line-through;
        }
    }
}

.task-links {
    a {
        color: #fff;
        text-decoration: none;
        transition: all .4s ease-in-out;

        &:hover {
            opacity: .8;
        }
    }

    button {
        all: unset;
        margin-left: .5rem;
        cursor: pointer;
        color: #fff;
        transition: all .4s ease-in-out;

        &:hover {
            opacity: .8;
        }
    }
}
</style>