<template>
    <main>
        <h2>Edit Task</h2>
        <form class="task-form" @submit.prevent="updateTask" novalidate>
            <div class="edit-id-box">
                <div class="edit-title">Task ID</div>
                <p class="task-edit-id">{{ task.id }}</p>
            </div>
            <div class="edit-input-box">
                <label class="edit-title">
                    <span>Name</span>
                    <input type="text" name="name" class="task-input" placeholder="Add Task" autocomplete="off"
                        v-model="task.name">
                    <div class="form-alert" v-if="errors.length">
                        <ul>
                            <li v-for="(error, index) in errors" :key=index>{{ error }}</li>
                        </ul>
                    </div>
                </label>
            </div>
            <div class="edit-checkbox-box">
                <label class="edit-title">
                    <span>Completed/Unfinished</span>
                    <input type="checkbox" name="completed" class="task-edit-completed" v-model="task.completed">
                </label>
            </div>
            <button type="submit" class="form-submit">Edit</button>
        </form>
    </main>
</template>

<script lang="ts">
import axios from 'axios';
import { Task } from '../../types/task';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'EditTask',
    data() {
        return {
            task: {
                id: 0,
                name: '',
                completed: false,
            } as Task,
            errors: [] as string[],
        }
    },
    created() {
        this.getTaskById();
    },
    methods: {
        async getTaskById() {
            let url = `http://127.0.0.1:8000/api/get_task/${this.$route.params.id}`;
            await axios.get<Task>(url).then(response => {
                console.log(response);
                this.task = response.data;
                this.task.completed = Number(response.data.completed) === 1;
            });
        },
        async updateTask() {
            this.errors = [];
            if (!this.task.name) {
                this.errors.push("Task name is required!")
            }
            if (!this.errors.length) {
                let formData = new FormData();
                formData.append('name', this.task.name);
                formData.append('completed', this.task.completed ? '1' : '0'); 
                let url = `http://127.0.0.1:8000/api/update_task/${this.$route.params.id}`;
                await axios.post(url, formData).then((response) => {
                    console.log(response);
                    if (response.data.code == 200) {
                        alert(response.data.message);
                    } else {
                        console.log('error');
                    }
                }).catch(error => {
                    this.errors.push(error.response);
                });
            }
        }
    },
    mounted: function () {
        console.log('Edit Component Form Component Loaded...');
    }
})
</script>

<style lang="scss" scope>
.task-form {
    margin-top: 2rem;
    text-align: center;
    background: var(--deep-black);
    padding: 3rem;
    border-radius: 2px;
    box-shadow: #302f2f 0px 8px 0px 0px;

    @media (width <=800px) {
        padding: 3rem 4%;
    }

    .add-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        color: #fff;

        input[type="text"] {
            width: 100%;
            all: unset;
            padding: 1rem 1.2rem;
            text-align: left;
            color: #fff;
            border-bottom: 1px solid var(--light-gray);
            background: var(--dark-black);

            &:focus {
                background: var(--light-black);
                border-bottom: 1px solid var(--dark-black);
            }

            &::placeholder {
                color: #606060;
            }
        }
    }

    button.form-submit {
        text-align: center;
        all: unset;
        background: var(--yellow);
        padding: 1rem 2rem;
        cursor: pointer;
        border-radius: 2px;
        color: var(--dark-gray);
        width: 20%;
        min-width: 80px;
        margin: 3rem auto 0;
        transition: all .4s ease-in-out;

        &:hover {
            opacity: .8;
        }
    }

    .edit-title {
        color: var(--yellow);
        margin-bottom: .3rem;

        span {
            display: block;
        }
    }

    .edit-id-box {
        text-align: left;
        margin-bottom: 2rem;
        color: #fff;
    }

    .edit-input-box {
        text-align: left;
        width: 100%;
        margin-bottom: 2rem;

        label {
            display: flex;
            flex-direction: column;
        }

        input[type="text"] {
            width: 100%;
            all: unset;
            padding: 1rem 1.2rem;
            text-align: left;
            color: #fff;
            border-bottom: 1px solid var(--light-gray);
            background: var(--dark-black);

            &:focus {
                background: var(--light-black);
                border-bottom: 1px solid var(--dark-black);
            }

            &::placeholder {
                color: #606060;
            }
        }
    }

    .edit-checkbox-box {
        text-align: left;
    }
}

.form-alert {
    font-size: 1rem;
    color: var(--yellow);
    margin-top: 1rem;
}

.form-alert ul li {
    list-style: none;
    margin-top: 1rem;
    color: var(--yellow);
}

.checkbox-label {
    display: inline-block;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    color: #fff;

    span.checkbox-custom {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border-radius: 2px;
        transition: background-color 0.3s;

        &::after {
            content: "";
            position: absolute;
            display: none;
            left: 6px;
            top: 2px;
            width: 4px;
            height: 9px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }

    input[type="checkbox"]:checked + .checkbox-custom {
        background-color: var(--yellow);

        &::after {
            display: block;
        }
    }
}

</style>