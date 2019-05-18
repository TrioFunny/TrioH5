//一些配置
const Config={};

//服务器路径
Config.serverUrl="http://"+window.url;
//聊天路径
Config.chatServerUrl="ws://"+window.url;
//上传路径
Config.uploadServerUrl="http://"+window.url+"/user/postImage";

//xproject 服务器地址
Config.xproject='http://127.0.0.1:8082/xproject';

//solo 服务器地址
Config.solo='http://123.206.92.79:8080/solo';

export default Config;