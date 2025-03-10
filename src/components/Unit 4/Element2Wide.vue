<template>
    <div class="background">
        <div class="container" id="container" @keyup="created">
            <div class="nav-buttons">
                <button @click="previous" class="control">
                    <
                </button>
                <button @click="next" class="control">
                    >
                </button>
            </div>
            
            <div id="overlay" class="overlay" @click="clickOut('overlay'); clickOut('media')">
                <!--
                    Overlay class rests upon the slide class. It contains video/3d model data and it expands when a user
                    selects the thumbnail picture.
                -->
            </div>
            <video id="media1" class="media" width="80%" controls>
                <source src="@/assets/Unit1-twoPeopleSharingSoda.mp4" type="video/mp4" showControl>
            </video>

            <img id="media2" class="media" width="80%" src=""> 

            <img id="media3" class="media" width="40%" src="">

            <img id="media4" class="media" width="40%" src="">

            <img id="media5" class="media" width="80%" src="">

            <img id="media6" class="media" width="80%" src="">

            <img id="media7" class="media" width="80%" src="">

            <img id="media8" class="media" width="80%" src="">

            <img id="media9" class="media" width="80%" src="">

            <p class="title">
                {{title}} 
            </p>
            <div id="slide" v-if="!gridEnabled" @touchstart="touchStartMethod" @mousedown="mouseDownMethod" @keyup.left="next()">
                <div class="page" id="1">
                    <p>
                        <strong>{{ introduction }}</strong>
                        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
                    </p>
                    <p style="margin-top: 27px;" >
                        <div v-for="(section, index) in sections" :key="index">
                            
                            <p v-if="section.type === 'text'">{{ section.content }}</p>
                            
                            <img v-if="section.type === 'image'" :src="require('/public/assets/unit4/test.jpg')" :alt="section.alt" />
                            
                            <video v-if="section.type === 'video'" :src="require('/public/assets/unit4/cat.mp4')" controls>
                                {{ section.title }}
                            </video>


                        </div>
                    </p>
                    <p>
                        
                    </p>
                    <p>
                        
                    </p>
                    <p>
                        
                    </p>
                </div>
            </div>

            <div class="progress-container">
                <div class="progress-bar" id="myBar"></div>
            </div> 
        </div>
    </div>
</template>

<script>
    /// A function to create a div in a page if detect content
    /// A function to check overflow
    /// A funciton to handle overflow
    /// A function to deal with porting photos sources
    import unit3 from '/home/shade/bioText/content/Unit 3/unit3.json';
    import unit4 from '/home/shade/bioText/content/Unit 4/unit4.json';
    import unit5 from '/home/shade/bioText/content/Unit 5/unit5.json';
    
    export default {
        props: ["btnText"],
        data() {
            return {
                units: {
                    unit3,
                    unit4, 
                    unit5
                },
                selectedUnit: this.btnText,

                count: 0, ///Keep track of pages
                lastClick: 0,
                delay: 690,

            };
        },
        computed: {
            title() {
                return this.units[this.selectedUnit]?.title || 'Default Title';
            },
            introduction() {
                return this.units[this.selectedUnit]?.introduction || 'Default Intro';
            },
            items() {
                return this.units[this.selectedUnit]?.items || [];
            },
            sections() {
                return this.units[this.selectedUnit]?.sections|| "Default Content";
            },
        },

        mounted() {
            let pageDiv = document.createElement("div");
            pageDiv.setAttribute("id", "2");
            pageDiv.setAttribute("class", "page");
            document.getElementById("slide").appendChild(pageDiv);

            let pageEl = document.getElementById("2")
            
            //Read data from JSON files and display them onto the website based on key/"type"
            for (const key in this.units[this.selectedUnit]) {
                console.log(`${key}:`);
                
                const value = this.units[this.selectedUnit][key];
                    
                console.log(`Next page id will be ${parseInt(pageEl.id, 10) + 1}`)
                
                pageEl = this.handleOverflow.call(this, pageEl)
                
                if (Array.isArray(value)) {

                    // Loop through array values
                    for (let i = 0; i < value.length; i++) {

                        pageEl = this.handleOverflow.call(this, pageEl)

                        if (typeof value[i] === "object" && value !== null) {
                        // Loop through object values
                            for (const innerKey in value[i]) {
                                console.log(`  ${innerKey}: ${value[i][innerKey]}`);
                                //handle accordingly according to type of content
                                switch (value[i][innerKey]) {
                                    case "text":
                                        let content = document.createElement("p");
                                        content.textContent = value[i]["content"];
                                        pageEl.appendChild(content);
                                        break;
                                    case "image":
                                        let imgContent = document.createElement("img");
                                        imgContent.setAttribute("src", "/public/assets/" + value[i]["src"]);
                                        pageEl.appendChild(imgContent);
                                        console.log("motherfucker why doesn't this work: " + imgContent.src)
                                        break;
                                    case "video":
                                }
                            }
                            continue;
                        }
                        let content = document.createElement("p");
                        let list = document.createElement("li");
                        list.textContent = value[i];
                        content.appendChild(list);
                        pageEl.appendChild(content);
                        
                        console.log(`  [${i}]:`, value[i]);
                        ///Append the content of the list into ls tag in html
                    }
                } else {
                    if (key == "title") {
                        continue;
                    }
                    let bold = document.createElement("strong");
                    let content = document.createElement("p");
                    bold.textContent = this.units[this.selectedUnit][key];
                    content.appendChild(bold);
                    pageEl.appendChild(content);
                    console.log(`  ${this.units[this.selectedUnit][key]}`);
                }
            }
            console.log(`Page is ${this.isOverflow(pageEl)}`)
            console.log(this.selectedUnit)

            if (parseInt(pageEl.id) % 2 != 0) {
                this.createNewPage(pageEl)
            }
        },

        created() {
            let self = this;
            window.addEventListener('scroll', this.handleScroll);
            document.onkeydown = function(e) {
                switch(e.which) {
                    case 37: 
                    self.previous()// left
                    break;

                    case 39: 
                    self.next()// right
                    break;
                } 
            };


            ///When selectedUnit is updated, reload this component and this component only (not the app)

            window.addEventListener('resize', () => {this.resizeAdjust()}) 
        },

        methods: {
            // Check if page overflows
            isOverflow(element) {
                return element.scrollHeight > element.clientHeight;
            },

            // Helper function to create a new page
            createNewPage(currentPage) {
                const newPage = document.createElement("div");
                newPage.setAttribute("id", `${parseInt(currentPage.id, 10) + 1}`);
                newPage.setAttribute("class", "page");
                document.getElementById("slide").appendChild(newPage);

                console.log(`Created new page with id: ${newPage.id}`);

                return newPage;
            },

            // Helper function to handle overflow
            handleOverflow(pageElement) {
                if (this.isOverflow(pageElement)) {
                    console.log("Overflow detected, creating new page.");

                    return this.createNewPage(pageElement);
                }
                return pageElement;
            },

            ///Readjust/fix slider position when resize window
            resizeAdjust() {
                let pageArr = document.getElementsByClassName("page");
                pageArr[this.count * 2].scrollIntoView({ 
                    behavior: "instant", 
                    block: "start", 
                    inline: "start" });
                if (window.innerWidth >= window.innerHeight && window.innerWidth > 800)  {
                    pageArr[this.count * 2 + 1].scrollIntoView({ 
                        behavior: "instant", 
                        block: "start", 
                        inline: "end" });
                }
                ///scale down elements in page until it fit (problem with this implementation: high runtime)
                // let pages = document.querySelectorAll(".page")
                // for (let i = 0; i < pages.length; i += 1) {
                //     while (!this.isOverflow(pages[i])) { 
                //         ///Scale up the element until overflow
                //     }
                    
                //     while (this.isOverflow(pages[i])) {
                //         ///scale down the element until no longer overflow
                //     }    
                // }
                ///scale up elem
            },
            
            ///Invokes the website that is hidden from view (usually games).
            openIframe(id) {
                document.getElementById(id).style.visibility = "visible";
            },
            closeIframe(id){
                document.getElementById(id).style.visibility = "hidden";
            },

            ///Invokes the overlay area that has a video on top of it.
            playVideo(id){
                document.getElementById(id).style.display = "flex";
            },
            closeVideo(id){
                document.getElementById(id).style.display = "none";
            },
            ///play3D(id){
            ///    document.getElementById(id).style.display = "flex";
            ///},
            ///close3D(){
            ///    document.getElementById(id).style.display = "none";
            ///},

            ///Escape the overlay area upon clicking out
            clickOut(cls){
                const el = document.getElementsByClassName(cls);
                for (let i=0; i < el.length; i += 1) {
                    el[i].style.display = "none";
                }
            },

            ///Manages the scroll bar behavior. 
            handleScroll() {
                let pageArr = document.getElementsByClassName("page");
                //var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                //var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                //var scrolled = (winScroll / height) * 100;
                //var totalWidth = screen.availWidth;
                var totalWidth = document.getElementById("slide").offsetWidth;
                var scrolled = (window.innerWidth <= window.innerHeight) ? totalWidth / (pageArr.length - 1) : totalWidth / (pageArr.length/2 - 1); 
                document.getElementById("myBar").style.width = scrolled*this.count + "px";
                console.log(this.count)
                
            },
            
            ///Move slide backward
            previous() {
                ///Bouncing prevention
                if (this.lastClick >= (Date.now() - this.delay))
                    return;
                this.lastClick = Date.now();
                if(this.count > 0){ //12 because the current slide has 12 pages
                    this.count--
                    this.scroll("previous")
                }
                this.handleScroll()
            },

            ///Move slide forward
            next() {
                ///Bouncing prevention
                if (this.lastClick >= (Date.now() - this.delay))
                    return;
                this.lastClick = Date.now();
                let pageArr = document.getElementsByClassName("page");
                let limit = window.innerWidth >= window.innerHeight && window.innerWidth > 600 ? pageArr.length / 2 - 1 : pageArr.length - 1;
                if(this.count < limit){
                    this.count++
                    this.scroll("next")
                }
                this.handleScroll()
                console.log(pageArr.length);
            },

            ///Creating and managing scroll behavior 
            scroll(position) {
                let el = document.getElementById("slide");
                let page = document.getElementsByClassName("page")[0].offsetWidth;
                let width = (window.innerWidth > 600) && (window.innerWidth > window.innerHeight) ? page * 2 : page;
                let scrollValue = position == 'next' ? width : -width;
                el.scrollBy({
                    left: scrollValue,
                    top: 0,
                    behavior: 'smooth'
                })
            },
    
            ///For swipability on mobile devices
            touchStartMethod (touchEvent) {
                const posXStart = touchEvent.changedTouches[0].clientX;
                const posYStart = touchEvent.changedTouches[0].clientY;
                addEventListener('touchend', (touchEvent) => this.touchEndMethod(touchEvent, posXStart, posYStart), {once: true});
            },

            touchEndMethod (touchEvent, posXStart, posYStart) {
                const posXEnd = touchEvent.changedTouches[0].clientX;
                const posYEnd = touchEvent.changedTouches[0].clientY;
                if ((Math.abs(posYEnd - posYStart) <= 50) && (Math.abs(posXEnd - posXStart) >= 100)) {
                    if (posXStart < posXEnd) {
                        this.previous(); // swipe right
                    } else if (posXStart > posXEnd) {
                        this.next(); // swipe left
                    }
                }
            },

            /*** 
            ///For swipability with mouse 
            mouseDownMethod (mouseEvent) {
                if (touchEvent.changedTouches.length !== 1) { // Only care if one finger is used
                    return;
                }
                const posXStart = touchEvent.clientX;
                addEventListener('mouseup', (touchEvent) => this.mouseUpMethod(touchEvent, posXStart), {once: true});
            },

            mouseUpMethod (touchEvent, posXStart) {
                if (touchEvent.changedTouches.length !== 1) { // Only care if one finger is used
                    return;
                }
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
    };
</script>

<style src="@/components/style.css"></style>
