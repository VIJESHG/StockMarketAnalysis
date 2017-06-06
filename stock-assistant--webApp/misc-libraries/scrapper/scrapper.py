from bs4 import BeautifulSoup
import requests
import re
from google import google
import os, sys


sys.path.append(os.path.dirname(__file__))

num_page = 1
def scrape(name) :
	search_results = google.search(name + " stock ticker symbol", num_page)
	symbol = search_results[0].name.split(' ')[0]

	url = 'http://finance.yahoo.com/quote/GOOG/key-statistics?p={}'.format(symbol)
	r = requests.get(url)
	soup = BeautifulSoup(r.text, "html.parser")

	data = soup.find_all("tbody")




	return data     # tu kar modify

name = raw_input("COMPANY NAME ?? :- ")     # checked OK! tu kar call
info = scrape(name)
print info
