function addQuantityUp(x) {

    x.parentElement.parentElement.children[0].innerText++
}

function addQuantityDown(x) {
    if (x.parentElement.parentElement.children[0].innerText == 1) {
        x.parentElement.parentElement.children[0].innerText = 2
    }
    x.parentElement.parentElement.children[0].innerText--
}

function hidenlist(x) {
    document.querySelector('.section__cart .list-product').classList.remove('display_block')
}
const list_product = document.querySelector('.section__cart .list-product')

function showCart() {
    list_product.classList.toggle('display_block')
    login.classList.remove('sliderPopSingle')
    nav.classList.remove('sliderMenu')

    // if (document.querySelector('.info-product').style.display == 'none') {
    //     document.querySelector('.info-product').style.display = 'block'


    // } else {
    //     document.querySelector('.info-product').style.display = 'none'

    // }
}



var allInfoProduct = new Array()
var allMoney = 0
const span_quantity = document.querySelector('.section__cart .cart span')
console.log(span_quantity)

function addToCart(x) {
    var test = true
    var imgProduct = x.parentElement.parentElement.children[0].children[0].src
    var nameProduct = x.parentElement.children[0].children[1].innerText
    var priceProduct = parseInt(x.parentElement.children[0].children[0].children[1].innerText)
    var quantityProduct = parseInt(x.parentElement.children[1].children[0].innerText)
    var moneyProduct = priceProduct * quantityProduct
    var infoProduct = new Array(imgProduct, nameProduct, priceProduct, quantityProduct, moneyProduct)
    allMoney += moneyProduct

    for (var i = 0; i < allInfoProduct.length; ++i) {
        if (nameProduct == allInfoProduct[i][1]) {
            test = false
            quantityProduct += allInfoProduct[i][3]
            allInfoProduct[i][3] = quantityProduct
            allInfoProduct[i][4] = allInfoProduct[i][3] * allInfoProduct[i][2]
            break
        }
    }
    if (test) {
        allInfoProduct.push(infoProduct)

    }

    showToCart()
    addQuantity()
    totalMoney()

    sessionStorage.setItem("allInfoProduct", JSON.stringify(allInfoProduct))

}

function addQuantity() {
    document.getElementById('quantity').innerText = allInfoProduct.length
    span_quantity.classList.add('changeSpan')
    setTimeout(() => {
        span_quantity.classList.remove('changeSpan')
    }, 200)
}

function showToCart() {

    var show_product = document.getElementById('show_product')


    var cart = ""
    for (let i = 0; i < allInfoProduct.length; i++) {
        if (show_product) {
            var [img, name, price, quantity, money] = allInfoProduct[i]
            cart += `
                <tr>
                    <td><span>${i+1}</span></td>
                    <td><img src="${img}" alt=""></td>
                    <td class="nameProduct"><span>${name}</span></td>
                    <td><span>${price}</span></td>
                    <td><span>${quantity}</span></td>
                    <td><span>${money}</span></td>
                    <td><span onclick="deleteProduct(this)">xóa</span></td>
                </tr>
                    `

        }


    }

    show_product.innerHTML = cart


}

function deleteProduct(x) {

    console.log(allInfoProduct)
    for (var i = 0; i < allInfoProduct.length; ++i) {
        console.log(allInfoProduct[i][1])
        console.log(x.parentElement.parentElement.children[2].children[0].innerText)
        if (x.parentElement.parentElement.children[2].children[0].innerText == allInfoProduct[i][1]) {
            allMoney -= allInfoProduct[i][4]
            allInfoProduct.splice(i, 1)
            sessionStorage.setItem("allInfoProduct", JSON.stringify(allInfoProduct))


        } else {

        }
        showToCart()
        addQuantity()
        totalMoney()
    }
}

function deleteAll(params) {
    allInfoProduct = []
    sessionStorage.setItem("allInfoProduct", JSON.stringify(allInfoProduct))
    allMoney = 0
    showToCart()
    addQuantity()
    totalMoney()
}

function totalMoney() {
    document.querySelector('.alltotal').innerText = allMoney

}

function showCart_pagePay() {
    var allInfoProduct = JSON.parse(sessionStorage.getItem("allInfoProduct"))
    var show_product = document.getElementById('show_product')
    if (show_product) {
        for (var i = 0; i < allInfoProduct.length; i++) {
            var [img, name, price, quantity, money] = allInfoProduct[i]
            allMoney += allInfoProduct[i][4]
            var child = document.createElement('tr')
            if (child) {
                child.innerHTML = `
                    <td><span>${i+1}</span></td>
                    <td><img src="${img}" alt=""></td>
                    <td class="nameProduct"><span>${name}</span></td>
                    <td><span>${price}</span></td>
                    <td><input type="number" id="handleQuantity" onchange="handleQuantity(this)" value=${quantity}></td>
                    <td><span> ${money}</span></td>
                    `
            }
            show_product.appendChild(child)

        }

    }
    totalMoney()
}

function showCart_pagePay_nochange() {
    var allInfoProduct = JSON.parse(sessionStorage.getItem("allInfoProduct"))
    var show_product = document.getElementById('show_product')
    if (show_product) {
        for (var i = 0; i < allInfoProduct.length; i++) {
            var [img, name, price, quantity, money] = allInfoProduct[i]
            allMoney += allInfoProduct[i][4]
            var child = document.createElement('tr')
            if (child) {
                child.innerHTML = `
                    <td><span>${i+1}</span></td>
                    <td><img src="${img}" alt=""></td>
                    <td class="nameProduct"><span>${name}</span></td>
                    <td><span>${price}</span></td>
                    <td><span>${quantity}</span></td>
                    <td><span> ${money}</span></td>
                    `
            }
            show_product.appendChild(child)

        }

    }
    totalMoney()
}
const handleQuantity = (x) => {
    var allInfoProduct = JSON.parse(sessionStorage.getItem("allInfoProduct"))
        // console.log(x.parentElement.parentElement.children[2].children[0].innerText)
    const nameChange = x.parentElement.parentElement.children[2].children[0].innerText

    if (allInfoProduct) {
        let total = 0
        for (let i = 0; i < allInfoProduct.length; i++) {
            var [img, name, price, quantity, money] = allInfoProduct[i]
            if (nameChange === name) {
                if (x.value <= 1) {
                    console.log('am')
                    x.value = 1
                }
                allInfoProduct[i][3] = x.value
                allInfoProduct[i][4] = allInfoProduct[i][2] * allInfoProduct[i][3]
                x.parentElement.nextElementSibling.children[0].innerText = allInfoProduct[i][4]
            }
        }
        sessionStorage.setItem('allInfoProduct', JSON.stringify(allInfoProduct))
        for (let i = 0; i < allInfoProduct.length; i++) {
            total += allInfoProduct[i][4]

        }
        document.querySelector('.alltotal').innerText = total
    }
}
const allCus = []

function result(x) {
    var form = document.getElementById('form')
    if (form) {
        var nameCus = form.children[0].children[1].value
        var emailCus = form.children[1].children[1].value
        var phoneCus = form.children[2].children[1].value
        var dressCus = form.children[3].children[1].value
        const country = form.children[4].children[1].value
        var infoCus = new Array(nameCus, emailCus, phoneCus, dressCus, country)
        sessionStorage.setItem("infoCus", JSON.stringify(infoCus))

    }





}

function cus(params) {
    var info = ""
    var infoCus = JSON.parse(sessionStorage.getItem("infoCus"))
    if (allCus) {
        for (let i = 0; i < allCus.length; i++) {
            const [a, b, c, d, e] = allCus[i]
            if (infoCus[0] === a && infoCus[1] === b && infoCus[2] === c && infoCus[3] === d && infoCus[4] === e) {

            } else {
                allCus.push(infoCus)
                localStorage.setItem("infoCus", JSON.stringify(infoCus))
            }
        }
    }
    var [a, b, c, d, e] = infoCus
    console.log(infoCus)
    info += `
            <article>
                <strong>Họ Và Tên :</strong>
                <p>${a}</p>
            </article>
            <article>
                <strong>Email :</strong>
                <p>${b}</p>
            </article>
            <article>
                <strong>Số Điện Thoại :</strong>
                <p>${c}</p>
            </article>
            <article>
                <strong>Địa Chỉ :</strong>
                <p>${d}</p>
            </article>
            <article>
                <strong>Thành Phố :</strong>
                <p>${e}</p>
        </article>
     `
    var cus = document.getElementById('cus')
    cus.innerHTML = info
}
const login = document.getElementById('login')
const nav = document.querySelector('#nav ul')


function showMenu() {
    nav.classList.toggle('sliderMenu')
    login.classList.remove('sliderPopSingle')
    list_product.classList.remove('display_block')
}


function sliderLogin() {

    login.classList.toggle('sliderPopSingle')
    nav.classList.remove('sliderMenu')
    list_product.classList.remove('display_block')

}
window.addEventListener('resize', function() {
    if (this.window.innerWidth > 799) {
        var nav = this.document.getElementById('nav')
        if (nav) {
            nav.children[0].style.animation = 'none'
        }
        if (login) {
            // login.style.animation = 'none'

        }


    } else {
        login.classList.remove('sliderPopSingle')
    }
})


//scroll window
window.addEventListener('scroll', () => {
    y = window.scrollY
    if (y > 0) {
        document.getElementById('nav').classList.add('navFixed')
        nav.classList.add('changeMenu')
        login.classList.add('changeLogin')
        document.querySelector('.login').classList.add('changeTextLogin')
    } else {
        document.getElementById('nav').classList.remove('navFixed')
        nav.classList.remove('changeMenu')
        login.classList.remove('changeLogin')
        document.querySelector('.login').classList.remove('changeTextLogin')
    }
})