import slider from './slider.vue';
import {default as toggle} from '../vue-mixins/toggleClass.js';
import productcard from './product-card.vue';

var app = new Vue({
    el:'#app',
    components: { 
      slider,
      productcard,
    },
    data:{
      isScroll:false,
      url:null,
      perPage: {
        desktop: 4,
        tablet: 2,
        mobile: 1,
      },
      products: [],
      baners:[],
      currentBaner:0,
      currentScreen: 'desktop',
      productPrice:0,
      productLenght:0,
      sliderWidth: null,
      fixedMenu:false,
    },
    mixins: [toggle],
    mounted: function(){
         this.$nextTick(function() {
           window.addEventListener('resize', this.setResolution, this.cutGroup);
         });
    },
    methods: {
    handleScroll () {
      
      if(this.currentScreen == 'mobile'){
        this.fixedMenu = window.scrollY > 320;
      }else if(this.currentScreen == 'tablet'){
        this.fixedMenu = window.scrollY > 147;
      }else if(this.currentScreen == 'desktop'){
        this.fixedMenu = window.scrollY > 63;
      }
    },
    cutGroup: function(data){
      var i,j,temparray = [],chunk = this.perPage[this.currentScreen];
      
      for (i=0,j=data.length; i<j; i+=chunk) {
          temparray.push(data.slice(i, i+chunk));
      }
  
    return temparray;
    },
    detectWidth:function(){
        window.addEventListener('resize', this.setResolution);
      },
      setResolution: function(){
        var screenWidth = document.documentElement.clientWidth;
        
        if(screenWidth < 750){
          this.currentScreen = 'mobile';
        }else if( screenWidth < 1170 ){
          this.currentScreen = 'tablet';
        }else{
          this.currentScreen = 'desktop';
        };
      },
      cartCalc:function(data){
        var item = +this.products[data].price;
        
        this.productLenght += 1;
        this.productPrice += item;
      }
    },
    created:function(){
      window.addEventListener('scroll', this.handleScroll);
      this.products = productsObj;
      this.baners = banersObj;
      this.setResolution();
    }
});