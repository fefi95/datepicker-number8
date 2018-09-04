$( function() {
  $( ".datepicker" ).datepicker({
    showOtherMonths: false,
    dayNamesMin: [ "S","M","T","W","T","F","S" ], // Column headings for days starting at Sunday
    beforeShow: function()  {
      let minD = $( "#start_date-input" ).datepicker( 'getDate' );
      let days = $( "#number_days-input" ).val() - 1;
      let maxD = addDays(minD, days);
      let months = maxD.getMonth() - minD.getMonth() + 1;
      return { minDate: minD, maxDate: maxD, numberOfMonths: months }
    }
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
