<template>
  <div class="min-h-screen-7 sticky z-20 top-0">
    <header
      class="
        md:hidden
        flex
        divide-y divide-blue-400
        w-full
        bg-blue-500
        text-white
        p-1
        flex-col
        shadow-md ring-blue-400
      "
    >
      <nav
        class="
          flex
          w-full
          h-full
          m-auto
          justify-between
          items-center
          text-3xl
          font-bold 
          p-1
        ">
        <router-link :to="signer()" :class="`flex items-center w-1/2 flex-shrink space-x-1 h-8 p-0.5 ${signedin ? 'text-green-300' : 'text-red-300'}`">
          <svg
            class="stroke-current inline-flex w-7 h-7"
            version="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.0696 21.672a7.4767 9.83 89.256 015.0337-6.6283 7.4767 9.83 89.256 0110.029.14267 7.4767 9.83 89.256 014.5778 6.765"
              fill="none"
              stroke-width="3"
            />
            <ellipse
              cx="11.658"
              cy="9.1741"
              rx="4.75"
              ry="5"
              fill="none"
              stroke-width="3"
            />
          </svg><span class="text-base inline align-bottom text-white">{{userData.firstName}}</span>
        </router-link> 
        <div class="w-1/2 flex-shrink-0 justify-between flex items-center">
        <router-link to="/" class="select-none relative -left-5 w-16 text-left">
          <span class="inline">
            <svg version="1.1" viewBox="0 0 64 64" class="fill-current inline w-10 h-10 stroke-1" xmlns="http://www.w3.org/2000/svg">
               <path d="m20.348 57.94c6.3889-4.5764 18.336-7.092 25.902-11.98 7.5654-4.8876 13.849-9.7084 14.424-20.25-.46037-11.015-9.0395-14.095-15.49-13.843-11.234.004245-21.524 18.685-18.817 21.964 31.921-20.064 21.871 5.2966-6.0186 24.108zm23.304-51.881c-6.3889 4.5764-18.336 7.092-25.902 11.98-7.5654 4.8876-13.849 9.7084-14.424 20.25.46037 11.015 9.0395 14.095 15.49 13.843 11.234-.004245 21.524-18.685 18.817-21.964-31.921 20.064-21.871-5.2966 6.0186-24.108z" />
            </svg></span
          ></router-link
        >
        <button class="h-8 w-8 p-0.5" @click="showSearch = !showSearch">
          <svg
            class="stroke-current"
            version="1.1"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8.7986 3.4892a3.7543 3.7543 0 01-2e-7 5.3094 3.7543 3.7543 0 01-5.3094 0 3.7543 3.7543 0 010-5.3094 3.7543 3.7543 0 015.3094-3e-7z"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.654"
              style="paint-order: normal"
            />
            <path
              d="m8.4199 8.4199c.38562-.38562 1.0065-.38562 1.3921 0l4.331 4.331c.38562.38562.38562 1.0065 0 1.3921-.38562.38562-1.0065.38562-1.3921 0l-4.331-4.331c-.38562-.38562-.38562-1.0065 0-1.3921z"
              fill="currentColor"
              stroke="none"
              fill-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      </nav>
      <transition name="slide-up-down">
        <div
          class="
            w-full
            flex
            items-center
            justify-center
            relative
            overflow-hidden
          "
          v-if="showSearch"
        >
          <tag-input :paint='false' class='text-gray-700' />
        </div>
      </transition>
    </header>
    <header class="hidden text-white md:flex justify-between items-center p-1.5 bg-blue-500 shadow-md">
      <div class="">
        <router-link to="/" class="select-none text-4xl font-bold">
          W<span class="inline">
            <svg
              version="1.1"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current inline w-8 h-7 stroke-1"
            >
              <path
                d="m7.6061 1.3574a1.4301 1.4301 0 00-1.953.5233 1.4301 1.4301 0 00.52233 1.9547 1.4301 1.4301 0 00.17527.083148l-3.2816 8.0511a1.4301 1.4301 0 00-1.7787.60814 1.4301 1.4301 0 00.52499 1.954 1.4301 1.4301 0 001.953-.5233 1.4301 1.4301 0 00.17702-.90816l4.3066-.59204 4.3056-.59035a1.4301 1.4301 0 00.7013 1.0431 1.4301 1.4301 0 001.953-.5233 1.4301 1.4301 0 00-.5233-1.953 1.4301 1.4301 0 00-1.5904.11017l-2.6648-3.4352-2.6658-3.4335a1.4301 1.4301 0 00.36354-.41482 1.4301 1.4301 0 00-.52499-1.954z"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                style="paint-order: normal"
              /></svg></span
          >llShare</router-link
        >
      </div>
        <div class="w-2/4">
          <input
            class="
              p-1.5
              px-2
              rounded-md
              bg-transparent
              z-10
              placeholder-gray-100
              border-2 border-green-400
              w-11/12
              outline-none
              focus:border-green-200
              transition transition-colors
              duration-100
            "
            type="search"
            name="search"
            placeholder="Search (:tag, name)"
          />
        </div>
        <router-link :to="signer()" class="h-8 p-0.5 flex items-center ">
          Sign in
          <svg
            class="stroke-current w-9 h-full"
            version="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.0696 21.672a7.4767 9.83 89.256 015.0337-6.6283 7.4767 9.83 89.256 0110.029.14267 7.4767 9.83 89.256 014.5778 6.765"
              fill="none"
              stroke-width="3"
            />
            <ellipse
              cx="11.658"
              cy="9.1741"
              rx="4.75"
              ry="5"
              fill="none"
              stroke-width="3"
            />
          </svg>
        </router-link>
    </header>
  </div>
</template>
<script>
import TagInput from '@/components/tag-input.vue'
export default {
  props: ['signedin', 'userData'],
  name: "navbar",
  components: { TagInput },
  data() {
    return {
      showSearch: false
    };
  },
  methods: {
    signer(){
      if(this.$root.signedIn){
        return `/user/${this.$root.userData.firstName.toLowerCase()}`
      } 
      return '/sign-in'
    }
  }
};
</script>
<style>
* {
  outline: none !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.slide-up-down-enter-active {
  animation: slider 200ms 0s 1 linear;
}
.slide-up-down-leave-active {
  animation: slider 200ms 0s 1 linear reverse;
}
@keyframes slider {
  from {
    max-height: 0px;
  }
  to {
    max-height: 50px;
  }
}
</style>