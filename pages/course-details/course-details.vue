<template>
    <view class="mod-course-details">
        <view class="mod-top-imgage">
            <image :src="src" alt="">
        </view>
        <u-scroll-list
        	indicatorColor="#fff0f0"
        	indicatorActiveColor="#f56c6c">
        	<view
        		class="scroll-list"
        		style="flex-direction: row;"
        	>
        		<view
        			class="scroll-list__goods-item"
        			v-for="(item, index) in goodsArr"
        			:key="index"
        			:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']"
        		>
        			<image
        				class="scroll-list__goods-item__image"
        				:src="goodsBaseUrl + item.thumbnail"
        				mode=""
        			></image>
        			<text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
        		</view>
        		<view
        			class="scroll-list__show-more"
        			@tap="showMore"
        		>
        			<text class="scroll-list__show-more__text">查看更多</text>
        			<u-icon
        				name="arrow-leftward"
        				color="#f56c6c"
        				size="12"
        			></u-icon>
        		</view>
        	</view>
        </u-scroll-list>
        <view class="u-page">
            <!-- 课程介绍 -->
            <view class="u-box course-base">
                <text class="u-box__title">3-4年级语文高分技巧短训营</text>
                <view class="course-txt-describe">
                    课程简介：一句话介绍
                </view>
                <u-scroll-list>
                    <view class="course-teacher" v-for="(item) in [1,2,3,4,5]" :key="item">
                        <view class="course-teacher__img">
                            <u--image
                                shape="circle"
                                :src="src"
                                width="90rpx"
                                height="90rpx"
                            ></u--image>
                        </view>
                        <view class="course-teacher__info">
                            <view class="c-main fz-15">
                                刘晓峰
                            </view>
                            <view class="course-teacher-resume fz-13 mod-course-name">
                                主授科目：成人学历提升艺术设计主授科目：成人学历提升艺术设计人学历提升艺术设计主授科目：成人学历提升艺术设
                            </view>
                        </view>
                    </view>
                </u-scroll-list>
            </view>
            
            <!-- 富文本介绍 -->
            <view class="u-box">
                <view class="u-box__title">项目介绍</view>
                <view class="ke-introduce">
                    
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'courseDetails',
    data() {
        return {
            src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170927%2Fb8a1e4cbd83646ee82ed5e4c52d3687f.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642303215&t=dcfb499641698a915207be13fcfdb724',
            
            goodsBaseUrl: 'https://cdn.uviewui.com/uview/goods/',
            goodsArr: [{
            		price: '230.5',
            		thumbnail: '1.jpg'
            	},
            	{
            		price: '74.1',
            		thumbnail: '2.jpg'
            	},
            	{
            		price: '8457',
            		thumbnail: '6.jpg'
            	},
            	{
            		price: '1442',
            		thumbnail: '5.jpg'
            	},
            	{
            		price: '541',
            		thumbnail: '2.jpg'
            	},
            	{
            		price: '234',
            		thumbnail: '3.jpg'
            	},
            	{
            		price: '562',
            		thumbnail: '4.jpg'
            	},
            	{
            		price: '251.5',
            		thumbnail: '1.jpg'
            	}
            ],
        };
    },
    onLoad(router) {
        let { data } = router;
        const params = JSON.parse(decodeURIComponent(data))
    },
    created() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
    .mod-course-details {
        .mod-top-imgage{
            image {
                width: 100%;
                height: 375px;
            }
        }
        
        // 课程基础信息 & 教室信息
        .course-base {
            .course-txt-describe {
                color: $u-light-color;
                font-size: 13px;
                padding: 10px 0;
            }
            
            .course-teacher {
                display: flex;
                padding: 20px;
               
                border-radius: 15px;
                overflow: hidden;
                background: linear-gradient(145deg, #ffffff, #d6dde5);
                box-shadow:  8px 8px 31px #d1d8e0,
                             -8px -8px 31px #ffffff;
                             
               &__img {
                   margin-right: 15px;
               }
               &__info {
                   .course-teacher-resume {
                       margin-top: 10px;
                   }
               }
            }
        }
        
        .ke-introduce {
            height: 300px;
            background: red;
        }
    }
    
    .scroll-list {
    	@include flex(column);
    	&__goods-item {
    		margin-right: 20px;
    
    		&__image {
    			width: 60px;
    			height: 60px;
    			border-radius: 4px;
    		}
    
    		&__text {
    			color: #f56c6c;
    			text-align: center;
    			font-size: 12px;
    			margin-top: 5px;
    		}
    	}
    
    	&__show-more {
    		background-color: #fff0f0;
    		border-radius: 3px;
    		padding: 3px 6px;
    		@include flex(column);
    		align-items: center;
    
    		&__text {
    			font-size: 12px;
    			width: 12px;
    			color: #f56c6c;
    			line-height: 16px;
    		}
    	}
    
    	&__line {
    		@include flex;
    		margin-top: 10px;
    
    		&__item {
    			margin-right: 15px;
    
    			&__image {
    				width: 61px;
    				height: 48px;
    			}
    
    			&__text {
    				margin-top: 5px;
    				color: $u-content-color;
    				font-size: 12px;
    				text-align: center;
    			}
    
    			&--no-margin-right {
    				margin-right: 0;
    			}
    		}
    	}
    }
</style>
