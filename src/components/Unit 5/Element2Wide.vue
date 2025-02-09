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
            <div id="slide" v-if="!gridEnabled" @touchstart="touchStartMethod" @mousedown="mouseDownMethod" @keyup.left="next()" @click="isElementXPercentInViewport">
                <div class="page" id="page1">
                    <p>
                        <strong>{{ description }}</strong>
                        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
                    </p>
                    <p style="margin-top: 27px;" >
                        
                    </p>
                    <p>
                        
                    </p>
                    <p>
                        
                    </p>
                    <p>
                        
                    </p>
                </div>
                <div class="page" id="page2" v-html="fileContent">
                </div>
                <div class="page" id="page">
                    <p><strong>Bonding</strong></p>
                    <p>
                        
                    </p>
                    <p>
                    
                    </p>
                    <p>

                    </p>
                </div>
                <div class="page" id="page">
                    <p>
                    </p>
                    <p>
                    </p>
                </div>
                <div class="page" id="page">
                    <p>
                    </p>
                    <p style="margin-bottom: 30px;">
                    </p>
                </div>
                <div class="page" id="page">
                    <p style="margin-bottom: 30px;">
                    </p>
                    <p style="margin-top: 30px;">
                    </p>
                </div>
                <div class="page" id="page">
                    <p style="text-indent: 0%;">
                    </p>
                    <img src="@/assets/Unit1-BondSymbolTable.webp" style="margin:30px auto; width: 50%; cursor: pointer;" @click="playVideo('overlay'); playVideo('media5')">
                    <p>
                    </p>
                </div>
                <div class="page" id="page">
                    <p><strong>Representing structures</strong></p>
                    <p>               
                    </p>
                    <p>
                    </p>
                    <p>
                    </p>
                </div>
                <div class="page" id="page">
                    <p style="text-indent: 0%;">
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
    import unit4 from '/home/shade/bioText/content/Unit 4/unit4.json';
    import unit5 from '/home/shade/bioText/content/Unit 5/unit5.json';
    
    export default {
        data() {
            return {
                units: {
                    unit4, // Make sure unit4 is imported
                    unit5  // Make sure unit5 is imported
                },
                selectedUnit: 'unit5'
            };
        },
    
        computed: {
            title() {
                return this.units[this.selectedUnit]?.title || 'Default Title';
            },
            description() {
                return this.units[this.selectedUnit]?.content|| 'Default Content';
            },
            items() {
                return this.units[this.selectedUnit]?.items || [];
            },
        },
        mounted() {
            console.log(this.selectedUnit)
            const script = document.createElement("script");
            script.src ='@/components/common.js';
            document.body.appendChild(script);
        },
    };
</script>

<style scoped src="@/components/style.css"></style>