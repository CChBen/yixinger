<template>
  <div class="index">
    <van-tabs :active="active" @change="onChange" sticky animated swipeable color="#00BFFF">
      <van-tab title="景点">
        <div class="firstDiv" v-if="isSceneryDataEmpty">
          <div>
            <img src="../../../static/images/noContent.png"/>
          </div>
          <div class="title">
            <span>
              暂无推荐景点
            </span>
          </div>
        </div>
        <div v-for="(item, index) in sceneryData" :key="index" class="secondDiv" v-if="!isSceneryDataEmpty"
             @click="seeDetail(item)">
          <div>
            <div class="rowBottom">
              <van-row>
                <van-col span="4" offset="1">
                  <!--<img src="http://a.hiphotos.baidu.com/lbsugc/pic/item/a9d3fd1f4134970a109dadf898cad1c8a6865d7e.jpg"/>-->
                  <img :src="item.image"/>
                </van-col>
                <van-col span="15" offset="4">
                  <div class="secondCol">
                    <div class="nameDiv">
                      {{item.newName}}
                    </div>
                    <div class="distanceAndAddressDiv">
                      {{item.distance}}|{{item.newAddress}}
                    </div>
                    <div class="overallratingAndShowTagDiv">
                      <van-row v-show="item.overallRating">
                        <van-col span="11">
                          <van-rate
                            :value="item.overallRating"
                            size="15"
                            count="5"
                            disabled-color="#00BFFF"
                            disabled
                          />
                        </van-col>
                        <van-col span="3">
                          {{item.overallRating}}
                        </van-col>
                      </van-row>
                      <div class="tagPaddingTop" v-show="item.showtag">
                        <van-tag color="#f2826a" plain size="large">{{item.showtag}}</van-tag>
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="餐馆">
        <div class="firstDiv" v-if="isRestaurantDataEmpty">
          <div>
            <img src="../../../static/images/noContent.png"/>
          </div>
          <div class="title">
            <span>
              暂无推荐餐馆
            </span>
          </div>
        </div>
        <div v-for="(item, index) in restaurantData" :key="index" class="secondDiv" @click="seeDetail(item)"
             v-if="!isRestaurantDataEmpty">
          <div>
            <div class="rowBottom">
              <van-row>
                <van-col span="4" offset="1">
                  <!--<img src="http://a.hiphotos.baidu.com/lbsugc/pic/item/a9d3fd1f4134970a109dadf898cad1c8a6865d7e.jpg"/>-->
                  <img :src="item.image"/>
                </van-col>
                <van-col span="15" offset="4">
                  <div class="secondCol">
                    <div class="nameDiv">
                      {{item.newName}}
                    </div>
                    <div class="distanceAndAddressDiv">
                      {{item.distance}}|{{item.newAddress}}
                    </div>
                    <div class="overallratingAndShowTagDiv">
                      <van-row>
                        <van-col span="11">
                          <van-rate
                            :value="item.overallRating"
                            size="15"
                            count="5"
                            disabled-color="#00BFFF"
                            disabled
                          />
                        </van-col>
                        <van-col span="3">
                          {{item.overallRating}}
                        </van-col>
                      </van-row>
                      <div class="tagPaddingTop">
                        <span v-if="item.price||item.price!=''">¥{{item.price}}</span>
                        <van-tag color="#f2826a" plain size="large">{{item.showtag}}</van-tag>
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {apiurl} from "@/service/api.js";

  export default {
    data() {
      return {
        active: 0,
        isRestaurantDataEmpty: false,
        isSceneryDataEmpty: false,
        restaurantData: {},
        sceneryData: {},
        name: '',
        distance: '',
        address: '',
        overallrating: 0,
        showTag: '',
        uidListForType1: '',// 景点uidList
        uidListForType2: '',// 餐馆uidList
        longitude: '',//所在地经度
        latitude: '',// 所在地维度
        price: 0
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.uidListForType1 = this.$route.query.uidListForType1;
        this.uidListForType2 = this.$route.query.uidListForType2;
        this.longitude = this.$route.query.longitude;
        this.latitude = this.$route.query.latitude;
        this.active = this.$route.query.type;
        this.$httpWX.get({
          url: apiurl.getPlaceListByUids,
          data: {
            uidList: this.uidListForType1,
            longitude: this.longitude,
            latitude: this.latitude
          }
        }).then(res => {
          this.sceneryData = res.data;
          this.initData(this.sceneryData, 1);
        });
        this.$httpWX.get({
          url: apiurl.getPlaceListByUids,
          data: {
            uidList: this.uidListForType2,
            longitude: this.longitude,
            latitude: this.latitude
          }
        }).then(res => {
          this.restaurantData = res.data;
          this.initData(this.restaurantData, 2);
        })
      },
      initData(data, type) {
        if (data == null && type == 1) {
          this.isSceneryDataEmpty = true;
        } else if (data == null && type == 2) {
          this.isRestaurantDataEmpty = true;
        } else {
          if (type == 1) {
            this.isSceneryDataEmpty = false;
          } else {
            this.isRestaurantDataEmpty = false;
          }
          for (let i = 0; i < data.length; i++) {
            data[i].overallRating = data[i].overallRating.toFixed(1);
            if (data[i].name.length > 9) {
              this.$set(data[i], 'newName', data[i].name.substring(0, 9) + '...');
            } else {
              this.$set(data[i], 'newName', data[i].name);
            }
            if (data[i].address.length > 8) {
              this.$set(data[i], 'newAddress', data[i].address.substring(0, 8) + '...');
            } else {
              this.$set(data[i], 'newAddress', data[i].address);
            }
            data[i].distance = data[i].distance ? data[i].distance >= 1000 ? (data[i].distance / 1000).toFixed(1)
              + 'km' : parseInt(data[i].distance) + 'm' : 0 + 'm';
          }
        }
      },
      seeDetail(item) {
        this.$router.push({
          path: `../placedetail/main`,
          query: {
            uid: item.uid,
            longitude: this.longitude,
            latitude: this.latitude,
          }
        });
      },
      onChange(index) {
        if (index.target.index == 0) {
          this.active = 0;
        } else if (index.target.index == 1) {
          this.active = 1;
        }
      },
    }
  }
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>
