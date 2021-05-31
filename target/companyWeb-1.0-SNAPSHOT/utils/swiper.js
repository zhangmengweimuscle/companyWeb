/**
 * @desc 封装轮播图组件
 * @author: Demigodliu
 * @date: 2020/06/13 09:44
 **/
(function(){
    let _swiper = {
        containerWidth: 0,          // 轮播容器宽度
        itemLength: 0,              // 子项个数
        itemTotalWidth: 0,          // 子项总宽
        nowItemIndex: 0,            // 当前子项
        speed: 5000,                // 子项切换速度
        prevAndNextBtnGroup: false, // 是否需要前后按钮组
        pagination: false,          // 是否需要分页器
        renderFlag: false,          // 切换子项节流防抖开关
        autoTimer: null,            // 自动播放的定时器
        /**
         * @desc 初始化
         * @author: Demigodliu
         * @date: 2020/06/13 09:46
         **/
        init(){
            // 接收用户的自定义参数配置
            if(typeof swiperConfig !== "undefined"){
                let { width, height, speed, needPrevAndNextBtnGroup, needPagination } = swiperConfig;
                $(".swiper-container").css({ "width": (+width || 800) + 'px', "height": (+height || 300) + 'px' });
                this.speed = speed || 5000;
                this.prevAndNextBtnGroup = needPrevAndNextBtnGroup || false;
                this.pagination = needPagination || false;
            }

            // 初始化轮播
            this.initSwiperInfo();
            if(this.prevAndNextBtnGroup){ this.initPrevAndNextClickFn(); }
            if(this.pagination){ this.initPagination(); }
            this.autoCarousel();
        },
        /**
         * @desc 初始化用户填充子项的信息
         * @author: Demigodliu
         * @date: 2020/06/13 09:50
         **/
        initSwiperInfo(){
            let _container = $(".swiper-container"),
                _containerWidth = _container.width(),
                _itemLength = $(".swiper-item").length,
                _itemTotalWidth = _containerWidth * _itemLength;

            this.containerWidth = _containerWidth;
            this.itemLength = _itemLength;
            this.itemTotalWidth = _itemTotalWidth;

            // 子项初始化位置
            let _item = $(".swiper-item");
            for(let i = 0; i < _itemLength; i++){
                _item.eq(i).css("left", _containerWidth * i);
            }
        },
        /**
         * @desc 初始化前进后退按钮组事件
         * @author: Demigodliu
         * @date: 2020/06/13 09:47
         **/
        initPrevAndNextClickFn(){
            $(".swiper-container").append(`
                <div class="swiper-btn-group">
                    <div class="swiper-btn-group_prev"></div>
                    <div class="swiper-btn-group_next"></div>
                </div>
            `);

            $(".swiper-btn-group_prev").unbind("click").bind("click", () => _swiper.prevItem());
            $(".swiper-btn-group_next").unbind("click").bind("click", () => _swiper.nextItem());
        },
        /**
         * @desc 初始化分页器
         * @author: Demigodliu
         * @date: 2020/06/13 13:41
         **/
        initPagination(){
            let { itemLength } = this;

            $(".swiper-container").append(`<div class="swiper-pagination"></div>`);

            // 分页器渲染
            let _paginationText = '';
            for(let i = 0; i < itemLength; i++){
                _paginationText += `<div class="swiper-pagination-item"></div>`;
            }
            $(".swiper-pagination").html(_paginationText);
            $(".swiper-pagination-item").eq(0).addClass("swiper-pagination-item_active");
            this.paginationFn();
        },
        /**
         * @desc 自动轮播
         * @author: Demigodliu
         * @date: 2020/06/13 11:03
         **/
        autoCarousel(){
            this.autoTimer = setInterval(() => {
                this.nextItem();
            }, this.speed);
        },
        /**
         * @desc 前一张
         * @author: Demigodliu
         * @date: 2020/06/13 09:52
         **/
        prevItem(){
            let { nowItemIndex, itemLength, renderFlag } = this;

            // 避免瞬间多次操作
            if(!renderFlag){
                this.renderFlag = true;

                // 暂停自动播放
                clearInterval(this.autoTimer);

                // 判断是否是轮播边界
                this.nowItemIndex = !nowItemIndex ? itemLength - 1 : --nowItemIndex;

                // 轮播更新
                this.render()
            }
        },
        /**
         * @desc 后一张
         * @author: Demigodliu
         * @date: 2020/06/13 09:52
         **/
        nextItem(){
            let { nowItemIndex, itemLength, renderFlag } = this;

            // 避免瞬间多次操作
            if(!renderFlag){
                this.renderFlag = true;

                // 暂停自动播放
                clearInterval(this.autoTimer);

                // 判断是否是轮播边界
                this.nowItemIndex = nowItemIndex === itemLength - 1 ? 0 : ++nowItemIndex;

                // 轮播更新
                this.render()
            }
        },
        /**
         * @desc 分页器点击
         * @author: Demigodliu
         * @date: 2020/06/13 13:14
         **/
        paginationFn(){
            let that = this;

            $(".swiper-pagination-item").unbind("click").bind("click", function(){
               let idx = $(this).index();

               if(!that.renderFlag){
                   that.renderFlag = true;
                   that.nowItemIndex = idx;

                   // 暂停自动播放
                   clearInterval(that.autoTimer);

                   that.render();
               }
            });
        },
        /**
         * @desc 渲染轮播
         * @author: Demigodliu
         * @date: 2020/06/13 09:58
         **/
        render(){
            let { containerWidth, nowItemIndex } = this;

            // 执行重绘
            $(".swiper-wrapper").css("left", -containerWidth * nowItemIndex);

            // 分页器同步
            $(".swiper-pagination-item").removeClass("swiper-pagination-item_active").eq(nowItemIndex).addClass("swiper-pagination-item_active");

            setTimeout(() => {
                this.renderFlag = false;

                // 恢复自动播放
                this.autoCarousel();
            }, 500);
        }
    };
    $(() => _swiper.init());
}());