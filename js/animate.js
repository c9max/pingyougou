function animate(obj, target, callback) {
    // console.log(callback); callback = function(){}   调用的时候 callback()
    //当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
    //解决方案就是 让我们元素只有一个定时器执行
    //先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //步长值写到定时器的里面
        //把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止动画 本质时停止定时器
            clearInterval(obj.timer);
            //回调函数写到定时器结束里面
            // if (callback) {
            //     //调用函数
            //     callback();
            // }
            callback && callback(); //运用短路
        } else {
            //把每次加1这个步长值改为一个慢慢变小的值 步长公式：(目标值-现在的位置)/10
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15)
}