

function init(el) {
    $(`.${el}`).html(`
        ${
        dataInfo[el].content.slice(0, 7).map(item => {
            return `
                <div class="pro-normal ${item.id == 6 ? "big" : ""}" data-index=${item.id} data-ify="${el}">
                    <div>
                        <img src="${item.pro_anli_imgs[0]}" alt="">
                        <b>
                            <p>查看详情</p>
                        </b>
                    </div>
                    <p>${item.pro_title}</p>
                    <p>${item.pro_sort[2]}</p>
                </div>
            `
        }).join("")
        }
    `)
}


$(function () {
    init("appInfo")
    init("websiteInfo")
    init("brandInfo")
    init("marketInfo")

    $(".dynamic-detail").html(`
        <h2>${dataInfo.dynamicInfo[0].news_date.slice(5, 10)}</h2>
        <h4>${dataInfo.dynamicInfo[0].news_title.length > 18 ? dataInfo.dynamicInfo[0].news_title.slice(0, 18) + "..." : dataInfo.dynamicInfo[0].news_title}</h4>
        <p>${dataInfo.dynamicInfo[0].news_info_top.length > 30 ? dataInfo.dynamicInfo[0].news_info_top.slice(0, 30) + "..." : dataInfo.dynamicInfo[0].news_info_top}</p>
        <img src="${dataInfo.dynamicInfo[0].news_img}" alt="">
        <div>
            <a data-index=${dataInfo.dynamicInfo[0].id} data-ify="dynamicInfo" href="javascript:void(0);">查看详情</a>
        </div>
    `)

    $(".dynamic-list ul").html(`
        ${
        dataInfo.dynamicInfo.slice(0, 8).map(item => {
            return `
                    <li data-index=${item.id} data-ify="dynamicInfo">
                        <div>
                            <h4>${item.news_title.length > 18 ? item.news_title.slice(0, 18) + "..." : item.news_title}</h4>
                            <p>${item.news_info_top.length > 18 ? item.news_info_top.slice(0, 18) + "..." : item.news_info_top}</p>
                        </div>
                        <p>${item.news_date.slice(5, 10)}</p>
                    </li>
                `
        }).join("")
        }
    `)


})




var mySwiper = new Swiper('.swiper-container', {
    speed: 700,
    autoplay: {
        disableOnInteraction: false,
        delay: 2000,
    },
    pagination: {
        el: '.swiper-pagination',
        bulletClass: 'my-bullet',
        bulletActiveClass: 'my-bullet-active',
        clickable: true,
        renderBullet: function (index, className) {
            return `<li data-index="${index}" class="${className}"><b>${dataInfo.bannerShow[index]}<br/>解决方案</b></li>`;
        },
    },
})
let Winit = $(window).width(), sN = 3
if (Winit <= 1440 && Winit > 768) {
    sN = 2
} else if (Winit <= 768) {
    sN = 1
} else {
    sN = 3
}
var index_mySwiper3 = new Swiper('.swiper-container3', {
    speed: 700,
    slidesPerView: sN,
    navigation: {
        nextEl: '.next-button',
        prevEl: '.pre-button',
    },
})
$(".top-show li")
    .mouseenter(function () {
        mySwiper.slideTo($(this).attr("data-index"), 1000, false)
    })
$(".dynamic-detail").on("click", "a", function () {
    const i = $(this).attr("data-index")
    const t = $(this).attr("data-ify")
    setWebStorage("news-detail", JSON.stringify(dataInfo[t][i]))
    location.href = "./news-detail.html"
})
$(".dynamic-list").on("click", "li", function () {
    const i = $(this).attr("data-index")
    const t = $(this).attr("data-ify")
    setWebStorage("news-detail", JSON.stringify(dataInfo[t][i]))
    location.href = "./news-detail.html"
})
$(".classify-item").on("click", ".pro-normal", function () {
    const i = $(this).attr("data-index")
    const t = $(this).attr("data-ify")
    setWebStorage("anli-detail", JSON.stringify(dataInfo[t].content[i]))
    location.href = "./anli-detail.html"
})
$(".maskInfo div").click(() => {
    this.location.href = "./aboutUs.html"
})

$(window).resize(function () {
    let W = $(window).width()
    if (index_mySwiper3) {
        if (W <= 1440 && W > 768) {
            index_mySwiper3.destroy(false)
            index_mySwiper3 = new Swiper('.swiper-container3', {
                speed: 700,
                slidesPerView: 2,
                navigation: {
                    nextEl: '.next-button',
                    prevEl: '.pre-button',
                },
            })
        } else if (W <= 768) {
            index_mySwiper3.destroy(false)
            index_mySwiper3 = new Swiper('.swiper-container3', {
                speed: 700,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.next-button',
                    prevEl: '.pre-button',
                },
            })
        } else {
            index_mySwiper3.destroy(false)
            index_mySwiper3 = new Swiper('.swiper-container3', {
                speed: 700,
                slidesPerView: 3,
                navigation: {
                    nextEl: '.next-button',
                    prevEl: '.pre-button',
                },
            })
        }
    }
});

