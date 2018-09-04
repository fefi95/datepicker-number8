$( function() {
  $( ".datepicker" ).datepicker({
    beforeShow: function()  {
      let minD = $( "#start_date-input" ).datepicker( 'getDate' );
      let days = $( "#range-input" ).val();
      let maxD = addDays(minD, days);
      return { minDate: minD, maxDate: maxD }
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
