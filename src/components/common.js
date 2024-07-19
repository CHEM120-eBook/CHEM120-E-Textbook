export default {
    /***
        Code reference: Adeoye's blog article "How to build a Vuejs image slider"
        https://medium.com/@davidola360/how-to-create-a-vuejs-image-slider-60b4be844081
    ***/
    data(){
        return{
            count: 0,
            direction: 'forward',
            frame: 2,
            lastClick: 0,
            delay: 690,
        }
    },
    created(){
        let self = this;
        //var slide = setInterval(()=>this.slideLoop(this.direction),2000)
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
        window.addEventListener('resize', () => {this.resizeAdjust()})        
    },
    
    methods:{
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
        },

        openIframe(id) {
            document.getElementById(id).style.visibility = "visible";
        },
        closeIframe(id){
            document.getElementById(id).style.visibility = "hidden";
        },
        ////playVideo() invokes the overlay area that has a video on top of it.
        playVideo(id){
            document.getElementById(id).style.display = "flex";
        },
        //closeVideo() closes the overlay area.
        closeVideo(id){
            document.getElementById(id).style.display = "none";
        },
        play3D(id){
            document.getElementById(id).style.display = "flex";
        },
        close3D(){
            document.getElementById(id).style.display = "none";
        },
        clickOut(cls){
            const el = document.getElementsByClassName(cls);
            for (let i=0; i < el.length; i += 1) {
                el[i].style.display = "none";
            }
        },
        //handleScroll() manages the scroll bar function. Every time a user clicks Next/Previous,
        //it increases/decreases the area of a green bar that indicates where the reader is at wihtin
        //the whole slide.
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

        previous() {
            if (this.lastClick >= (Date.now() - this.delay))
                return;
            this.lastClick = Date.now();
            if(this.count > 0){ //12 because the current slide has 12 pages
                this.count--
                this.scroll("previous")
            }
            this.handleScroll()
        },

        next() {
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

        ///resetScroll(){
        ///    this.count = 0
        ///    this.direction = "forward"
        ///    this.scroll("reset")
        ///},
 
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

        /***mouseDownMethod (touchEvent) {
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
    },
}