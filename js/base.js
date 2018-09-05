var holidays = [
  [1, 15], // Month 1
  [], // Month 2
  [], // Month 3
  [19], // Month 4
  [], // Month 5
  [24], // Month 6
  [5, 24], // Month 7
  [], // Month 8
  [], // Month 9
  [12], // Month 10
  [], // Month 11
  [25], // Month 12
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
      // Style holidays
      var date2 = {
        month: date.getMonth(),
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

/**
  Helper method to determine if a given date is a holiday.

  @param date: the date.

  @return true if is a holiday, false otherwise.
*/
function isHoliday( date ) {
  let isHoliday = false;
  isHoliday = $.inArray( date.day,  holidays[ date.month ] ) === 0
  if( isHoliday ){
    return isHoliday;
  }
  return false;
}
