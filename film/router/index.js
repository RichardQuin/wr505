import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path:'/login',
            name:'login',
            component: ()=>import('../views/login.vue'),

        },

        {
            path:'/actor/:id',
            name:'actor',
            component: ()=>import('../views/actor.vue'),

        },

        {
            path:'/actors',
            name:'actors',
            component: ()=>import('../views/actors.vue'),

        },

        {
            path:'/movie/:id',
            name:'movie',
            component: ()=>import('../views/movie.vue'),

        },

        {
            path:'/movies',
            name:'movies',
            component: ()=>import('../views/movies.vue'),

        },

        {
            path:'/category/:id',
            name:'category',
            component: ()=>import('../views/category.vue'),

        },

        {
            path:'/categories',
            name:'categories',
            component: ()=>import('../views/categories.vue'),

        },

        {
            path:'/register',
            name:'register',
            component: ()=>import('../views/register.vue'),

        },

        {
            path:'/editmovie/:id',
            name:'editmovie',
            component: ()=>import('../views/EditMovie.vue'),
        },
        {
            path:'/addmovie',
            name:'addmovie',
            component: ()=>import('../views/addMovie.vue'),
        },
        {
            path:'/editcategory/:id',
            name:'editcategory',
            component: ()=>import('../views/EditCategory.vue'),
        },
        {
            path:'/addcategory/',
            name:'addcategory',
            component: ()=>import('../views/addCategory.vue'),
        },
        {
            path:'/addactor/',
            name:'addactor',
            component: ()=>import('../views/addActor.vue'),
        },
    ]
})

export default router