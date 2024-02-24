// ==UserScript==
// @name         old save img product
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.digikala.com/product/dkp-*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=digikala.com
// @grant        GM_download
// @require      https://code.jquery.com/jquery-3.6.0.min.js

// @updateURL    https://raw.githubusercontent.com/MrMostafa/tamper/main/index.js
// @downloadURL  https://raw.githubusercontent.com/MrMostafa/tamper/main/index.js

(function() {
    'use strict';
    const CloseWindows = 1;
    const myInterval = setInterval(checkPageLoad, 1000);

    function checkPageLoad() {
        const date = new Date();
        let check_error_CDN = $("h1").toArray();
        if(check_error_CDN){
            if(check_error_CDN[0].innerHTML == 'خطای ۴۲۹'){
                location.reload();
            }
        }
        let outerGallery = document.querySelector("div[data-main-image-src] div.flex.items-center.mt-5.mb-3")
        console.log("outerGallery" , outerGallery , date)
        if(outerGallery){
            myStopFunction();
            grapImages(outerGallery);
            setTimeout(() => {
                // console.log("Delayed for 1 second.");
                if(CloseWindows){
                    console.log('colse')
                    self.close()
                    window.close();
                }
            }, 500);
        }
    }

    function myStopFunction() {
        clearInterval(myInterval);
    }
    var link_img_finded = [];

    const check_duplicate_in_array=(input_array)=>{
        const duplicates =input_array.filter((item, index) =>input_array.indexOf(item) !== index);
        return Array.from(new Set(duplicates));
    }

     function grapImages (imagesSelector){
        // console.log('imagesSelector',imagesSelector);

         let arr_gallery_item = $("div[data-cro-id='pdp-album-open']").toArray();
         console.log("###########################" , arr_gallery_item);
         arr_gallery_item.forEach(e=>{
             let flag_find_img = false;
             //console.log('inner html : ', e.innerHTML);
             let img_html = e.innerHTML;
             var splited = img_html.split(/[\s"]+/)
             if(splited.length > 99) return;

             //console.log('splited', splited);
             splited.forEach(i=>{
                 if(i.startsWith('https://dkstatics-public.digikala.com/digikala-products/') && !flag_find_img){
                     flag_find_img = true;
                     var url_ = i;
                     link_img_finded.push(url_.split('?')[0]);
                     console.log('find image' , i);
                     var img_link_splited = i.split(/[\s//]+/)
                     //console.log('splited part of imgs', img_link_splited[3].split('?')[0]);

                     var arg = {
                         url: url_,
                         name: img_link_splited[3].split('?')[0]
                     };
                     // console.log('check_duplicate_in_array - link_img_finded' , check_duplicate_in_array(link_img_finded));
                     // console.log('link_img_finded' , link_img_finded);
                     GM_download(arg);
                 }
             });
             return;

             let find_1 = img_html.indexOf('srcset');
             let position = img_html.search("srcset");
             let first_part = img_html.substring(find_1);
             let second_position = first_part.indexOf('"');
             console.log('find_1', find_1 , img_html.substring(find_1));
             console.log('img find', second_position , first_part.substring(second_position));

             console.log('search : ' , position);

         })

         return;
         var newimagesSelector = $("div[data-main-image-src] div.flex.items-center.mt-5.mb-3 .p-1.ml-2").toArray();
//          newimagesSelector.forEach(e => {
//              console.log('inner image selector ' , e);
//              let flag_find_img = false;
//              console.log('inner html : ', e.innerHTML);
//              let img_html = e.innerHTML;
//              var splited = img_html.split(/[\s"]+/)
//              console.log('splited', splited);
//              if(splited.length > 99) return;

//              // return;

//              splited.forEach(i=>{
//                  if(i.startsWith('https://dkstatics-public.digikala.com/digikala-products/') && !flag_find_img){
//                      flag_find_img = true;
//                      var url_ = i;
//                      link_img_finded.push(url_.split('?')[0]);
//                      console.log('find image' , i);
//                      var img_link_splited = i.split(/[\s//]+/)
//                      //console.log('splited part of imgs', img_link_splited[3].split('?')[0]);

//                      var arg = {
//                          url: url_,
//                          name: img_link_splited[3].split('?')[0]
//                      };
//                      console.log('check_duplicate_in_array - link_img_finded' , check_duplicate_in_array(link_img_finded));
//                      console.log('link_img_finded' , link_img_finded);
//                      GM_download(arg);
//                  }
//              });

//          });
    }

    var arg = {
        url: "https://dkstatics-public.digikala.com/digikala-products/0f1a436ac4498c32150a2e052f4549f47623b980_1694093095.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
        name: "CustomFileName.jpg"
    };

    //GM_download(arg);

    // Your code here...
})();
//version 1.0.1