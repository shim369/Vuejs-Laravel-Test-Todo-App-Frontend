<template>
    <header>
        <h1><router-link class="logo" to="/">{{ title }}</router-link></h1>
        <nav>
            <ul class="nav-lists">
                <li class="nav-list"><router-link class="nav-link" to="/">Task List</router-link></li>
                <li class="nav-list"><router-link class="nav-link" to="add_task">Add Task</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'MainHeader',
    props: {
        title: String
    }
}
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.logo {
    color: #fff;
}

.nav-list {
    display: inline-block;
}

.nav-link {
    padding: .3rem 1rem;
    color: #fff;
}
</style>