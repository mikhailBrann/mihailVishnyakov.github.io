const Calendar = (now) => {
    now = new Date();
    let fullYear = now.getFullYear();
    let day = now.toLocaleString('ru', { weekday: 'long' });
    let dayNumber = now.toLocaleString('ru', { day: 'numeric' });
    let dayShort = now.toLocaleString('ru', { weekday: 'short' });
    let month = now.toLocaleString('ru', { month: 'long' });
    let montCastom;

    //функция определения количества дней в месяце
    function daysIsMonth(neighborMonth) {
        let fullYear = now.getFullYear();
        let month = now.getMonth();

        if(neighborMonth == 'prev') {
            let newMonth = now.getMonth() - 1;

            if(newMonth < 0){
                newMonth += 12;
                fullYear -= 1;
            }
            return new Date(fullYear, newMonth + 1, 0).getDate();
        } else if(neighborMonth == 'next') {
            return new Date(fullYear, month + 2, 0).getDate();
        } else {
            return new Date(fullYear, month + 1, 0).getDate();
        }

    }

    //функция - сборщик календаря
    function calendarNumbersLogic(weekDayValue) {
        let firstDayOnMonth = new Date();
        firstDayOnMonth.setDate(0);
        firstDayOnMonth = firstDayOnMonth.getDay();
        let prevMonth = daysIsMonth('prev');
        let nextMonth = daysIsMonth('next');

        let monthsContPrev = [];
        let monthsContThis = [];
        let monthsContNext = [];

        if(firstDayOnMonth > 0) {
            for(let item = firstDayOnMonth; item > 0; item--) {
              monthsContPrev.push({className: 'ui-datepicker-other-month', dayValue: prevMonth});
              prevMonth--;
            }
        }

        for(let item = 0; item < daysIsMonth(); item++) {
            if(item == (dayNumber - 1)){
                monthsContThis.push({className: 'ui-datepicker-today', dayValue: item + 1});
            } else {
                monthsContThis.push({className: '', dayValue: item + 1});
            }
        }

        for(let item = 0; item < (35 - (monthsContThis.length - monthsContPrev.length)); item++) {
            monthsContNext.push({className: 'ui-datepicker-other-month', dayValue: item + 1});
        }

        let calendarListArray = monthsContPrev.concat(monthsContThis).concat(monthsContNext);

        return calendarListArray;
    }

    let calendarList = calendarNumbersLogic();

    //функция для понедельного рендера
    function calendarListRender(item,index,endWeekDayNumber) {
      if(index <= endWeekDayNumber) {
        return <td className={item.className}>{item.dayValue}</td>;
      }
    }


    switch(month) {
        case 'январь':
            montCastom = 'января';
        break;
        case 'февраль':
            montCastom = 'февраля';
        break;
        case 'март':
            montCastom = 'марта';
        break;
        case 'апрель':
            montCastom = 'апреля';
        break;
        case 'май':
            montCastom = 'мая';
        break;
        case 'июнь':
            montCastom = 'июня';
        break;
        case 'июль':
            montCastom = 'июля';
        break;
        case 'август':
            montCastom = 'августа';
        break;
        case 'сентябрь':
            montCastom = 'сентября';
        break;
        case 'октябрь':
            montCastom = 'октября';
        break;
        case 'ноябрь':
            montCastom = 'ноября';
        break;
        case 'декабрь':
            montCastom = 'декабря';
        break;
        default:
            mountCastom = '13 месяц?'
    }


    let result = (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{day}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{dayNumber}</div>
          <div className="ui-datepicker-material-month">{montCastom}</div>
          <div className="ui-datepicker-material-year">{fullYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{fullYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                {calendarList.map((item, index) => calendarListRender(item,index, 6))}
            </tr>
            <tr>
                {calendarList.map((item, index) => calendarListRender(item,index, 13))}
            </tr>
            <tr>
                {calendarList.map((item, index) => calendarListRender(item,index, 20))}
            </tr>
            <tr>
                {calendarList.map((item, index) => calendarListRender(item,index, 27))}
            </tr>
            <tr>
                {calendarList.map((item, index) => calendarListRender(item,index, 34))}
            </tr>
        </tbody>
      </table>
    </div>
    );

    return result;
}
