import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Register from '../views/Register.vue'
import AddPhoto from '../views/AddPhoto.vue'
import EditUser from '../views/EditUser.vue'
import User from '../views/User.vue'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
