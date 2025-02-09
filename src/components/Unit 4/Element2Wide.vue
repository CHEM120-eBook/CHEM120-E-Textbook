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
                <div class="page" id="page1">
                    <p>
                        <strong>{{ introduction }}</strong>
                        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
                    </p>
                    <p style="margin-top: 27px;" >
                        <div v-for="(section, index) in sections" :key="index">
                            
                            <p v-if="section.type === 'text'">{{ section.content }}</p>
                            
                            <img v-if="section.type === 'image'" :src="require('@/assets/Unit 4/test.jpg')" :alt="section.alt" />
                            
                            <video v-if="section.type === 'video'" :src="require('@/assets/Unit 4/cat.mp4')" controls>
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
    import unit4 from '/home/shade/bioText/content/Unit 4/unit4.json';
    import unit5 from '/home/shade/bioText/content/Unit 5/unit5.json';
    
    export default {
        data() {
            return {
                units: {
                    unit4, 
                    unit5  
                },
                selectedUnit: 'unit4'
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
            pageDiv.setAttribute("id", "page");
            pageDiv.setAttribute("class", "page");

            document.getElementById("slide").appendChild(pageDiv);
            

            for (const key in this.units[this.selectedUnit]) {
                console.log(`${key}:`);
                
                const value = unit4[key];
                
                if (Array.isArray(value)) {
                    // Loop through array values
                    for (let i = 0; i < value.length; i++) {
                        if (typeof value[i] === "object" && value !== null) {
                        // Loop through object values
                            for (const innerKey in value[i]) {
                                console.log(`  ${innerKey}: ${value[i][innerKey]}`);
                                //handle accordingly according to type of content
                                if (value[i][innerKey] == "text") {
                                    let content = document.createElement("p");
                                    content.textContent = value[i]["content"];
                                    document.getElementById("page").appendChild(content);
                                }
                            }
                            continue;
                        }
                        let content = document.createElement("p");
                        let list = document.createElement("li");
                        list.textContent = value[i];
                        content.appendChild(list);
                        document.getElementById("page").appendChild(content);
                        
                        console.log(`  [${i}]:`, value[i]);
                        ///Append the content of the list into ls tag in html
                    }
                } else {
                    if (key == "title") {
                        continue;
                    }
                    let bold = document.createElement("strong");
                    let content = document.createElement("p");
                    bold.textContent = unit4[key];
                    content.appendChild(bold);
                    document.getElementById("page").appendChild(content);
                    console.log(`  ${unit4[key]}`);
                }
            }

            console.log(this.selectedUnit)
            const script = document.createElement("script");
            script.src ='@/components/common.js';
            document.body.appendChild(script);
        },

        method: {
            
        }
    };
</script>

<style src="@/components/style.css"></style>