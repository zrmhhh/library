var leftBtnEl = document.getElementById('left_btn')
var rightBtnEl = document.getElementById('right_btn')

var bannerLiEls = document.querySelectorAll('#carousel_list li') // ul里的li（banner图片）
var btnEls = document.querySelectorAll('#circle_ol li') // 小圆点

var currentBannerIndex = 0 // 当前所显示的bannert下标
// 右按钮事件
rightBtnEl.addEventListener('click', function(){
    currentBannerIndex ++
    // 隐藏所有banner图片
    for (let i = 0; i < bannerLiEls.length; i++) {
        const bannerLiItemEl = bannerLiEls[i];
        bannerLiItemEl.style.opacity = '0'
    }

    // 处理极限值
    if (currentBannerIndex >= bannerLiEls.length) {
        currentBannerIndex = 0
    }

    // 显示当前下标的图片
    bannerLiEls[currentBannerIndex].style.opacity = '1'
    
})
// 左按钮事件
leftBtnEl.addEventListener('click', function(){
    currentBannerIndex --
    // 隐藏所有banner图片
    for (let i = 0; i < bannerLiEls.length; i++) {
        const bannerLiItemEl = bannerLiEls[i];
        bannerLiItemEl.style.opacity = '0'
    }

    // 处理极限值
    if (currentBannerIndex < 0) {
        currentBannerIndex = bannerLiEls.length - 1
    }

    // 显示当前下标的图片
    bannerLiEls[currentBannerIndex].style.opacity = '1'
})

// 小圆点按钮事件
btnEls[0].addEventListener('click', function(){
    currentBannerIndex = 0
    showBannerFn(currentBannerIndex)
})
btnEls[1].addEventListener('click', function(){
    currentBannerIndex = 1
    showBannerFn(currentBannerIndex)
})
btnEls[2].addEventListener('click', function(){
    currentBannerIndex = 2
    showBannerFn(currentBannerIndex)
})
btnEls[3].addEventListener('click', function(){
    currentBannerIndex = 3
    showBannerFn(currentBannerIndex)
})
btnEls[4].addEventListener('click', function(){
    currentBannerIndex = 4
    showBannerFn(currentBannerIndex)
})

function showBannerFn(index){
    // 隐藏所有banner图片
    for (let i = 0; i < bannerLiEls.length; i++) {
        const bannerLiItemEl = bannerLiEls[i];
        bannerLiItemEl.style.opacity = '0'
    }
    // 显示当前下标的图片
    bannerLiEls[index].style.opacity = '1'
    // 添加current类名
    for(var i = 0; i < btnEls.length; i ++) {
        var btnEl = btnEls[i]
        btnEl.className = ''
    }
    btnEls[index].className = 'current'
}

// for(var btnIndex = 0; btnIndex < btnEls.length; btnIndex ++) {
//     var btnEl = btnEls[btnIndex]
//     btnEl.addEventListener('click', (function(index){
//         return function(){
//             currentBannerIndex = index
//             // 隐藏所有banner图片
//             for (let i = 0; i < bannerLiEls.length; i++) {
//                 const bannerLiItemEl = bannerLiEls[i];
//                 bannerLiItemEl.style.opacity = '0'
//             }
//             // 显示当前下标的图片
//             bannerLiEls[currentBannerIndex].style.opacity = '1'
//             // 添加current类名
//             for(var btnIndex = 0; btnIndex < btnEls.length; btnIndex ++) {
//                 var btnEl = btnEls[btnIndex]
//                 btnEl.className = ''
//             }
//             btnEls[index].className = 'current'
//         }
//     })(btnIndex))
// }

