$(function() {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        var checked = $(this).prop("checked");
        $(".j-checkbox, .checkall").prop("checked", checked);
        //7.选中商品添加背景
        if ($(this).prop("checked")) {
            //让所有商品添加check-cart-item类名，不需要加.
            $(".cart-item").addClass("check-cart-item");
        } else {
            //让所有商品移除check-cart-item类名，不需要加.
            $(".cart-item").removeClass("check-cart-item");
        }
        //计算价格
        getSum();
    });
    //如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选
    $(".j-checkbox").change(function() {
        // if(被选中的小的复选框的个数 === 3){
        //     就要选中全选按钮
        // } else{
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length); 小复选框被选中的个数
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        //7.选中商品添加背景
        if ($(this).prop("checked")) {
            //让当前商品添加check-cart-item类名，不需要加.
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            //让当前商品移除check-cart-item类名，不需要加.
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        //计算价格
        getSum();
    });
    //2.增减商品数量模块
    $(".increment").click(function() {
        //得到兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        //3.计算小计模块 根据文本框的值乘以当前商品价格
        // var p = $(this).parent().parent().siblings(".p-price").html();
        //parents("选择器")可以返回指定祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        //小计模块  toFixed(2) 可以保留两位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    $(".decrement").click(function() {
        //得到兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        //3.计算小计模块 根据文本框的值乘以当前商品价格
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        // console.log(p);
        var price = (p * n).toFixed(2);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    //3.用户修改文本框的值
    $(".itxt").change(function() {
        //先得到文本框的里面的值 乘以 当前商品的单价
        var n = $(this).val();
        if (n >= 1) {
            // 当前商品单价
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            p = p.substr(1);
            var price = (p * n).toFixed(2);
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
            getSum();
        } else {
            alert("数量输入错误，请重新输入");
        }
    });
    //4.计算总计和总额模块
    function getSum() {
        var count = 0; //计算总件数
        var money = 0; //计算总价钱
        $(".itxt").each(function(i, ele) {
            if ($(this).parents(".p-num").siblings(".p-checkbox").find(".j-checkbox").prop("checked") == true) {
                count += parseInt($(ele).val());
            }
        });
        //应该在循环外面统计数量并赋值，不然会导致删除到最后的时候留下最后被删除物品的价格和数量
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            if ($(this).siblings(".p-checkbox").find(".j-checkbox").prop("checked") == true) {
                money += parseFloat($(ele).text().substr(1));
            }
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    //6.商品后面的删除按钮
    //(1)商品后面的删除按钮
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //(2)删除选中的商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //(3)清理购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })
})