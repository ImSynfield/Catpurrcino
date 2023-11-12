var DRINKS_ARRAY = []
var LUNCHS_ARRAY = []

class Product{
    constructor(type, index, name, image){
        this.name = name

        this.html = `
        <div id="${type}-${index}" onclick="show_Infos(this.id)" class="product">
            <img id="${type}-${index}-image" src="products/${type}/${image}">
            <h4 id="${type}-${index}-name">${name}</h4>
        </div>
        `
    }
}

// Function that creates and displays products
function create_Products(type, name, image){
    let prod_index
    if(type == "drinks"){
        DRINKS_ARRAY.push(name)
        prod_index = DRINKS_ARRAY.indexOf(name)
    }else if(type == "lunchs"){
        LUNCHS_ARRAY.push(name)
        prod_index = LUNCHS_ARRAY.indexOf(name)
    }


    let productObj = new Product(type, prod_index, name, image)
    let prod_list = document.getElementById(type)

    prod_list.insertAdjacentHTML("beforeend", productObj.html)
}

// Function that shows a selected product
function show_Infos(id){
    let index = id.substr(-1)
    let type = id.substring(0, id.length - 3)
    let name = (type == "drink") ? DRINKS_ARRAY[index] : LUNCHS_ARRAY[index]

    window.alert(`
    Type: ${type}
    Index: ${index}
    Name: ${name}
    `)
}

// Load products.json
fetch('./products/products.json') 
    .then(results => results.json())
    .then(data => {
        for(i = 0; i < Object.keys(data.drinks).length; i++){
            create_Products("drinks", data.drinks[i].name, data.drinks[i].image)
        }
        for(i = 0; i < Object.keys(data.lunchs).length; i++){
            create_Products("lunchs", data.lunchs[i].name, data.lunchs[i].image)
        }
    })
;