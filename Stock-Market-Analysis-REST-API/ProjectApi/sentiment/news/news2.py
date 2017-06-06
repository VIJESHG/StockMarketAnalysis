import requests

def getNews(source):
     n = requests.get('https://newsapi.org/v1/articles?source=' + source + '&apiKey=4ab6ea3b79144fb6a3d36f8aa85f1eac')
     news = []
     for item in n.json()['articles']:
             news.append(item['description'])
     return news
