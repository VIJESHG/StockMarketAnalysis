# Prediction-des-Stocks

Prediction Des Stocks is a stock analyzer REST API, which can be used by developers easily to just build applications in any framework about stocks.

Built in Mozilla Pyramid framework.
run pserve development.ini

Expected you have Mozilla Pyramid Framework

for more info email at : akashsarda3@gmail.com

Port no : 6543

Our rest api :

# trend prediction:
  - give the url as : http://localhost:6543/predictstock/{ticker}/{start_training_date}/{end_training_date}/{start_predict_date}/{end_predict_date}

# get overall economy sentiment

http://localhost:6543/getsentiment/{news_source}

# get live data

http://localhost:6543/livedata/{ticker}

# get live news about a stock

http://localhost:6543/getstocksentiment/{ticker}


Fetches news from yahoo website.
Fetches info from yahoo website.
Uses vader algorithm for sentiment analysis.
