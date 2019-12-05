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
      <div>
      <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
      </div>
         
<!--
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve" width="300px">
	<g fill="#1A237E"  stroke-width="2px">
		<path d="M0,167.85v216.2c0,33,26.8,59.8,59.8,59.8h370.4c33,0,59.8-26.8,59.8-59.8v-216.2c0-31.4-25.5-56.9-56.9-56.9h-79.6
			l-1.9-8.3c-7.7-33.3-37-56.5-71.2-56.5h-70.9c-34.1,0-63.4,23.2-71.2,56.5l-1.9,8.3H56.9C25.5,110.95,0,136.55,0,167.85z
			 M146.2,135.45c5.7,0,10.6-3.9,11.9-9.5l4.1-17.8c5.2-22.1,24.6-37.5,47.3-37.5h70.9c22.7,0,42.1,15.4,47.3,37.5l4.1,17.8
			c1.3,5.5,6.2,9.5,11.9,9.5H433c17.9,0,32.4,14.5,32.4,32.4v216.2c0,19.5-15.8,35.3-35.3,35.3H59.8c-19.5,0-35.3-15.8-35.3-35.3
			v-216.2c0-17.9,14.5-32.4,32.4-32.4H146.2z"/>
		<circle cx="82.9" cy="187.75" r="16.4"/>
		<path d="M245,380.95c56.7,0,102.9-46.2,102.9-102.9s-46.2-102.9-102.9-102.9s-102.9,46.1-102.9,102.9S188.3,380.95,245,380.95z
			 M245,199.65c43.2,0,78.4,35.2,78.4,78.4s-35.2,78.4-78.4,78.4s-78.4-35.2-78.4-78.4S201.8,199.65,245,199.65z"/>
	</g>
</svg> -->
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
  // computed: {
  //   isLoggedIn: function() {
  //     return this.$store.getters.isLoggedIn;
  //   }
  // },
  methods: {
    // logout: function() {
    //   this.$store.dispatch("logout").then(() => {
    //     this.$router.push("/login");
    //   });
    // },
    // created: function() {
    //   this.$http.interceptors.response.use(undefined, function(err) {
    //     return new Promise(function(resolve, reject) {
    //       if (
    //         err.status === 401 &&
    //         err.config &&
    //         !err.config.__isRetryRequest
    //       ) {
    //         this.$store.dispatch(logout);
    //       }
    //       throw err;
    //     });
    //   });
    // },
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
    //console.log(scrollpos)
  })

  }
};
</script>
<style>

</style>
