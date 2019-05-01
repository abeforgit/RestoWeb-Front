<template>
    <div id="navbar">
        <b-navbar toggleable="md" type="light" variant="light">
            <b-navbar-brand to="/">
                RW
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/about">About</b-nav-item>
                    <b-nav-item to="/restos">Restos</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style scoped>

</style>