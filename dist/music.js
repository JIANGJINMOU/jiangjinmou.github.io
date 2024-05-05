const ap = new APlayer({
    container: document.getElementById('aplayer'), //播放器容器元素
    mini: false, //迷你模式
    autoplay: false, //自动播放
    theme: '#FADFA3', //主题色
    loop: 'all', //音频循环播放, 可选值: 'all'全部循环, 'one'单曲循环, 'none'不循环
    order: 'random', //音频循环顺序, 可选值: 'list'列表循环, 'random'随机循环
    preload: 'auto', //预加载，可选值: 'none', 'metadata', 'auto'
    volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
    mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    listFolded: false, //列表默认折叠
    listMaxHeight: 90, //列表最大高度
    lrcType: 3, //歌词传递方式
    audio: [ //音频信息,包含以下
        {
            name: 'Your sunday (sunday morning)', //如果只有一首歌，删掉这一块，如有更多歌曲按此格式逐渐往下添加
            artist: 'maroon5',
            url: 'https://www.ytmp3.cn/down/78837.mp3',
            cover: 'cover2.jpg',
            lrc: 'lrc2.lrc',
            theme: '#46718b'
        }
    ]
});

const colorThief = new colorThief();
const image = new Image();
const xhr = new XMLHttpRequest();
const setTheme = (index) => {
    if (!ap.list.audios[index].theme) {
        xhr.onload = function(){
            let coverUrl = URL.createObjectURL(this.response);
            image.onload = function(){
                let color = colorThief.getColor(image);
                ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
                URL.revokeObjectURL(coverUrl)
            };
            image.src = coverUrl;
        }
        xhr.open('GET', ap.list.audios[index].cover, true);
        xhr.responseType = 'blob';
        xhr.send();
    }
};
setTheme(ap.list.index);
ap.on('listswitch', (index) => {
    setTheme(index);
});