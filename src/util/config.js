//一些配置
const Config={};

//服务器路径
Config.serverUrl="http://"+window.url;
//聊天路径
Config.chatServerUrl="ws://"+window.url;
//上传路径
Config.uploadServerUrl="http://"+window.url+"/user/postImage";

Config.xproject='http://127.0.0.1:8082/xproject';

export default Config;