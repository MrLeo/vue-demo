<script>
    import jx_common from 'utils/jx/common'

    export default{
        name: 'toload',
        methods: {
            /*立即下载*/
            toload(){
                jx_common.downloadApp();
            }
        }
    }
</script>
<template>
    <div class="toload">
        <div class="log">
            <img src="/static/img/jx.png">
        </div>
        <span class="main-tit">想每天看旅游直播？</span>
        <span class="sub-tit">下载九休旅行<i>送5元</i></span>
        <div class="logbtn txtalign-c" @click="toload">立即下载</div>
    </div>
</template>
<style>
    .toload {
        height: 2.25rem;
        background: rgba(0, 0, 0, 0.65);
        color: #fff;
        padding: 0.35rem 0.75rem;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .log {
        float: left;
        border-radius: 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
    }

    .toload span {
        display: block;
        margin-left: 2.4rem;
    }

    .main-tit {
        font-size: 0.625rem;
    }

    .sub-tit {
        font-size: 0.5rem;
        margin-top: 0.1rem;
    }

    .sub-tit i {
        color: #ffaf00;
    }

    .logbtn {
        float: right;
        border: 1px solid #fff;
        width: 4.05rem;
        height: 1.3rem;
        line-height: 1.3rem;
        border-radius: 0.2rem;
        margin-top: -1.4rem;
    }
</style>
