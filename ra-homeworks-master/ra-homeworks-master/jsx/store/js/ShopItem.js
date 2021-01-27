// Компонент должен иметь один атрибут item, в котором он ожидает объект с информацией о товаре со следующими свойствами:
//
// brand — название производителя товара,
// title — название товара,
// description — краткое описание товара,
// descriptionFull — подробное описание товара,
// price — цена товара,
// currency — валюта товара.
// Компонент должен создавать DOM элемент следующей структуры:
//
// <div class="main-content">
//   <h2>Tiger of Sweden</h2>
//   <h1>Leonard coat</h1>
//   <h3>Minimalistic coat in cotton-blend</h3>
//   <div class="description">
//     Men's minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.
//   </div>
//   <div class="highlight-window  mobile"><div class="highlight-overlay"></div></div>
//   <div class="divider"></div>
//   <div class="purchase-info">
//     <div class="price">£399.00</div>
//     <button>Добавить в корзину</button>
//   </div>
// </div>
// Соответственно название производителя необходимо подставить в h2, название товара в h1, краткое описание в <h3>, подробное описание в div.description, цену и валюту в div.price. При этом символ валюты должен следовать перед ценой, а цена должна быть представлена с двумя числами после запятой.

const TEXT = 'Hello world!';
const CONFIG = {
    marginTop:20,
    color:'grey'
};
const IMG_SRC = 'https://i.pinimg.com/originals/6c/bf/09/6cbf09506c7cf760f8010673ba7c45cd.jpg';
const HELLO = (
    <div className="title_wrapper">
        <img src={IMG_SRC} alt="Лисенок"/>
        <h1 style={CONFIG}>{TEXT}</h1>
    </div>
);
