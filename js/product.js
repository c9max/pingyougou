window.addEventListener('load', function() {
    var goods_product = document.querySelector('.goods_product');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    //1.当我们鼠标经过 goods_product 就显示和隐藏 mask遮挡层和big大盒子
    goods_product.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    goods_product.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    //2.鼠标移动的时候，让黄色的盒子跟着鼠标来走
    goods_product.addEventListener('mousemove', function(e) {
        //(1).先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        //(2)减去盒子高度300 的一半是150就是mask的top值了
        //(3)我们mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //(4)如果x坐标小于了0 就让它停在0位置
        //遮挡层的最大移动距离
        var maskMax = goods_product.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= goods_product.offsetHeight - mask.offsetHeight) {
            maskY = goods_product.offsetHeight - mask.offsetHeight
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //3.大图片的移动距离 = 遮挡层移动距离*大图片最大移动距离 /遮挡层的最大移动距离
        //大图片
        var bigImg = document.querySelector('.bigImg');
        //大图片最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //大图片的移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})