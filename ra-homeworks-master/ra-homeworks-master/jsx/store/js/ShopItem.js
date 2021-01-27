const ShopItem = (itemObj) => {
    if(!itemObj) {
        return null;
    }
    let itemRenderConfig = (
        <div className="main-content">
            <h2>{itemObj.item.brand}</h2>
            <h1>{itemObj.item.title}</h1>
            <h3>{itemObj.item.description}</h3>
            <div className="description">{itemObj.item.descriptionFull}</div>
            <div className="highlight-window  mobile">
                <div className="highlight-overlay"></div>
            </div>
            <div className="divider"></div>
            <div className="purchase-info">
                <div className="price">{itemObj.item.currency}{itemObj.item.price}</div>
                <button>Добавить в корзину</button>
            </div>
        </div>
    );
    return itemRenderConfig;
}
