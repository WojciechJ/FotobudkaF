<template>
  <div class="main-warapper">
    <div id="app">
      <div class="drop-overlay"></div>
      <div class="navbar-menu ">
        <router-link class="brand" to="/"><img class="img-fluid" src="@/assets/logo.png"/><span>Fotobudka</span></router-link>
          
          <div class="menu">
            <label class="menu-toggle" for="menu">
              
            </label>
            <ul>
              <li>
                  <router-link to="/">Strona Główna</router-link>
              </li>
              <li>
                  <router-link to="/cennik">Cennik</router-link>
              </li>
              <li>
                  <router-link to="/kontakt">Kontakt</router-link>
              </li>
              <li v-if="!isLoggedIn">
                  <router-link class="login" to="/logowanie"><font-awesome-icon icon="lock" />Logowanie</router-link>
              </li>
              <li v-if="!isLoggedIn">
                  <router-link class="register" to="/rejestracja">Rejestracja</router-link>
              </li>
              <li v-if="isLoggedIn">
                <a   @click="logout" class="btn">Wyloguj</a>
              </li>
            </ul>
          </div>
          <div class="timeline-trigger"></div>
          <span class="nav-open">
            <input type="checkbox">
            <div class="bun">
              <div class="burger"></div>
            </div>
          </span>
      </div>

      <main class="container">
        <div class="start-trigger"></div>
        <router-view/>
      </main>
    </div>
    
  </div>
</template>
<script>
import { TimelineLite } from 'gsap'
export default {
  name: "App",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    created: function() {
      this.$http.interceptors.response.use(undefined, function(err) {
        return new Promise(function(resolve, reject) {
          if (
            err.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.$store.dispatch(logout);
          }
          throw err;
        });
      });
    },
    getImgUrl(pic) {
      return require("./assets/logo.png");
    },
     
  },
  mounted(){
    const openNav = document.querySelector(".nav-open");
    const navBar = document.querySelector(".navbar-menu");

    const tl = new TimelineLite({paused: true, reversed: true});

    if(tl.reversed()){
      tl.to(navBar, 1, { x: "5px"  });
    }
    else{
      tl.to(navBar, 1, { width: "-5px"  });
    }
     

    openNav.addEventListener("click",(e)=>{
      if(tl.isActive()){
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }
      toggleTween(tl);
    })

    function toggleTween(tween){
      tween.reversed() ? tween.play() : tween.reverse();
    }

    let scrollpos = window.scrollY
    const header = document.querySelector(".navbar-menu")
    const header_height = header.offsetHeight
    const add_class_on_scroll = () => header.classList.add("fade-in")
    const remove_class_on_scroll = () => header.classList.remove("fade-in")
  window.addEventListener('scroll', function() { 
    scrollpos = window.scrollY;
    if (scrollpos >= header_height) { add_class_on_scroll() }
    else { remove_class_on_scroll() }
    console.log(scrollpos)
  })

  }
};
</script>
<style>

</style>
