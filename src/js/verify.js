
export default {
    isMobil: (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号码不能为空'));
        }
        setTimeout(() => {
            let number = parseInt(value);
            if (!Number.isInteger(number)) {
                callback(new Error('请输入数字值'));
            } else {
                if (!(/^1[34578]\d{9}$/.test(number))) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            }
        }, 1000);
    },
    isIDCard: (rule, value, callback) => {
        if (!value) {
            return callback(new Error('身份证号码不能为空'));
        }
        setTimeout(() => {
            let number = value;
            let iSum = 0;
            if(!/^\d{17}(\d|x)$/i.test(number)) {
                return callback(new Error('你输入的身份证长度或格式错误'));
            }
            number = number.replace(/x$/i, "a");
            let aCity = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
                21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
                41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
                51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
            if(aCity[parseInt(number.substr(0, 2))] == null) {
                return callback(new Error('你的身份证地区非法'));
            }
            let sBirthday = number.substr(6,4) + "-" + Number(number.substr(10,2)) + "-" + Number(number.substr(12,2));
            let d = new Date(sBirthday.replace(/-/g, "/"));
            if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())){
                return callback(new Error('身份证上的出生日期非法'));
            }
            for(let i = 17; i >= 0; i--) {
                iSum += (Math.pow(2, i)%11)*parseInt(number.charAt(17 - i), 11) ;
            }
            if(iSum%11 != 1) {
                return callback(new Error('你输入的身份证号非法'));
            }
            //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
            callback();
        }, 1000);
    }
}