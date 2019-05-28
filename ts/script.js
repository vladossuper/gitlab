var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Базовый класс
var Product = /** @class */ (function () {
    function Product(id, name, price, description, inStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = inStock;
    }
    //Инициализация карточки
    Product.prototype.Init = function () {
        var h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = this.name;
        var divprice = document.createElement("div");
        divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        divprice.innerHTML = this.price + " грн.";
        var divavail = document.createElement("div");
        if (this.IsAvailable()) {
            divavail.setAttribute("class", "col-6 p-0 text-right text-success");
            divavail.innerHTML = "Есть в наличии";
        }
        else {
            divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
            divavail.innerHTML = "Нет в наличии";
        }
        var divrow = document.createElement("div");
        divrow.setAttribute("class", "row");
        divrow.appendChild(divprice);
        divrow.appendChild(divavail);
        var divcon = document.createElement("div");
        divcon.setAttribute("class", "container");
        divcon.appendChild(divrow);
        var p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = this.description;
        var a = document.createElement("a");
        a.setAttribute("id", this.id.toString());
        a.setAttribute("href", "#buyModal");
        a.setAttribute("class", "btn btn-primary");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("onclick", "WantBuy(this.id)");
        a.innerHTML = "Купить";
        var divfu = document.createElement("div");
        divfu.setAttribute("class", "card-footer");
        divfu.appendChild(a);
        var divcardb = document.createElement("div");
        divcardb.setAttribute("class", "card-body mh-100");
        divcardb.setAttribute("style", "height: 200px");
        divcardb.appendChild(h5);
        divcardb.appendChild(divcon);
        divcardb.appendChild(p);
        var divcard = document.createElement("div");
        divcard.setAttribute("class", "card");
        divcard.appendChild(divcardb);
        divcard.appendChild(divfu);
        var divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
        divcol.appendChild(divcard);
        return divcol;
    };
    //Добавление карточки в строку
    Product.prototype.Embed = function (obj) {
        var prods = document.getElementById('rowts');
        prods.appendChild(obj);
    };
    //Определение есть ли товар в наличии
    Product.prototype.IsAvailable = function () {
        return (this.inStock > 0) ? true : false;
    };
    return Product;
}());
//Перечисление доступных цветов
var Color;
(function (Color) {
    Color["Black"] = "\u0427\u0451\u0440\u043D\u044B\u0439";
    Color["Gray"] = "\u0421\u0435\u0440\u044B\u0439";
    Color["Pink"] = "\u0420\u043E\u0437\u043E\u0432\u044B\u0439";
})(Color || (Color = {}));
;
//Класс со сложными особенностями
var FeltBoots = /** @class */ (function (_super) {
    __extends(FeltBoots, _super);
    function FeltBoots(id, name, price, description, inStock, list) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.list = list;
        _this.CalculateFlags();
        _this.Init();
        return _this;
    }
    //Вычисление сложных особенностей
    FeltBoots.prototype.CalculateFlags = function () {
        //Поиск больших размеров
        this.isBigSizes = false;
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        //Поиск доступных цветов
        var k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (var i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    };
    FeltBoots.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBigSizes) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            var str = this.haveColors[0];
            for (var i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        this.Embed(obj);
    };
    return FeltBoots;
}(Product));
//Класс с группировкой
var Headphones = /** @class */ (function (_super) {
    __extends(Headphones, _super);
    function Headphones(id, name, price, description, inStock, isWireless) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.isWireless = isWireless;
        _this.Init();
        return _this;
    }
    Headphones.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isWireless) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Беспроводные";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isWireless");
            inp.setAttribute("onclick", "CheckWireless(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только беспроводные<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    return Headphones;
}(Product));
//Группировка по беспроводным наушникам
function CheckWireless(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Headphones && productList[i].isWireless)
                productList[i].Init();
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
function CheckOnRozetka(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++) {
            if (productList[i] instanceof Clothes && productList[i].onRozetka) {
                productList[i].Init();
            }
        }
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
function CheckSmart(flag) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (var i = 0; i < this.productList.length; i++) {
            if (productList[i] instanceof PC && productList[i].isPortable) {
                productList[i].Init();
            }
        }
    }
    else {
        for (var i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}
var PC = /** @class */ (function (_super) {
    __extends(PC, _super);
    function PC(id, name, price, description, inStock, PC) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.PC = PC;
        _this.findSpecifics();
        _this.Init();
        return _this;
    }
    PC.prototype.findSpecifics = function () {
        if (this.PC != null) {
            this.isIpsDisplay = false;
            // пошук wifi в даній моделі
            for (var i = 0; i < this.PC.length; i++) {
                if (this.PC[i].ipsDisplay) {
                    this.isIpsDisplay = true;
                }
                if (this.PC[i].isPortable) {
                    this.isPortable = true;
                }
            }
        }
    };
    PC.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        if (this.isIpsDisplay) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "С IPS экраном";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (this.isPortable) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Портативный компьютер";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        this.Embed(obj);
    };
    return PC;
}(Product));
var Clothes = /** @class */ (function (_super) {
    __extends(Clothes, _super);
    function Clothes(id, name, price, description, inStock, specs) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.specs = specs;
        _this.findSpecifics();
        _this.Init();
        return _this;
    }
    Clothes.prototype.findSpecifics = function () {
        if (this.specs != null) {
            this.isCotton = false;
            for (var i = 0; i < this.specs.length; i++) {
                if (this.specs[i].isCotton) {
                    this.isCotton = true;
                }
                if (this.specs[i].onRozetka) {
                    this.onRozetka = true;
                }
            }
        }
    };
    Clothes.prototype.Init = function () {
        var obj = _super.prototype.Init.call(this);
        if (this.isCotton) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Котоновая одежда";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (this.onRozetka) {
            var p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Доступно на Rozetka";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        if (document.getElementById('isColor') == null && this.isCotton != null && this.isCotton) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isColor");
            inp.setAttribute("onclick", "CheckSmart(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только портативные<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
        if (document.getElementById('onRozetka') == null && this.onRozetka != null && this.onRozetka) {
            var inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "onRozetka");
            inp.setAttribute("onclick", "CheckOnRozetka(this.checked)");
            var lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "На Rozetka<br>";
            var div = document.getElementById('myTools');
            div.appendChild(lab);
        }
        this.Embed(obj);
    };
    return Clothes;
}(Product));
//Класс пока не имеющий отличий от базового
var Balalaika = /** @class */ (function (_super) {
    __extends(Balalaika, _super);
    function Balalaika(id, name, price, description, inStock) {
        var _this = _super.call(this, id, name, price, description, inStock) || this;
        _this.id = id;
        _this.name = name;
        _this.price = price;
        _this.description = description;
        _this.inStock = inStock;
        _this.Init();
        return _this;
    }
    Balalaika.prototype.Init = function () {
        this.Embed(_super.prototype.Init.call(this));
    };
    return Balalaika;
}(Product));
var Basket = /** @class */ (function () {
    function Basket() {
        this.list = []; //Список товаров в корзине
    }
    //Добавить товар в корзину. Возвращает результат операции
    Basket.prototype.Add = function (val) {
        var num = +document.getElementById('inputquantity').value;
        //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
        if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
            if (productList[val].inStock < num)
                document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
            else
                document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            productList[val].inStock -= num;
            this.list[this.list.length] = { id: val, quantity: num };
            console.log(this.list);
            this.UniteSameElements();
            this.CalculateBasket();
            return true;
        }
    };
    Basket.prototype.UniteSameElements = function () {
        var _this = this;
        if (this.list.length >= 2) {
            var _loop_1 = function (i) {
                var equalsElement = this_1.list.filter(function (el) { return el.id == _this.list[i].id; });
                console.log(equalsElement);
                if (equalsElement.length > 1) {
                    var quantity = equalsElement[1].quantity;
                    this_1.list[this_1.list.indexOf(equalsElement[0])].quantity += quantity;
                    this_1.list.splice(this_1.list.indexOf(equalsElement[1]), 1);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.list.length; i++) {
                _loop_1(i);
            }
        }
    };
    //Пересчитать товары в корзине
    Basket.prototype.CalculateBasket = function () {
        if (this.list.length > 0) {
            var id = void 0;
            var total = 0;
            var message = "В даннвй момент в корзине:<br>";
            for (var i = 0; i < this.list.length; i++) {
                message += productList[this.list[i].id].name + " - " + this.list[i].quantity + "<br>";
                total += productList[this.list[i].id].price * this.list[i].quantity;
            }
            message += "<br><br>На общую сумму " + total + " грн.";
            document.getElementById('myBasket').innerHTML = message;
        }
        else
            document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    };
    return Basket;
}());
//Действие на кнопке "добавить в корзину"
function myByBtn(val) {
    if (basket.Add(val))
        $('#buyModal').modal('hide');
}
//Действие на кнопке "купить"
function WantBuy(val) {
    var currentProduct = productList[val];
    var aviable = document.getElementById("aviable");
    aviable.innerHTML = String(currentProduct.inStock);
    document.getElementById('modlalBtn').setAttribute("value", val);
}
//Инициализация корзины
var basket = new Basket();
//Список продуктов
var productList = [
    new Headphones(0, "Наушники фирмы1", 816, "Прекрасные наушники! Сама английская королева слушает жесткий металл через такие же!", 4, true),
    new FeltBoots(1, "Валенки2", 91.2, "Хороший выбор! В них тепло, хорошо. Обувь многосезонная - лето, осень, зима, весна.", 6, [{ dimension: 44, color: Color.Black, quantity: 2 },
        { dimension: 43, color: Color.Black, quantity: 3 },
        { dimension: 42, color: Color.Black, quantity: 1 },
        { dimension: 41, color: Color.Black, quantity: 2 },
        { dimension: 44, color: Color.Gray, quantity: 2 },
        { dimension: 39, color: Color.Gray, quantity: 1 },
        { dimension: 45, color: Color.Gray, quantity: 1 },
        { dimension: 42, color: Color.Gray, quantity: 1 },
    ]),
    new Headphones(2, "Наушники фирмы4", 119.50, "Дёшево не значит плохо! Эти наушники стоят своих денег!", 30, false),
    new Headphones(3, "Наушники фирмы2", 144, "Это оптимальный выбор! Налетай торопись!", 15, true),
    new Balalaika(4, "Балалайка1", 915, "Сам страдивари её выстругал! Мастер Страдивари Аарон Моисеевич ©. В комплекте к балалайке должен идти медведь.", 1),
    new FeltBoots(5, "Валенки3", 65, "Валенки знаменитой российской фабрики Красный ЦинБаоЧен. Оригинальный продукт сделаный по технологиям прошлого.", 1),
    new Headphones(6, "Наушники фирмы3", 265, "Тру поклонники музыки обязательно такие имеют! А ты что? Ты не тру?!", 0),
    new FeltBoots(7, "Валенки1", 666.66, "Валенки великолепной работы слепого мастера Игната! В комплекте к валенкам идёт кокошник.", 2, [{ dimension: 45, color: Color.Pink, quantity: 1 },
        { dimension: 43, color: Color.Pink, quantity: 1 }
    ]),
    new Balalaika(8, "Балалайка2", 217, "Обычная балалайка белорусской фирмы Змрочныя мелодыі.", 1),
    new PC(9, "Apple MacBook Pro 13", 70000, "Наслаждайтесь работой за ноутбуком вместе с компанией Apple", 33, [
        { isPortable: true, ipsDisplay: true },
        { isPortable: true, ipsDisplay: false },
    ]),
    new Clothes(10, "Gucci Jacket", 65000, "Самая модная куртка от самого модного бренда", 10, [
        { isCotton: true, onRozetka: false },
        { isCotton: true, onRozetka: true },
    ]),
];
