const Menu = (list) => {
    if(!list) {
        return null;
    }

    if( list.opened == true ) {
        let listArray = list.items.map((listItem) => <li><a href={listItem.href}>{listItem.title}</a></li>);
        let listRender = (
            <div className="menu menu-open">
                <div className="menu-toggle"><span></span></div>
                <nav>
                    <ul>
                        { listArray }
                    </ul>
                </nav>
            </div>
        );
        return listRender
    } else {
        return (
            <div className="menu">
               <div className="menu-toggle"><span></span></div>
            </div>
        );
    }

}
