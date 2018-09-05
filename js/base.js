var holidays = [
  { month: 1 , day: 1 },
  { month: 1 , day: 15 },
  { month: 4, day: 19 },
  { month: 5, day: 24 },
  { month: 6, day: 24 },
  { month: 7, day: 5 },
  { month: 10, day: 12 },
  { month: 12, day: 25 },
]

$( function() {

  // Add afterShow function to the jQuery's datepicker
  $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
  $.datepicker._updateDatepicker = function(inst) {
      $.datepicker._updateDatepicker_original(inst);
      var afterShow = this._get(inst, 'afterShow');
      if (afterShow){
        afterShow.apply((inst.input ? inst.input[0] : null));  // trigger custom callback
      }
  }

  $( ".datepicker" ).datepicker({
    showOtherMonths: false,
    dayNamesMin: [ "S","M","T","W","T","F","S" ],
    beforeShow: function(input, datepicker)  {
      let minD = $( "#start_date-input" ).datepicker( 'getDate' );
      // If there is no date picked, default to today
      if ( minD == null ){
        minD = new Date();
      }
      // If number of days is empty, default to 30
      let days = $( "#number_days-input" ).val();
      if ( days == "" ){
        days = 30;
      }
      else {
        days = days - 1;
      }
      let maxD = addDays(minD, days);
      let months = maxD.getMonth() - minD.getMonth() + 1;
      return { minDate: minD, maxDate: maxD, numberOfMonths: months }
    },
    beforeShowDay: function (date) {
        var date2 = {
          month: date.getMonth() + 1,
          day: date.getDate()
        }
        if ( isHoliday( date2 ) ) {
          return [true, "ui-datepicker-unselectable ui-datepicker-holiday"];
        }
        else {
          return [true, ""];
        }
    },
    afterShow: function(inst)  {
      // Delete extra rows to the calendar
      let daysInWeek = 7
      $(".ui-datepicker tr").each( function () {
         let disableChildren = $( this ).children(
            ".ui-datepicker-unselectable.ui-state-disabled"
          );
         if ( disableChildren.length === daysInWeek ) {
           $( this ).hide();
         }
      })
    },
  });
} );

/**
  Helper function to add days to a given date
  @param date: the date.
  @param days: number of days to be added to date.

  @return a new date.
*/
function addDays(date, days) {
  return new Date(date.getTime() + days*24*60*60*1000);
}

function isHoliday( date ) {
  let isHoliday = false;
  console.log(date);
  for (var i in holidays) {
    isHoliday = compareDates(holidays[i], date );
    console.log(holidays[i]);
    if( isHoliday ){
      return isHoliday;
    }
  }
  return false;
}
function compareDates( date1, date2 ) {
  return date1.month === date2.month && date1.day === date2.day;
}
