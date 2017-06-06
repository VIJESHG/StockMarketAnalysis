from bs4 import BeautifulSoup
import requests
import re
from google import google
import sys
import json

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])
def getData(name) :
    num_page = 1
    search_results = google.search(name + " ticker symbol", num_page)
    symbol = search_results[0].name.split(' ')[0]
    return symbol

name = read_in()
print getData(name)
sys.stdout.flush()

# name = raw_input("COMPANY NAME ?? :- ")
