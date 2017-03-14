from v import SentimentIntensityAnalyzer as sia
from news2 import getNews as news 
b  = sia()
source = raw_input("Enter the News source:")
news_list = news(source)
for each in news_list:
	print b.polarity_scores(each)
