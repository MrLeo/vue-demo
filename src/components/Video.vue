<script>
    import $ from "jquery"

    /**
     * https://cdnjs.cloudflare.com/ajax/libs/video.js/5.11.6/alt/video-js-cdn.css
     * https://cdnjs.cloudflare.com/ajax/libs/video.js/5.11.6/video.js
     * https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/3.5.3/videojs-contrib-hls.js
     */
    /*import "video.js/dist/video-js.min.css"
     import videojs from "video.js"
     import "videojs-contrib-hls"*/
    export default{
        props: {
            videoSrc: {
                type: Array,
                default: []
            },
            videoPoster: {
                type: String,
                default: '/static/img/logo_default_s.jpg'
            },
            videoControls: {
                type: Boolean,
                default: true
            }
        },//['videoSrc', 'videoPoster', 'videoControls'],
        data(){
            return {
                defaultImg: '/static/img/logo_default_s.jpg',//默认图片地址
                videoPlayer: null,
            }
        },
        computed: {
            /*showVideo(){
             const _self = this
             let showVideo = !!_self.videoSrc[0]
             if (showVideo) {
             setTimeout(function () {
             _self.initVideo()
             }, 0)
             }
             return showVideo
             },*/
            poster(){
                const _self = this
                return !!_self.videoPoster ? _self.videoPoster : _self.defaultImg
            }
        },
        watch: {
            videoSrc(val, oldVal){
                console.log('[Leo]watch video src => ',val , oldVal)
                const _self = this
                if (!val)return
                if (!!_self.videoPlayer) {
                    /*let srcs = []
                     for (let srcItem of val) {
                     let url = {src: srcItem}
                     if (/\.m3u8\??/.test(srcItem)) {
                     url.type = 'application/vnd.apple.mpegurl'
                     //url.withCredentials = true
                     } else if (/\.mp4\??/.test(srcItem)) {
                     url.type = 'video/mp4'
                     }
                     srcs.push(url)
                     }*/
                    _self.videoPlayer.src(val)
                    _self.setVideoControlBar(_self.videoPlayer)
                    _self.videoPlayer.play()
                } else {
                    /*console.log('ready',_self.videoSrc[0],/\.m3u8\??/.test(_self.videoSrc[0]))
                     if (!/\.m3u8\??/.test(_self.videoSrc[0])) {
                     setTimeout(function () {
                     _self.initVideo()
                     }, 0)
                     }*/
                    setTimeout(function () {
                        _self.initVideo()
                    }, 0)
                }
            },
            videoPoster(val, oldVal){
                const _self = this
                _self.videoPlayer && (()=> {
                    _self.videoPlayer.poster(_self.videoPoster)
                })()
            }
        },
        ready(){
            const _self = this
            try {
                if (!!_self.videoPlayer) {
                    let srcs = []
                    for (let src of _self.videoSrc) {
                        srcs.push({src: src})
                    }
                    console.log('[Leo]视频地址 => ', srcs)
                    _self.videoPlayer.src(srcs)

                    _self.setVideoControlBar(_self.videoPlayer)

                    _self.videoPlayer.play()
                } else {
                    /*console.log('ready',_self.videoSrc[0],/\.m3u8\??/.test(_self.videoSrc[0]))
                     if (!/\.m3u8\??/.test(_self.videoSrc[0])) {
                     setTimeout(function () {
                     _self.initVideo()
                     }, 0)
                     }*/
                    setTimeout(function () {
                        _self.initVideo()
                    }, 0)
                }
            } catch (e) {
                jx_common.tip('出问题了(>﹏<。)～呜呜呜……')
            }
        },
        beforeDestroy(){
            this.videoPlayer && this.videoPlayer.dispose()//Destroys the video videoPlayer and does any necessary cleanup
        },
        methods: {
            initVideo(){
                const _self = this
                $(function () {
                    /**
                     * Video.js配置API
                     * 官方API：http://docs.videojs.com/
                     * https://github.com/videojs/video.js/blob/stable/docs/guides/options.md
                     * http://coderlt.coding.me/2016/02/26/videojs-readme/
                     */

                    try {
                        //videojs.options.flash.swf = require('video.js/dist/video-js.swf')
                        let videoPlayer = document.getElementById('videoPlayer')
                        if (!videoPlayer)return;
                        _self.videoPlayer = videojs(videoPlayer, {
                            techOrder: ["html5", "flash"], //["flash", "html5"], //
                            controls: true, //控制栏
                            inactivityTimeout: 0,
                            autoplay: false, //自动播放
                            preload: "auto", //预加载
                            loop: true //循环播放
                            //poster: require('assets/img/logo_default.png'), //视频海报
                            /*children: {
                             posterImage: false,
                             textTrackDisplay: false,
                             loadingSpinner: false,
                             bigPlayButton: false,
                             controlBar: {
                             playToggle: false,
                             fullscreenToggle: false,
                             volumeMenuButton: false,
                             currentTimeDisplay: false,
                             timeDivider: false,
                             durationDisplay: false,
                             remainingTimeDisplay: false,
                             liveDisplay: false,
                             customControlsSpacer: false,
                             chaptersButton: false,
                             subtitlesButton: false,
                             captionsButton: false,
                             MuteToggle: false,
                             progressControl: {
                             keepTooltipsInside: false,
                             seekBar: {
                             loadProgressBar: false,
                             playProgressBar: false,
                             seekHandle: false,
                             mouseTimeDisplay: false
                             }
                             }
                             },
                             errorDisplay: false,
                             textTrackSettings: false
                             }*/
                        });

                        /**
                         * 播放器插件
                         * @param options
                         */
                        /*function examplePlugin(options) {
                         this.on('play', function (e) {
                         console.log('开始/恢复播放');
                         });
                         }
                         videojs.plugin('examplePlugin', examplePlugin);
                         _self.videoPlayer.examplePlugin({
                         exampleOption: true
                         });*/

                        /**
                         * 准备就绪
                         */
                        _self.videoPlayer.ready(function () {
                            var thisPlayer = this
                            //console.log('%c[Leo]thisPlayer=>', 'color:red', thisPlayer)

                            /**
                             * player控制
                             */
                            thisPlayer.volume(100 / 100);
                            thisPlayer.playbackRate(1);
                            thisPlayer.fluid(false);
                            thisPlayer.isFullscreen(false);

                            _self.setVideoControlBar(thisPlayer)

                            //thisPlayer.muted(true);

                            /*thisPlayer.src({
                             type: "rtmp/mp4",
                             src: "rtmp://pull99.a8.com/live/" + liveVideo.liveid
                             });
                             thisPlayer.poster(liveVideo.portrait);*/
                            try {
                                thisPlayer.play();
                            } catch (e) {
                                console.log('[Leo]play error => ', e)
                                jx_common.tip('无法播放该视频')
                            }
                            thisPlayer.exitFullscreen();
                            thisPlayer.exitFullWindow();
                            //H5视频全屏设置：http://stackoverflow.com/questions/3699552/html5-inline-video-on-iphone-vs-ipad-browser
                        });
                        /**
                         * 开始或恢复播放
                         */
                        _self.videoPlayer.on('play', function () {
                            console.log('开始/恢复播放')
                        })
                        /**
                         * 检测播放时间
                         */
                        _self.videoPlayer.on('timeupdate', function () {
                            //console.log(`当前播放时间：${_self.videoPlayer.currentTime()}`)
                            if (_self.videoPlayer.duration() != 0 && _self.videoPlayer.currentTime() === _self.videoPlayer.duration()) {
                                console.log('视频播放结束')
                            }
                        })
                        /**
                         * 暂停播放
                         */
                        _self.videoPlayer.on('pause', function () {
                            console.log('暂停播放')
                        })
                        /**
                         * 播放结束
                         */
                        _self.videoPlayer.ended(function () {
                            console.log('视频播放结束')
                        })
                    } catch (e) {
                        jx_common.tip('无法播放该视频')
                    }
                });
            },
            setVideoControlBar(player){
                let _self = this
                //console.log('[Leo]show controls => ', _self.videoControls)
                //console.log('%c[Leo]controlBar=>', 'color:red', player.controlBar)
                player.controlBar.fullscreenToggle.show()//全屏
                player.controlBar.liveDisplay.hide()//直播标识
                player.controlBar.chaptersButton.hide()//播放列表
                player.controlBar.captionsButton.hide()//字幕
                player.controlBar.audioTrackButton.hide()//音轨
                player.controlBar.customControlSpacer.hide()
                player.controlBar.descriptionsButton.hide()
                player.controlBar.durationDisplay.hide()
                if (_self.videoControls) {
                    //player.controls(true);
                    player.controlBar.progressControl.show()//播放进度
                    player.controlBar.timeDivider.show()//时间分隔
                    player.controlBar.remainingTimeDisplay.show()//剩余时间
                    player.controlBar.playToggle.show()//播放
                    player.controlBar.volumeMenuButton.show()//静音
                    $('.vjs-volume-menu-button-horizontal').show()
                    $('.vjs-control-bar').css({"justify-content": "space-between"})
                } else {
                    //player.controls(false);
                    player.controlBar.progressControl.hide()
                    player.controlBar.timeDivider.hide()
                    player.controlBar.remainingTimeDisplay.hide()
                    player.controlBar.playToggle.hide()
                    player.controlBar.volumeMenuButton.hide()
                    $('.vjs-volume-menu-button-horizontal').hide()
                    $('.vjs-control-bar').css({"justify-content": "flex-end"})
                }
            }
        }
    }
</script>
<template>
    <div class="video-wrap">
        <video id="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered" webkit-playsinline="true"
               playsinline="true"
               poster="{{poster}}">
            <template v-for="src in videoSrc" track-by="$index">
                <source :src="src.src" v-bind:type="src.type">
            </template>
            <p class="vjs-no-js">播放视频需要启用 JavaScript，推荐使用支持HTML5的浏览器访问。</p>
        </video>
    </div>
</template>
<style>
    [v-cloak] {
        display: none;
    }

    /*隐藏系统自带播放器控制栏*/
    video::-webkit-media-controls {
        display: none !important;
    }

    .video-wrap, .video-wrap .video-js {
        height: 100%;
        width: 100%;
        max-height: 100%;
    }

    /*让videojs的控制栏始终显示*/
    .vjs-control-bar, .vjs-fade-in, .vjs-fade-out {
        visibility: visible !important;
        opacity: 1 !important;
        transition-duration: 0s !important;
    }

    .video-js .vjs-control-bar {
        background-color: rgba(43, 51, 63, 0);
    }

    .vjs-has-started .vjs-control-bar {
        justify-content: flex-end;
    }

    /* Video.js Controls Style Overrides */
    .vjs-live-control,
    .vjs-captions-button {
        display: none !important;
    }
</style>
