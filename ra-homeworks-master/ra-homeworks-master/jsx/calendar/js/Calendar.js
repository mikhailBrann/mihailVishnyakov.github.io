const Calendar = (now) => {
    now = new Date();
    let fullYear = now.getFullYear();
    let day = now.toLocaleString('ru', { weekday: 'long' });
    let month = now.toLocaleString('ru', { month: 'long' });

    console.log(month);
}
