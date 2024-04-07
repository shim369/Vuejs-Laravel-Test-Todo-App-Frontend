<template>
    <main>
        <h2>Edit Task</h2>
        <form class="task-form" @submit.prevent="updateTask" novalidate>
            <div class="add-box">
                <input type="text" name="name" class="task-input" placeholder="Add Task" autocomplete="off"
                    v-model="task.name">
                <div class="form-alert" v-if="errors.length">
                    <ul>
                        <li v-for="(error, index) in errors" :key=index>{{ error }}</li>
                    </ul>
                </div>
                <button type="submit" class="form-submit">submit</button>
            </div>
        </form>
    </main>
</template>

<script>
import axios from 'axios';
export default {
    name: 'EditTask',
    data() {
        return {
            task: {},
            errors: [],
        }
    },
    created() {
        this.getTaskById();
    },
    methods: {
        async getTaskById() {
            let url = `http://127.0.0.1:8000/api/get_task/${this.$route.params.id}`;
            await axios.get(url).then(response => {
                console.log(response);
                this.task = response.data;
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
                let url = `http://127.0.0.1:8000/api/update_task/${this.$route.params.id}`;
                await axios.post(url, formData).then((response) => {
                    console.log(response);
                    if (response.status == 200) {
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
}
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
</style>