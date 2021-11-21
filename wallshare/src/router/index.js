import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => {'../views/Home.vue'}
const SignIn = () => {'../views/SignIn.vue'}
const Register = () => {'../views/Register.vue'}
const AddPhoto = () => {'../views/AddPhoto.vue'}
const EditUser = () => {'../views/EditUser.vue'}
const User = () => { '../views/User.vue'}

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
