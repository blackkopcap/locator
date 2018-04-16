'use strict';

var soap = require('soap');
var moment = require('moment');
const url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';

let makeRequest = (url, args) => {
    return new Promise(function(response, error) {
        soap.createClient(url, function(err, client) {
            client.GetCursOnDate(args, function(err, result) {
                if (!err)
                    response(result);
                else
                    error(err);
            });
        });
    });
}


module.exports = {
    async getCurrencyTable() {
        var args = {
            On_date: moment().format("YYYY-MM-DD")
        };

        var curr_table = {};
        var currencies = await makeRequest(url, args);

        currencies.GetCursOnDateResult.diffgram.ValuteData.ValuteCursOnDate.forEach((currency) => {
            curr_table[currency.VchCode] = {
                nominal: currency.Vnom,
                value: currency.Vcurs
            };
        })

        return curr_table;
    }
}
