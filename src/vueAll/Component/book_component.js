import Vue from 'vue';

// Template
var bookdiv = `
    <div class="book col-12 col-md-5 col-lg-3">
        <div class="book_img">
            <img class="img-thumbnail" :src="book.img" >
        </div>
        <div class="book_name">
            <h4 class="ellipsis">{{ book.name }}</h4>
        </div>
        <div class="book_author">
            作者：{{ book.author }}
        </div>
        <div class="book_price">
            NT{{ book.price }}
        </div>
        <div>
            <button @click="cart" class="btn btn-success" :class="book.ISBN">{{ cartBtn }}</button>
        </div>
    </div>
`
// Component
Vue.component ('book-component',{
    props: {
        book: {},
    },
    data: function(){
        return {
            cartBtn: "加入購物車",
        }
    },
    template: bookdiv,
    methods: {
        cart() { // 與 Vue.app的 cartAddRemove 綁定
            this.$emit('incart',this.book);
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
    },
    mounted() {
        const cartList = "cartList";
        var vm = this;
        var cartStr = this.jsCookie(cartList);
        if(cartStr!=null){
            var cartArr = JSON.parse(cartStr);
            cartArr.some(function(item,key){
                if(item.id==vm.book.id){
                    vm.cartBtn = "已加入購物車";
                    var btn = document.getElementsByClassName(vm.book.ISBN)[0];
                    btn.classList.add("btn-danger");
                    btn.classList.remove("btn-success");
                }
            })
        }
    },
})