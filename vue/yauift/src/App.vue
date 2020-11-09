<template>
    <div class="full" id="app">
        <nav>
            <ul class="nav">
                <li>
                    <a href="https://github.com/calico-crusade/YAUIFT">YAUIFT</a>
                </li>
                <li>
                    <router-link to="/todos">Todos</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </nav>

        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<style lang="scss">
.full {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: #011627;
    color: #fff;
    font-size: 16px;

    nav {

        background-color: #1845A5;
        height: 3rem;
        padding:0 2rem;

        .nav {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            height: 100%;

            li {
                margin: 0;
                padding: 1rem;

                &:first-child {
                    margin-right: auto;
                }
            }
        }
    }

    main {
        flex: 1;
        padding: 1rem;
    }
}
</style>
