const task = function (){
	this.B_index = 0
	this.S_index = 0
	this.beginList = []
	this.stopList = []
	this.addBegin = addBegin
	this.addStop = addStop
	this.delFn = delFn
	this.getBeginData = getBeginData
	this.getStopData = getStopData
	this.createName = createName
	this.createId = createId
	this.timer = null
}

function addBegin (ele, id) {
	this.beginList[this.B_index ++] = ele
	this.timer = setInterval(()=>{
		ele.num ++ 
	}, 1000)
	if(id) {
		this.stopList = this.stopList.filter(item => {
        return id !== item.id;
    });
	}
		
}

function addStop (ele, id) {
	clearInterval(this.timer)
	this.stopList[this.S_index ++] = ele
	if(id) {
		this.beginList = this.beginList.filter(item => {
       return id !== item.id;
    });
	}
}

function delFn () {

}
function getBeginData() {
	return this.beginList
}
function getStopData() {
	return this.stopList
}
function createId() {
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}


var familyNames = [
"赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
"褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
"何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
"陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
"云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
"昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
"酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
"倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
"乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
"元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
]
var givenNames = [
"子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
"昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
"东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
"美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
"建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
"涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
"子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
"佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
"佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
"清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
]


function getRandom (min, max){
	return Math.floor(Math.random() * (max-min)+min)
}

function createName () {
	const _index = getRandom(0, 100)
	return `${familyNames[_index]}${givenNames[_index]}`
}



export default task