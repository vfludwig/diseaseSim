import simpy
import random
import statistics

#all data are the high ends of information from the CDC
###change to dictionary
covidInfectionRate = 2.5
covidIncubationTime = 14
covidHospitalizationRate = .19
covidFatalityRate = .034

fluInfectionRate = 1.3
fluIncubationTime = 4
fluHospitalizationRate = .02
fluFatalityRate = .01

totalPopulation = ###input from website
diseaseType = ###input from website

daycount = 0
infected = 0
recovered = 0
###possibly more details

class Person:
    def __init__(self):
        self.infected = 0

def beginSim():
    for x in range(totalPopulation):
        ###do stuff