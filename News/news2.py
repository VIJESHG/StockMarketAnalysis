import requests
def getNews(source):
     n = requests.get('http://newsapi.org/v1/articles?source=' + source + '&apiKey=c8beb9bc3f544e52b2a449364c7156b4')
     news = []
     for item in n.json()['articles']:
             news.append(item['description'])
     return news
