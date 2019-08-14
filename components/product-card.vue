<template>
  <div class="product-card" @mouseover="zIndex" @mouseout="$parent.zIndex = 0">
    <div class="product-card__bg flex-c-c">
      <img :src="item.img" alt="">
    </div>
    <p class="product-name">Фритюрница DO 458 FR</p>
    <ul class="rating flex-c-c" :class="{norating : (rating == 0)}">
      <li v-for="(key,item) in 5" :class="{active : (key == rating && rating != 0)}"></li>
    </ul>
    <p class="price">{{item.price}} грн</p>
    <div class="order flex-c">
      <button class="buy flex-c-c" @click="$emit('change')"><i class="icon-cart"></i>Купить</button>
      <a href="#" class="policy"><i class="icon-balance"></i></a>
    </div>
    <ul class="product-info">
      <li v-for="(item,key) in characteristics">{{item}}</li>
    </ul>
  </div>
</template>
  <script>
    export default {
      name:"productcard",
      data: function(){
        return {
          isShow:null,
          item:this.dataProduct,
          rating: this.dataProduct.rating,
          characteristics : this.dataProduct.characteristics,
        }
      },
      props: ['dataProduct'],
      mounted: function(){
      },
      methods: {
        buy:function(){
          this.$parent.$parent.productLenght++
          console.log(this.item)
        },
        zIndex:function(){
          this.$parent.zIndex = 1;
        }
      },
    }
  </script>
  <style scoped>
    .product-card {
      position: relative;
      padding: 30px 30px 40px 30px;
      overflow: hidden;
      max-height: 370px;
      transition: max-height .15s,background .15s;
    }

    .product-card + .product-card::before {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      max-height: 365px;
      background: #e1e1e1;
      position: absolute;
      left: 4px;
      top: 0;
      z-index: -1;
    }

    .product-card__bg {
      height: 210px;
      margin-bottom: 30px;
    }

    .product-name {
      color: #414141;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 10px;
    }

    .product-card__bg img {
      max-width: 100%;
      max-height: 100%;
    }

    .rating {
      margin-bottom: 22px;
    }

    .rating li {
      width: 18px;
      height: 18px;
    }

    .price {
      font-size: 27px;
      color: #414141;
      font-weight: 600;
      text-align: center;
      line-height: 1;
      margin-bottom: 19px;
    }

    .order {
      margin-bottom: 35px;
    }

    .order .buy {
      width: 170px;
      height: 43px;
      background-color: #ff9400;
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      border-radius: 5px;
      transition: background .3s;
    }

    .order .buy i {
      font-size: 18px;
      margin-right: 20px;
    }

    .policy {
      text-align: right;
      font-size: 30px;
      width: calc(100% - 170px);
    }

    .product-info {
      line-height: 17px;
      color: #757575;
    }

    .product-info li + li {
      margin-top: 7px;
    }

    @media (min-width: 1170px) {
      .product-card:hover {
        max-height: 800px;
        background: #fff;
        box-shadow: 0px 2px 14.72px 1.28px rgba(210, 210, 210, 0.64);
      }
      .order .buy:hover {
        background: #ff8800;
      }
    }

    @media (max-width: 1169px) {
      .section-slider .product-card {
        margin: 0;
        max-height: 430px;
        padding-bottom: 0;
      }
      .product-card + .product-card::before {
        max-height: 430px;
        left: 0;
      }
      .order .buy {
        width: 250px;
      }
      .policy {
        width: calc(100% - 250px);
      }
    }

    @media (max-width: 749px) {
      .order .buy {
        width: 220px;
      }
      .policy {
        width: calc(100% - 220px);
      }
    }
  </style>
 