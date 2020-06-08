import Vue from 'vue';

// Template
var cartlistdiv = `
    <div class="list_div row">
        <div class="list_pro col-lg-8 col-12 d-flex flex-row">
            <div class="col-lg-4 col-6"><img :src="cartlist.img"></div>
            <div class="col-lg-8 col-6 row">
                <div class="col-md-6 col-12 list_name"><h3>{{cartlist.name}}</h3>NT$ {{cartlist.price}}</div>
                <div class="col-md-6 col-12">
                    <table class="tb_num">
                        <tr>
                            <td @click="subPronum">-</td>
                            <td>{{ proNum }}</td>
                            <td @click="addPronum">+</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-12 total_num">NT$ {{ parseInt(cartlist.price)*proNum }}</div>
    </div>
`

var totalmoneydiv = `
    <div class="bg_DarkGreen container">
        <h3 class="cart_title">訂單摘要</h3>
        <table>
            <tr>
                <td>小計</td><td>NT$ {{subtotal+addtotal}}</td>
            </tr>
            <tr>
                <td>運費</td><td>NT$ {{freight}}</td>
            </tr>
            <tr>
                <td>總計</td><td>NT$ {{subtotal+addtotal+freight}}</td>
            </tr>
        </table>
        <div class="row">
            <button class="bg_Yellow col-12">結帳</button>
        </div>
        
    </div>
`

var cartdiv = `
    <div class="row">
        <div class="col-lg-8">
            <div class="bg_LightGreen"><h2>您的購物車</h2></div>
            <slot name="cartlist"><h3>購物車目前為空</h3></slot>
        </div>
        <div class="col-lg-4">
            <slot name="totalmoney"></slot>
        </div>
    </div>
`

// Component
Vue.component ('cartlist-component',{ // 購物車清單
    props: {
        cartlist: {}
    },
    data: function(){
        return {
            proNum: 1,
        }
    },
    template: cartlistdiv,
    methods: {
        subPronum() { // 減少書本數量
            var vm = this;
            var subNum = 0;
            if(vm.proNum>1){
                vm.proNum-=1;
                subNum = -1*parseInt(vm.cartlist.price);
            }
            vm.$emit('sub-pro',subNum);
        },
        addPronum() { // 增加書本數量
            var vm = this;
            var addNum = parseInt(vm.cartlist.price);
            vm.proNum+=1;
            vm.$emit('add-pro',addNum);
        },
    },
})

Vue.component ('totalmoney-component',{ // 購物車費用總計
    props: {
        addtotal: 0,
    },
    data: function(){
        return {
            subtotal: "",
            freight: 30,
        }
    },
    methods: {
        jsCookie(cname){ // 尋找 cookie 值
            var cookie = document.cookie;
            var cvalue = null

            var cookieArr = cookie.split(';');
            cookieArr.some(function(item){
                var itemTrim = item.trim();
                var itemArr = itemTrim.split('=');
                if(cname == itemArr[0]){
                    cvalue = itemArr[1];
                    return true;
                }
            });
            return cvalue;
        },
    },
    template: totalmoneydiv,
    beforeMount() {
        console.log('totalmoney component beforeMount');
        var vm = this;
        const cartList = 'cartList';
        var total = 0;
        var cartStr = vm.jsCookie(cartList);
        var cartArr = JSON.parse(cartStr);
        cartArr.forEach(function(item){
            total += parseInt(item.price);
        })
        vm.subtotal = total;
    },
})

Vue.component ('cart-component',{ // 購物車
    template: cartdiv,
})