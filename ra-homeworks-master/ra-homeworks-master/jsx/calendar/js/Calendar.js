/*
Описание компонента
Компонент должен иметь один атрибут date, в котором он ожидает текущую дату, объект Date.

Компонент должен создавать DOM элемент следующей структуры:

<div className="ui-datepicker">
  <div className="ui-datepicker-material-header">
    <div className="ui-datepicker-material-day">Среда</div>
    <div className="ui-datepicker-material-date">
      <div className="ui-datepicker-material-day-num">8</div>
      <div className="ui-datepicker-material-month">Марта</div>
      <div className="ui-datepicker-material-year">2017</div>
    </div>
  </div>
  <div className="ui-datepicker-header">
    <div className="ui-datepicker-title">
      <span className="ui-datepicker-month">Март</span>&nbsp;<span className="ui-datepicker-year">2017</span>
    </div>
  </div>
  <table className="ui-datepicker-calendar">
    <colgroup>
      <col>
      <col>
      <col>
      <col>
      <col>
      <col className="ui-datepicker-week-end">
      <col className="ui-datepicker-week-end">
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
        <td className="ui-datepicker-other-month">27</td>
        <td className="ui-datepicker-other-month">28</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
      </tr>
      <tr>
        <td>6</td>
        <td>7</td>
        <td className="ui-datepicker-today">8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
      </tr>
      <!-- остальные недели -->
    </tbody>
  </table>
</div>
Дата переданная в атрибуте date должна быть выделена классом ui-datepicker-today.

Если месяц начинается не с понедельника, то необходимо показать даты предыдущего месяца в этой неделе и пометить их классом ui-datepicker-other-month. Аналогично, если месяц заканчивается на в воскресенье, то неделю нужно «добить» датами следующего месяца и так же их пометить классом ui-datepicker-other-month.

День недели на русском языке необходимо поместить в тег div.ui-datepicker-material-day, дату в div.ui-datepicker-material-day-num, месяц на русском языке в родительном падеже в тег div.ui-datepicker-material-month, год в тег div.ui-datepicker-material-year.

Так же текущий месяц на русском языке в именительном падеже необходимо поместить в тег span.ui-datepicker-month, а год в тег span.ui-datepicker-year.
*/


const Calendar = (now) => {
    now = new Date();
    let fullYear = now.getFullYear();
    let day = now.toLocaleString('ru', { weekday: 'long' });
    let dayNumber = now.toLocaleString('ru', { day: 'numeric' });
    let dayShort = now.toLocaleString('ru', { weekday: 'short' });
    let month = now.toLocaleString('ru', { month: 'long' });
    let montCastom;

    function dayIsMont(neighborMonth) {
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

    console.log(dayIsMont());


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

    let calendarTop = (
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
    );
    let result = (
        <div className="ui-datepicker">
            {calendarTop}
        </div>
    );

    return result;
}
