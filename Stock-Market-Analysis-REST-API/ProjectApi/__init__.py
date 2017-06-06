from pyramid.config import Configurator
from pyramid.response import Response


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.add_route('predictstock', '/predictstock/{ticker}/{start_date}/{end_date}/{start_date_predict}/{end_date_predict}')
    config.add_route('getsentiment', '/getsentiment/{source}')
    config.add_route('livedata', '/livedata/{ticker}')
    config.add_route('getstocknews', '/getstocknews/{ticker}')
    config.add_route('getstocksentiment', '/getstocksentiment/{ticker}')
    config.scan('.views')
    return config.make_wsgi_app()
