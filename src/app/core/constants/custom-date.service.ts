import { Injectable } from "@angular/core";
import * as moment from "moment";



@Injectable()
export class CustomDateService {


    toDay() {
        return moment(new Date()).format('YYYY-MM-DD');
    }


    thisWeekStartEndDates() {
        var toDate = moment(new Date()).weekday(1).format('YYYY-MM-DD');
        var fromDate = moment(new Date()).weekday(7).format('YYYY-MM-DD');
        // console.log('current week start',toDate);
        // console.log('current week  end',fromDate);
        return { toDate, fromDate }
    }

    lastWeekStartEndDates() {
        var toDate = moment(new Date()).weekday(-6).format('YYYY-MM-DD');
        var fromDate = moment(new Date()).weekday(0).format('YYYY-MM-DD');

        // console.log('prev week start',toDate );
        //     console.log('prev week end',fromDate);
        return { toDate, fromDate }
    }

    currentMonthStartEndDates() {
        var toDate = moment().startOf('month').format('YYYY-MM-DD');
        var fromDate = moment().endOf('month').format('YYYY-MM-DD')

        // console.log('currnt month start date ',toDate);
        // console.log('currnt month end date',fromDate );
        return { toDate, fromDate }
    }

    lastMonthStartEndDates() {
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        var toDate = moment(d).startOf('month').format('YYYY-MM-DD');
        var fromDate = moment(d).endOf('month').format('YYYY-MM-DD');

        // console.log('last month start date ',toDate);
        // console.log('last month end date',fromDate );
        return { toDate, fromDate }
    }

    lastThreeMonthsStartEndDates() {
        var d = new Date();
        d.setMonth(d.getMonth() - 3);
        var d1 = new Date();
        d1.setMonth(d1.getMonth() - 1);
        var toDate = moment(d).startOf('month').format('YYYY-MM-DD');
        var fromDate = moment(d1).endOf('month').format('YYYY-MM-DD');
        // console.log('last 3  month start date ',toDate );
        // console.log('last 3 month end date',fromDate );
        return { toDate, fromDate }

    }
    lastSixMonthsStartEndDates() {
        var d = new Date();
        d.setMonth(d.getMonth() - 6);

        var d1 = new Date();
        d1.setMonth(d1.getMonth() - 1);
        var toDate = moment(d).startOf('month').format('YYYY-MM-DD');
        var fromDate = moment(d1).endOf('month').format('YYYY-MM-DD');

        // console.log('last 6 month start date ',toDate);
        // console.log('last 6 month end date',fromDate );
        return { toDate, fromDate }
    }
    currentYearStartEndDates() {
        var toDate = moment().startOf('year').format('YYYY-MM-DD');
        var fromDate = moment().endOf('year').format('YYYY-MM-DD');

        // console.log('currnt year start date ',toDate );
        // console.log('currnt year end date', fromDate);
        return { toDate, fromDate }
    }
    lastYearStartEndDates() {
        var d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        var toDate = moment(d).startOf('year').format('YYYY-MM-DD')
        var fromDate = moment(d).endOf('year').format('YYYY-MM-DD')

        // console.log('last year start date ',toDate );
        // console.log('last year end date', fromDate);

        return { toDate, fromDate }
    }




}



