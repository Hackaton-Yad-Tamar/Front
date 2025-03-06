import pandas as pd
import numpy as np # type: ignore
import json
data = pd.read_excel('Front/vities.xlsx')
CityNamesHeb = data['CityNameHeb']
CityNamesEng = data['CityName']
CityLat = data['Latitude']
CityLon = data['Longitude']

def calc_city_distance(city1, city2):
    idx1 = CityNamesHeb[CityNamesHeb == city1].index[0]
    idx2 = CityNamesHeb[CityNamesHeb == city2].index[0]
    lat1 = CityLat[idx1]
    lon1 = CityLon[idx1]
    lat2 = CityLat[idx2]
    lon2 = CityLon[idx2]
    return np.sqrt((lat1 - lat2)**2 + (lon1 - lon2)**2)*111.319

def calc_total_distance(home_city, cities):
    total_distance = 0
    for city in cities:
        total_distance += calc_city_distance(home_city, city)
    return total_distance
print(calc_city_distance('תל אביב', 'ירושלים'))

home_city_dummy = 'תל אביב'
cities_dummy = ['ירושלים', 'חיפה', 'פתח תקווה', 'אשדוד', 'נתניה', 'באר שבע', 'חולון', 'חיפה', 'פתח תקווה', 'אשדוד']
dist_dummy = calc_total_distance(home_city_dummy, cities_dummy)
with open("Front/distance.json", "w") as f:
    json.dump({"number": dist_dummy}, f)