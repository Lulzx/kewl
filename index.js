
var TelegramBot = require('node-telegram-bot-api'),
    token = '384742340:AAETgAQr48DrdczySb6gOCI0dmwHQeuKaM8',
    bot = new TelegramBot(token, {polling: true});

var SaidWhat = (function (quotes) {
  function getQuote (typedName, callback) {
    var currentQuote;
    for (var quoteIndex = 0, len = quotes.quotes.length; quoteIndex < len; quoteIndex++) {
      if (quotes.quotes[quoteIndex]['name'] === typedName) {
        var randomQuoteIndex = Math.floor((Math.random() * quotes.quotes[quoteIndex]['quotes'].length - 1) + 1);
        currentQuote = quotes.quotes[quoteIndex]['quotes'][randomQuoteIndex];
      }
    }
    callback(currentQuote);
  };
  return {
    get : getQuote
  }
})(JSON.parse(JSON.stringify(require('./data/quotes.json'))));

bot.onText(/(.+)/, function (msg, match) {
  var fromId = msg.from.id,
      resp = null; 
  SaidWhat.get(match[1], function (quote) {
    resp = quote;
    bot.sendMessage(-1001123900632, resp);
  });
});
