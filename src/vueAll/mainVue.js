import Vue from 'vue';
import $ from 'jquery';

import './Component/book_component';
import './Component/cartList_component';


new Vue({
    el: '#app',
    data: {
        title: 'Vue 電商網',
        data: [], // ajax select book
        getDo: "", // get變數
        addMoney: 0, // 購物車多加減價格
        delbookModal: {}, // 將移除購物車的書本(Modal)
        cookieCart: {}, // cookie-cartlist
    },
    methods: {
        addCart(item) { // 加入購物車 cookie
            const cartList = "cartList";
            var itemList = {
                id: item.id,
                name: item.name,
                author: item.author,
                price: item.price,
                img: item.img,
                number: 1 // 購買數量
            }
            if(this.jsCookie(cartList)==null){ //假如沒有 cookie cart 創一個
                document.cookie = cartList+"=";
            }
            if(this.jsCookie(cartList)==""){ // 購物車為空時 直接加入
                var listArr = [];
                    
                listArr.push(itemList);
                var listStr = JSON.stringify(listArr);
                document.cookie = cartList+"="+listStr;
            }else{ // 購物車非空時 push進入
                var listStr = [this.jsCookie(cartList)];
                var listArr = JSON.parse(listStr);

                listArr.push(itemList);
                var listStr = JSON.stringify(listArr);
                document.cookie = cartList+"="+listStr;
            }
        },
        removeCart(item) { // 退出購物車 cookie
            console.log('Remove Cart');
            const cartList = "cartList";

            var cartStr = this.jsCookie(cartList);
            var cartArr = JSON.parse(cartStr);
            cartArr.some(function(reBook,key){
                if(reBook.id==item.id){
                    cartArr.splice(key,1);
                    return true;
                }
            });
            this.cookieCart = cartArr; // 更新cookirCart
            cartStr = JSON.stringify(cartArr);
            document.cookie = cartList+"="+cartStr;
        },
        cartAddRemove(item) { // 加入/退出購物車
            console.log('cartAddRemove');
            const cartList = "cartList";
            const addBtn = "加入購物車";
            const removeBtn = "已加入購物車";

            var btn = document.getElementsByClassName(item.ISBN)[0];
            if(btn.textContent==addBtn){ //未加入購物車
                this.addCart(item); // 加入購物車
                btn.textContent = removeBtn;
                btn.classList.add("btn-danger");
                btn.classList.remove("btn-success");
            }else if(btn.textContent==removeBtn){ //已加入購物車
                this.removeCart(item); // 退出購物車
                btn.textContent = addBtn;
                btn.classList.add("btn-success");
                btn.classList.remove("btn-danger");
            }
            // console.log(this.jsCookie(cartList));
        },
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
        jsUrlget(getkey){ // 獲取 get 變數
            var url = location.href;
            var getvalue = "";
            if(url.indexOf('?')!=-1){
                var urlArr = url.split('?');
                var getArrs = urlArr[1].split('&');
                getArrs.some(function(item,key){
                    var getarr = item.split('=');
                    if(getarr[0]==getkey){
                        getvalue = getarr[1];
                        return true;
                    }
                })
                return getvalue;
            }else{
                return "";
            }
        },
        toDelModal(rebook) { // 將要移除書本資料(Modal)
            this.delbookModal = rebook;
        },
    },
    computed: {
        addsubCartmoney(){ // 購物商品增減價
            var vm = this;
            var total = 0;
            var cartArr = vm.cookieCart;
            cartArr.forEach(function(item){
                var num = item.number;
                var price = parseInt(item.price);
                total+=(num*price);
            })
            return total;
        }
    },
    created() {
        var vm = this;
        const getkey = "do";

        vm.getDo = this.jsUrlget(getkey); // 獲取get[do]的值
    },
    beforeMount() {
        var vm = this;

        switch(vm.getDo){
            case "book": // ?do=book 時運行
                const phpUrl = 'ajaxTest.php'; // ajax selectSQL
                $.get(phpUrl,function(data){ // Ajax 獲取資料庫書本資料
                    vm.data = JSON.parse(data);
                    console.log(vm.data);
                })
                break;
            case "cart": // ?do=cart 時運行
                const cartList = 'cartList'; // 獲取cookie cart
                var cartStr = vm.jsCookie(cartList);
                var cartArr = JSON.parse(cartStr);
                vm.cookieCart = cartArr;
                break;
        }
    },
});

console.log('mainVue.js');