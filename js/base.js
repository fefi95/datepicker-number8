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
