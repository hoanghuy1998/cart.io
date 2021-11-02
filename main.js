if (document.querySelector('.info-product')) {

    document.querySelector('.info-product').style.display = 'none'
}

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
    document.querySelector('.info-product').style.display = 'none'
}

function showCart(x) {


    if (document.querySelector('.info-product').style.display == 'none') {
        document.querySelector('.info-product').style.display = 'block'


    } else {
        document.querySelector('.info-product').style.display = 'none'

    }
}



var allInfoProduct = new Array()
var allMoney = 0

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

        if (allInfoProduct) {
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

    }
    totalMoney()
}

function result() {
    var form = document.getElementById('form')
    if (form) {
        var nameCus = form.children[0].children[1].value
        var dressCus = form.children[1].children[1].value
        var phoneCus = form.children[2].children[1].value
        var emailCus = form.children[3].children[1].value
        var infoCus = new Array(nameCus, dressCus, phoneCus, emailCus)
        sessionStorage.setItem("infoCus", JSON.stringify(infoCus))
        console.log(infoCus)


    }





}

function cus() {
    var info = ""
    var infoCus = JSON.parse(sessionStorage.getItem("infoCus"))
    if (infoCus) {
        var [a, b, c, d] = infoCus
        console.log(infoCus)
        info += `
            <article>
                <span>họ và tên :</span>
                <p>${a}</p>
            </article>
            <article>
                <span>địa chỉ :</span>
                <p>${b}</p>
            </article>
            <article>
                <span>số điện thoại :</span>
                <p>${c}</p>
            </article>
            <article>
                <span>email :</span>
                <p>${d}</p>
            </article>
        `
        var cus = document.getElementById('cus')
        console.log(cus)

        cus.innerHTML = info

    }


}

var slider = 1

function showMenu(x) {
    slider++
    if (slider > 2) {
        slider = 1
    }
    switch (slider) {
        case 1:
            x.parentElement.children[0].style.animation = 'ease sliderOut 1s forwards'
            break;

        default:
            x.parentElement.children[0].style.animation = 'ease sliderOn 1s forwards'
            break;
    }
}


var slider2 = 2

var login = document.querySelector('#login')

function sliderLogin(params) {
    console.log(login)
    if (login) {
        slider2++
        if (slider2 > 2) {
            slider2 = 1
        }
        switch (slider2) {
            case 1:
                login.style.animation = 'ease sliderToCenter 1s forwards'
                break;

            default:
                login.style.animation = 'ease sliderToTop 1s forwards'
                break;
        }


    }
}
window.addEventListener('resize', function() {
    if (this.window.innerWidth > 799) {
        var nav = this.document.getElementById('nav')
        if (nav) {
            nav.children[0].style.animation = 'none'
        }
        if (login) {
            login.style.animation = 'none'

        }


    } else {
        slider = 1
        slider2 = 2
    }
})































// var click_cart = document.querySelector('.click-cart')
// var show_cart = click_cart.parentElement.parentElement.children[1].children[0]
// show_cart.style.display = 'none'
//     // bật tắc giỏ hàng
// if (click_cart) {
//     click_cart.addEventListener('click', function() {
//         if (show_cart.style.display == 'none') {
//             show_cart.style.display = 'block'


//         } else {
//             show_cart.style.display = 'none'
//         }
//     })
// }

// //thêm lượng sản phẩm
// var add = document.querySelectorAll('.add')
// if (add) {
//     for (let i = 0; i < add.length; i++) {
//         add[i].children[0].addEventListener('click', function() {
//             add[i].parentElement.children[0].innerText++
//         })
//         add[i].children[1].addEventListener('click', function() {
//             if (add[i].parentElement.children[0].innerText == 1) {
//                 add[i].parentElement.children[0].innerText = 2
//             }
//             add[i].parentElement.children[0].innerText--
//         })

//     }

// }




// //thêm số lượng  sản phẩm
// var addProduct = document.querySelectorAll('.addproduct')

// var allInfoProduct = new Array()
// var allMoney = 0

// if (addProduct) {
//     for (let i = 0; i < addProduct.length; i++) {
//         addProduct[i].addEventListener('click', function() {
//             var test = true
//             var imgProduct = addProduct[i].parentElement.parentElement.children[0].src
//             var nameProduct = addProduct[i].parentElement.children[0].children[1].innerText
//             var priceProduct = parseInt(addProduct[i].parentElement.children[0].children[0].children[1].innerText)
//             var quantityProduct = parseInt(addProduct[i].parentElement.children[1].children[0].innerText)
//             var moneyProduct = priceProduct * quantityProduct
//             var infoProduct = new Array(imgProduct, nameProduct, priceProduct, quantityProduct, moneyProduct)

//             // for (var j = 0; j < allInfoProduct.length; j++) {
//             //     if (allInfoProduct[j][1] == nameProduct) {
//             //         console.log('trùng')
//             //         test = false
//             //         quantity += allInfoProduct[j][3]
//             //         allInfoProduct[j][3] = quantity
//             //         break
//             //     }

//             // }
//             // if (test) {
//             //     allInfoProduct.push()
//             //     count++
//             // }
//             allInfoProduct.push(infoProduct)
//             addProductToCart(imgProduct, nameProduct, priceProduct, quantityProduct, moneyProduct)
//             allMoney += moneyProduct
//             var alltotal = document.querySelector('.alltotal')
//             if (alltotal) {
//                 alltotal.innerText = allMoney
//             }


//             click_cart.parentElement.children[1].innerText = allInfoProduct.length
//         })

//     }
// }


// function addProductToCart(imgProduct, nameProduct, priceProduct, quantityProduct, moneyProduct) {
//     var show_product = document.getElementById('show_product')
//     if (show_product) {
//         var child = document.createElement('tr')
//         console.log(allInfoProduct)
//         for (let i = 0; i < allInfoProduct.length; i++) {
//             if (child) {
//                 child.innerHTML = `
//                     <td><span>${i+1}</span></td>
//                     <td><img src="${imgProduct}" alt=""></td>
//                     <td><span>${nameProduct}</span></td>
//                     <td><span>${priceProduct}</span></td>
//                     <td><span>${quantityProduct}</span></td>
//                     <td><span>${moneyProduct}</span></td>
//                     `
//             }
//         }
//         show_product.appendChild(child)
//     }
// }