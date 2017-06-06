# Stock Market Analysis (Part-I)

This Stock Market analysis project consist of REST API which will helpful for the developers/programmer to speed-up scrapping and fetching data
about stock market.
Built in Mozilla Pyramid framework.
run pserve development.ini

Need to have Mozilla Pyramid Framework.

Port no : 6543

Rest api :
# Trend prediction:
  - give the url as : http://localhost:6543/predictstock/{ticker}/{start_training_date}/{end_training_date}/{start_predict_date}/{end_predict_date}

# Get overall economy sentiment

http://localhost:6543/getsentiment/{news_source}

# Get live data

http://localhost:6543/livedata/{ticker}

# Get live news about a stock

http://localhost:6543/getstocksentiment/{ticker}

# Stock Market Assistant (Part-II)

Our Stock Market Assistant, assists users to understand the analysis of stock market over specified span of time.
User need to login to our portal then he can specify name of stock and span to see it's graphical anlysis.
It also maintains the portfolio of user,so it helps user to buy and sell stocks.
