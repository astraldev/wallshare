import { createRouter, createWebHashHistory } from 'vue-router'

const Home     = () => { return import('../views/Home.vue')     },
      SignIn   = () => { return import('../views/SignIn.vue')   },
      Register = () => { return import('../views/Register.vue') },
      AddPhoto = () => { return import('../views/AddPhoto.vue') },
      EditUser = () => { return import('../views/EditUser.vue') },
      User     = () => { return import('../views/User.vue')     },
      Search   = () => { return import('../views/Search.vue')   },
      ViewUser = () => { return import('../views/ViewUser.vue') }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sign-in',
    component: SignIn
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user',
    redirect: "/"
  },
  {
    path: '/search?for=:item',
    props: true,
    name: 'search',
    component: Search,
  },
  {
    path: "/user/:uname",
    props: true,
    component: User,
    children: [
      {
        path: "/user/:uname/addPhoto",
        component: AddPhoto
      },
      {
        path: '/user/:uname/edit',
        component: EditUser
      }
    ]
  },
  {
    path: '/view/:uname',
    name: 'view-user',
    props: true,
    component: ViewUser
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
