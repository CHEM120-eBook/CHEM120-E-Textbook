<template>
  <header>
    <nav>
      <div style="display: flex; flex-direction: row;">
        <div id="mySidemenu" class="sidemenu">
          <div class="sm-wrapper">
            <div class="dropdown">
              <div class="section-title" @click="openSubMenu('dropdown-content1')">Section 1</div>
              <div class="dropdown-content" id="dropdown-content1">
                <ul style="list-style-type: none; padding: 0;">
                  <li><router-link to="/unit1">Unit 1. Bonding, Introduction to Structural Representations</router-link></li>
                  <li><router-link to="/unit2">Unit 2. More Structural Representations and Isomers</router-link></li>
                  <li><router-link to="/unit3">Unit 3. </router-link></li>
                  <li><router-link to="/unit4">Unit 4. </router-link></li>
                  <li><router-link to="/">Unit 5. </router-link></li>
                  <li><router-link to="/">Unit 6. </router-link></li>
                  <li><router-link to="/">Unit 7. </router-link></li>
                  <li><router-link to="/">Unit 8. </router-link></li>
                  <li><router-link to="/">Unit 9. </router-link></li>
                  <li><router-link to="/">Unit 10. </router-link></li>
                </ul>
              </div>
            </div>
            <div class="dropdown">
              <div class="section-title" href="#" @click="openSubMenu('dropdown-content2')">Section 2</div>
              <div class="dropdown-content" id="dropdown-content2">
                <ul style="list-style-type: none; padding: 0;">
                  <li><router-link to="/">Unit 11.</router-link></li>
                  <li><router-link to="/">Unit 12. </router-link></li>
                  <li><router-link to="/">Unit 13. </router-link></li>
                </ul>
              </div>
            </div>
            <div class="section-title" href="#">Section 3</div>
          </div>
          <a href="javascript:void(0)" class="close" @click="closeSM">&times;</a>
        </div>
        <div id="pg-content">
          <div class="open" @click="openSM">&#9776;</div>
        </div>
        <router-link class="web-title" to="/" style="text-decoration: none; font-family: 'League Spartan', sans-serif;">ORGANIC CHEMISTRY E-TEXT</router-link>
      </div>
      <a href="https://www.depauw.edu/academics/chemistry-and-biochemistry/" target="_blank" style="width: 10%; margin-right: 2vw;">
        <img src="./assets/depauw-logo.png" style="width: 100%; cursor: pointer;" >
      </a>
    </nav>
  </header>

  <div @click="clickOut">
    <router-view/> 
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default{
  components:{
    RouterLink,
    RouterView
  },

  methods: {
    openSM(){
      if ((parseInt( document.getElementById("mySidemenu").style.width) == 450)|| (parseInt(document.getElementById("mySidemenu").style.width) == 350)) {
        this.closeSM();
      }
      else {
        if (window.innerWidth <= 1020) {
          if (window.innerWidth <= 600) {
            document.getElementById("mySidemenu").style.width ="350px";
          }
          else {
            document.getElementById("mySidemenu").style.width ="450px"
          }
        }
        else {
          document.getElementById("mySidemenu").style.width ="450px";
          document.getElementById("pg-content").style.marginLeft = "450px";
        }
      }
    },

    clickOut(){
      if ((parseInt(document.getElementById("mySidemenu").style.width) == 450) || (parseInt(document.getElementById("mySidemenu").style.width) == 350)) {
        this.closeSM();
      }
    },
    
    closeSM(){
      document.getElementById("mySidemenu").style.width = "0";
      document.getElementById("pg-content").style.marginLeft ="0";
    },

    openSubMenu(id){
      const el = document.getElementById(id);
      if (window.getComputedStyle(el).display == "block") {
        el.style.display = "none";
      }
      else {
        el.style.display = "block";
      }
    },

    /***mouseDownMethod (touchEvent) {
      const posXStart = touchEvent.clientX;
      addEventListener('mouseup', (touchEvent) => this.mouseUpMethod(touchEvent, posXStart), {once: true});
    },

    mouseUpMethod (touchEvent, posXStart) {
      const cellText = document.getSelection();
      const posXEnd = touchEvent.clientX;
      if (cellText.type != 'Range') {
        if (posXStart < posXEnd) {
          this.previous(); // swipe right
        } else if (posXStart > posXEnd) {
          this.next(); // swipe left
        }
      }
    },***/
  }
}
</script>

<style>
#app {
  font-family: "League Spartan", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(72, 72, 72);
  overflow: hidden;
  max-width: 100%;
}

header{
  background-color: rgb(255, 255, 130);
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42afb9;
}

/* RouterLink */
.overlay{
  position:fixed;
  background-color: rgba(67, 67, 67, 0.6);
  width:100%;
  height:100%;
  color:white;
  cursor: pointer;
  display:none;
}

.web-title {
  min-width: fit-content !important;
  display: flex;
  align-items: center;
  margin-left: 3%;
  font-size: 200% !important;
}

.open {
  margin: 0%;
  font-size:2vw;
  cursor:pointer;
  color:#5b5b5b
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 3vw !important;
}
/* SIDE MENU PART */
 
.sm-wrapper{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
 
.sidemenu{
  display: flex;
  text-wrap:nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(72, 72, 72);
  transition: 0.5s;
  padding-top: 10px;
  -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
  scrollbar-width: none;  /* Hide scrollbar for Firefox */
}

/* Hide scrollbar for IE, Edge and Firefox */
.sidemenu::-webkit-scrollbar {
  display: none;
}

.sidemenu a{
  margin:15px 20px;
  text-decoration: none;
  font-size: 15px;
  font-family: "League Spartan", sans-serif;
  color: #ffffff;
  display: block;
  margin-bottom: 20px;
  transition: 0.3s;
  }
 
.sidemenu .close{
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 20px;
  margin-left: 50px;
}
 
  /* SIDE MENU HOVER EFFECT */
 
.sm-wrapper a:after{
  z-index: -1;
  position: absolute;
  left: 0%;
  width: 0;
  height: 20px;
  background: #e85e4f;
  content: '';
  transition: width 0.35s ease-in-out;
}
 
.sm-wrapper a:hover:after{
  width: 3%;
}
 
.sm-wrapper a:hover{
  padding-left: 5px;
  transition: 0.35s ease-in-out;
}

.dropdown-content {
  width: 50px;
  display: none;
  color: white;
  font-family: "League Spartan", sans-serif;
  font-size: 11px;
}


.section-title {
  cursor: pointer;
  display: flex; 
  min-width: 400px; 
  justify-content: center;
  margin:15px 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  font-family: "League Spartan", sans-serif;
  color: #ffffff;
  display: block;
  margin-bottom: 20px;
  transition: 0.3s;
}
 
#pg-content{
  display: flex;
  align-items: center;
  transition: margin-left 0.5s;
  padding: 5px;
}

@media screen and (max-width: 600px), 
(orientation: portrait) {
  .web-title {
    font-size: 150% !important;
  }
  .open {
    font-size: 100% !important;
  }
  .section-title {
    min-width: 300px;
  }
  .web-title {
    min-height: 200% !important;
  }
  nav {
    height: 59px !important;
  }
}

@media screen and (max-width: 365px) {
  .web-title {
    font-size: 130% !important;
  }
  .open {
    font-size: 100% !important;
  }

  .section-title {
    min-width: 300px;
  }
}

@media screen and (min-width: 2300px) {
  .web-title {
    font-size: 300% !important;
  }
}
</style>
