<template>
    <div class="section-slider blk-margin"">
      <div class="wrapper">
        <p class="slider-title">{{sliderName}}</p>
        <section class="slider"  :class="classList" @touchstart="handleTouchStart" @touchmove="handleTouchMove" ref="slider" :style="{ height: sliderHeight +'px' }">	    
          <slot name="slider-content">
          </slot>
        </section>
        <div class="slider-control" v-if="pagesLength != 1">
          <button class="slider-button btn-prev" @click="slidePrev(), classBool = false">
            <i class="icon-arrow"></i>
          </button>
          <button class="slider-button btn-next" @click="slideNext(), classBool = true">
            <i class="icon-arrow"></i></button>
        </div>
      </div>
    </div>
  </template>

  <script>
    export default {
      data: function () {
        return {
          perPage: this.dataPpage,
          currentPage: 1,
          xDown: null,
          sliderHeight: null,
          classBool:true,
          currentScreen:this.dataCurrentScreen,
          zIndex: 0,
        }
      },
      props:['sliderName','dataPpage','dataCurrentScreen'],
      mounted: function(){
        this.sliderResize();
        this.$nextTick(function() {
          window.addEventListener('resize', this.sliderResize);
        });
      },
      created: function(){
      },
      methods: {
        slidePrev: function(){
          return this.currentPage >= 2? this.currentPage-- : null;
        },
        slideNext: function(event){
          return this.currentPage <= (this.pagesLength -1 )? this.currentPage++ : null;
        },
        handleTouchStart: function(evt) {
          this.xDown = evt.touches[0].clientX;
        },
        handleTouchMove: function(evt) {
          if ( ! this.xDown ) {
              return;
          }
          var xUp = evt.touches[0].clientX,
              xDiff = this.xDown - xUp;
  
          if(Math.abs( xDiff ) > 40){
  
            if ( Math.abs( xDiff )) {
                if ( xDiff > 0 ) {
                  (this.currentPage <= (this.pagesLength -1 ))? this.currentPage++ : null;
                  this.classBool = true;
                } else {
                  (this.currentPage >= 2)? this.currentPage-- : null;
                  this.classBool = false;
                }
            }
  
          this.xDown = null;
          }
        },
        sliderResize: function(){
        var slider = this.$refs.slider;
      
      
        this.sliderHeight = slider.getElementsByClassName('slide-list')[0].offsetHeight;
        this.$parent.sliderWidth = slider.offsetWidth;
      
      if(this.currentPage > this.pagesLength){
         this.currentPage = this.pagesLength;
      };
        },
      },
      watch:{
      currentPage:{
          handler:function(data){
          var slider = this.$refs.slider;
          
         slider.querySelector('.current').classList.remove('current');   
           slider.getElementsByClassName('slide-list')[data - 1].classList.add('current');
          
          },
        }  
      },
      computed: {
        pagesLength: function() {
          return this.$slots['slider-content'].length;
        },
        classList: function(){
        return{
          'nextSlide': this.classBool,
          'prevSlide': !this.classBool,
          'zIndex' : this.zIndex,
        }
        },
      },
    }
  </script>
  <style scoped>
    .zIndex {
      z-index: 1;
    }

    .wrapper {
      position: relative;
    }

    .slider-title {
      font-size: 18px;
      font-weight: 600;
      color: #ff9400;
      margin-bottom: 30px;
    }

    .slider {
      width: calc(100% - 30px);
      margin: auto;
      position: relative;
      -webkit-transform: translate3d(0, 0, 0);
      transition: z-index .0s;
      transition-delay: .0s;
    }

    .slide-list {
      position: absolute;
      top: 0;
      width: 0%;
      overflow: hidden;
      opacity: 0;
      transition: .5s,opacity .3s;
    }

    .slide-list__content {
      flex-wrap: nowrap;
    }

    .nextSlide .slide-list {
      left: 0;
    }

    .nextSlide .slide-list.current {
      right: 0;
      left: auto;
    }

    .prevSlide .slide-list {
      right: 0;
    }

    .prevSlide .slide-list.current {
      left: 0;
      right: auto;
    }

    .slide-list.current {
      width: 100%;
      opacity: 1;
      overflow: visible;
    }

    .section-slider + .section-slider {
      margin-top: 110px;
    }

    .section-slider .product-card {
      width: calc(25% + 10px);
      margin: 0 -5px;
    }

    .slider-control .slider-button {
      font-size: 18px;
      position: absolute;
      top: 220px;
      color: #a2a2a2;
    }

    .slider-control .slider-button.btn-prev {
      left: 15px;
    }

    .slider-control .slider-button.btn-prev i {
      transform: scaleX(-1);
      display: block;
    }

    .slider-control .slider-button.btn-next {
      right: 15px;
    }

    @media (max-width: 1169px) {
      .section-slider .product-card {
        width: 50%;
      }
      .slider {
        width: 100%;
      }
      .slider-control {
        margin-top: 30px;
        text-align: center;
      }
      .slider-control .slider-button {
        position: static;
        width: 30px;
        text-align: center;
      }
    }

    @media (max-width: 749px) {
      .section-slider .product-card {
        width: 100%;
      }
    }
  </style>
  