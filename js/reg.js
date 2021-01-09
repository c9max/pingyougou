window.onload = function() {
    var regtel = /^1[3|4|5|7|8|9]\d{9}$/; //手机号码的正则表达式
    var tel = document.querySelector("#tel");
    regexp(tel, regtel);
    var regqq = /^[1-9]\d{4,}$/; //qq号正则表达式
    var qq = document.querySelector("#qq");
    regexp(qq, regqq);
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/; //昵称正则表达式
    var nc = document.querySelector("#nc");
    regexp(nc, regnc);
    var regmsg = /^\d{6}$/; //短信验证码正则表达式
    var msg = document.querySelector("#msg");
    regexp(msg, regmsg);
    var regpwd = /^[A-Za-z0-9_-]{7,16}$/; //登录密码正则表达式
    var pwd = document.querySelector("#pwd");
    regexp(pwd, regpwd);

    var surepwd = document.querySelector("#surepwd");

    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式输入不正确，请重新输入';
            }
        }
    };
    surepwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码输入不一致';
        }
    }
}