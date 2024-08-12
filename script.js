var app = new Vue({
    el:".onion_img, .Tomato_one_main_content, .Contact_us_main_content",
    data:{
        store_name:"Agridera Fresh Market Onions Hybrids",
        products:
        [{
            id:"onion_1", 
            title:"TAG 1000 (TAG 853)",
            short_text:'Onion Determinate White Standard Round',
            link:"Tomato_one.html", 
            desc:"Full desc",
            image:"onion_1.png",            
        },
        {   id:"onion_2", 
            title:"TAG 1001 (TAG 855)", 
            short_text:'Onion Determinate Red Standard Round', 
            link:"Tomato_one.html", 
            desc:"Full desc",
            image:"onion_2.jpg",
            
        },    
        {   
            id:"onion_3", 
            title:"TAG 1002 (TAG 809)", 
            short_text:'Onion Determinate Red Standard Round', 
            link:"Tomato_one.html", 
            desc:"Full desc",
            image:"onion_3.jpg",
            
        },
        {
            id:"onion_4", 
            title:"TAG 1003 (TAG 834)", 
            short_text:'Onion Determinate Red Standard Round', 
            link:"Tomato_one.html",  
            desc:"Full desc",
            image:"onion_4.jpg",
            
        },
        {
            id:"onion_5", 
            title:"TAG 1004 (TAG 848)", 
            short_text:'Onion Determinate Red BEEF Round', 
            link:"Tomato_one.html",  
            desc:"Full desc",
            image:"onion_5.jpg",
            
        }],
        product:[], 
        card: [],   
        contactFields: [],
        order: 0,
        btnVisible: false
},   
mounted:function(){
    this.getProduct();
    this.checkInCard();
    this.getCard();
},

//     mounted:function(){
//         console.log(window.localStorage.getItem('prod'));
//     },
//     methods:{
//         addItem:function(id) {
//             window.localStorage.setItem('prod', id);
//         }
//     }
methods:{
    getProduct:function(){
        if(window.location.hash){
            var id = window.location.hash.replace('#','');
            if(this.products && this.products.length>0){
                for(i in this.products){
                    if(this.products[i] && this.products[i] && id == this.products[i].id) this.product=this.products[i];
                }
            }
        }

    },
   addToCard:function(id){
    var card = [];
    if(window.localStorage.getItem('card')){
        card = window.localStorage.getItem('card').split(',');
    }

    if(card.indexOf(String(id))){
        card.push(id);
        window.localStorage.setItem('card',card.join());
        this.btnVisible=true;
    }
    },
    checkInCard:function(){
        if(this.product && this.product.id && window.localStorage.getItem('card')
        .split(',').indexOf(String(this.product.id))!=-1) this.btnVisible=true;
        
    },
    getCard() {
        if (window.localStorage.getItem("card") != null) {
          if (this.products != null && this.products.length > 0) {
            for (let i in this.products) {
              if (
                this.products[i] != null &&
                this.products[i].id != null &&
                window.localStorage
                  .getItem("card")
                  .split(",")
                  .indexOf(String(this.products[i].id)) != -1
              )
                this.card.push(this.products[i]);
            }
          }
        }
      },
      removeFromCard(id) {
        let card = [];
        if (window.localStorage.getItem("card") != null) {
          card = window.localStorage.getItem("card").split(",");
        }
        if (card.indexOf(String(id)) != -1) {
          card.splice(card.indexOf(String(id)), 1);
          window.localStorage.setItem("card", card.join(","));
          this.card = [];
          this.getcard();
        }
      },
      makeOrder() {
        this.card = [];
        window.localStorage.setItem("card", "");
        this.order = 1;
      },
    },
});
