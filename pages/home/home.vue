<template>
    <view class="mod-home u-page">
        <view class="mod-school flex jsb">
            <view class="mod-school__info">
                <image
                    mode="scaleToFill"
                    :src="
                        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fec%2Fca%2Fd8%2Feccad87a334d082b8ff200ae01157e44.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641361652&t=1439f13fd58db29e78ae81a6c2034ef0'
                    "
                    @error="imageError"
                ></image>

                <text class="fz-24 fw-600">黄哥的网校2</text>
                <!-- 骨架 -->
                <!-- <u-skeleton :loading="true" avatar rows="0"></u-skeleton> -->
            </view>

            <view class="mod-school__menu"><u-icon name="grid" size="40" @click="onCoursePopupShow"></u-icon></view>
        </view>

        <u-notify ref="uNotify" message="Hi uView">
            <view class="mod-courses-class"><text>人生若只如初见，何事秋风悲画扇</text></view>
        </u-notify>

        <!-- <u-popup
			round="10"
			borderRadius="10"
			:customStyle="{top: '95px'}"
			:overlayStyle="{ top: '95px'}"
			:show="coursePopupShow" mode="top"
			@close="onCoursePopupShow">
			<view class="mod-courses-class">
				<text>人生若只如初见，何事秋风悲画扇</text>
			</view>
		</u-popup> -->

        <!-- 搜索 -->
        <view class="mod-query u-box">
            <u--input placeholder="请输入搜索的内容" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399" @focus="onSearchInput"></u--input>
        </view>

        <!-- VIP选择 -->
        <view class="mod-member u-box">
            <text @click="isVip = 2" :class="['vip', isVip == 2 ? 'is-active' : '']">VIP课</text>
            <text @click="isVip = 1" :class="[isVip == 1 ? 'is-active' : '']">公开课</text>
        </view>

        <view class="mod-swiper u-box">
            <u-swiper :height="172" radius="6" :list="swiperList" @change="e => (swiperCurrent = e.current)">
                <view slot="indicator" class="indicator">
                    <view class="indicator__dot" v-for="(item, index) in swiperList" :key="index" :class="[index === swiperCurrent && 'indicator__dot--active']"></view>
                </view>
            </u-swiper>
        </view>

        <view class="mod-course-list u-box">
            <view class="u-box__title">精选课程</view>
            <view class="u-box__content">
                <view class="course-item" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]" :key="item" @click="toCourseDetails">
                    <image
                        mode="scaleToFill"
                        :src="
                            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fec%2Fca%2Fd8%2Feccad87a334d082b8ff200ae01157e44.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641361652&t=1439f13fd58db29e78ae81a6c2034ef0'
                        "
                        @error="imageError"
                    ></image>
                    <view class="fz-15 mod-course-name">大神设计师带你学大神设计师带你学师带你学大神设计师带你学</view>
                    <view class="fz-12 course-item__class">
                        <text>单科</text>
                        <text>1个班型可选</text>
                    </view>
                    <view class="fz-13 course-item__money">￥123.0</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            swiperCurrent: 0,
            swiperList: [
                'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                'https://cdn.uviewui.com/uview/swiper/swiper1.png'
            ],

            coursePopupShow: false,

            //  [1=非VIP， 2=VIP]
            isVip: 2
        };
    },

    // xia la shua xin
    onPullDownRefresh() {},

    // la qu shu ju
    onReachBottom(e) {
        console.log(e);
    },

    methods: {
        imageError() {},

        // 跳转课程详情
        toCourseDetails() {
            const user = {
                name: '张三',
                id: 123,
            }
            uni.navigateTo({
                url: `../course-details/course-details?data=${encodeURIComponent(JSON.stringify(user))}`,
                
            });
        },

        // 打开课程菜单树
        onCoursePopupShow() {
            this.coursePopupShow = !this.coursePopupShow;

            if (this.coursePopupShow) {
                console.log('开启');
                this.$refs.uNotify.show({
                    top: 95,
                    safeAreaInsetTop: true,
                    type: 'error',
                    color: '#000',
                    bgColor: '#e8e8e8',
                    fontSize: 20,
                    safeAreaInsetTop: true
                });
            } else {
                console.log('关闭');
                this.$refs.uNotify.close({});
            }
        },

        onSwitchVip(isVip) {
            this.isVip = isVip;
        },

        onSearchInput() {
            console.log('1111');
        }
    }
};
</script>

<style lang="scss" scoped>
.mod-home {
    // 头部网校信息
    .mod-school {
        height: 40px;

        &__info {
            line-height: 40px;
            display: flex;
            image {
                display: inline-block;
                width: 40px;
                height: 40px;
                background-color: #eeeeee;
                border-radius: 3px;
            }
            .fw-600 {
                margin-left: 10px;
            }
        }
    }

    // 课程菜单树
    .mod-courses-class {
        width: 100%;
        height: 500px;
        background: red;
    }

    // 查询框
    .mod-query {
        height: 42px;
    }

    .mod-member {
        font-size: 18px;
        height: 35px;

        .vip {
            margin-right: 15px;
        }

        .is-active {
            font-size: 21px;
            color: $u-primary;
            transition: color 0.3s;
        }
    }

    // 轮播图
    .mod-swiper {
        .indicator {
            @include flex(row);
            justify-content: center;
            &__dot {
                height: 6px;
                width: 6px;
                border-radius: 100px;
                background-color: rgba(255, 255, 255, 0.35);
                margin: 0 5px;
                transition: background-color 0.3s;

                &--active {
                    background-color: #ffffff;
                }
            }
        }
    }

    // 课程列表
    .mod-course-list {
        margin-bottom: 30px;
        .u-box__content {
            display: flex;
            flex-wrap: wrap;

            .course-item {
                width: 48%;
                height: 280px;
                margin-bottom: 18px;

                &:nth-of-type(odd) {
                    margin-right: 4%;
                }

                image {
                    display: inline-block;
                    width: 100%;
                    height: 184px;
                }

                &__class {
                    margin: 8px 0;
                    text {
                        padding: 4px;
                        border-radius: 3px;
                        background-color: #f6f6f6;
                        color: #8e8e93;
                        &:first-child {
                            margin-right: 5px;
                        }
                    }
                }

                &__money {
                    color: #ff9500;
                }
            }
        }
    }
}
</style>
