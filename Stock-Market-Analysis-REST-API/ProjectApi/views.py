from pyramid.response import Response
from pyramid.view import view_config
from sentiment import mainTest
from PredictStock import predict
from scrapper import scrape
from news_scrapper import scrape as news_scrape
trend = {}

@view_config(route_name='predictstock', renderer = 'json')
def predictstock(request):
    ticker = request.matchdict['ticker']
    std = request.matchdict['start_date']
    end = request.matchdict['end_date']
    std_p = request.matchdict['start_date_predict']
    end_p = request.matchdict['end_date_predict']
   
    delta = 0
    trend['ticker'] = ticker
    trend['start_date'] = std
    trend['end_date'] = end
    clf = predict.getTrainedClassifier(ticker, std, end)
    delta = predict.getTrendPredictions(clf, ticker, std_p, end_p)
    trend['delta'] = str(delta)	
    return trend

@view_config(route_name='getsentiment', renderer = 'json')
def getsentiment(request):
    source = request.matchdict['source']
    sentiment, news_list = mainTest.getNewsSentiment(source)
    trend['sentiment'] = sentiment
    trend['newslist'] = news_list
    return trend

@view_config(route_name='livedata', renderer = 'json')
def livedata(request):
	ticker = request.matchdict['ticker']
	data = scrape.givelivedata(ticker)
	return data

@view_config(route_name='getstocknews', renderer = 'json')
def getstocknews(request):
	ticker = request.matchdict['ticker']
	results = news_scrape.SentimentNews(ticker)
	return results	

@view_config(route_name='getstocksentiment', renderer = 'json')
def getstocksentiment(request):	
	ticker = request.matchdict['ticker']
	return trend
