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
                            <td>{{ cartlist.number }}</td>
                            <td @click="addPronum">+</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-12 total_num">
            NT$ {{ parseInt(cartlist.price)*cartlist.number }}
            <img src="img/trash-2.svg" @click="toDelmodal" data-toggle="modal" data-target="#staticBackdrop">
        </div>
    </div>
`

var totalmoneydiv = `
    <div class="bg_DarkGreen container">
        <h3 class="cart_title">訂單摘要</h3>
        <table class="table">
            <tr>
                <td class="text-l">小計</td><td class="text-r">NT$ {{newSubtotal}}</td>
            </tr>
            <tr>
                <td class="text-l">運費</td><td class="text-r">NT$ {{freight}}</td>
            </tr>
            <tr>
                <td class="text-l">總計</td><td class="text-r">NT$ {{newAlltotal}}</td>
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
            <slot name="dlecartmodal"></slot>
        </div>
        <div class="col-lg-4">
            <slot name="totalmoney"></slot>
        </div>
    </div>
`

var delModaldiv = `
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">確認將 [{{delbook.name}}] 移除購物車嗎?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="trueDel">確認</button>
                </div>
            </div>
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
            if(vm.cartlist.number>1){
                vm.cartlist.number-=1;
                subNum = -1*parseInt(vm.cartlist.price);
            }
        },
        addPronum() { // 增加書本數量
            var vm = this;
            var addNum = parseInt(vm.cartlist.price);
            vm.cartlist.number+=1;
        },
        toDelmodal() { // 向delModal 傳cookie物件值
            this.$emit('to-delmodal',this.cartlist);
        },
    },
})

Vue.component ('totalmoney-component',{ // 購物車費用總計
    props: {
        addtotal: 0,
    },
    data: function(){
        return {
            subtotal: 0,
            freight: 30,
        }
    },
    template: totalmoneydiv,
    computed: {
        newSubtotal() { // 小計
            var vm = this;
            var newsubtotal = vm.addtotal;
            return newsubtotal;
        },
        newAlltotal() { // 總計
            var vm = this;
            var newalltotal = vm.freight+vm.addtotal;
            return newalltotal;
        },
    },
})

Vue.component ('cart-component',{ // 購物車
    template: cartdiv,
})

Vue.component ('delcartmodal-component',{ // 商品移出購物車前確認視窗
    props: {
        delbook: {},
    },
    template: delModaldiv,
    methods: {
        trueDel() {
            this.$emit('del-book',this.delbook);
        }
    },
})