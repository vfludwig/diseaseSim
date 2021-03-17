import simpy
import random
import statistics

#all data are the high ends of information from the CDC
covidInfectionRate = 2.5
covidIncubationTime = 14
covidHospitalizationRate = .19
covidFatalityRate = .034

fluInfectionRate = 1.3
fluIncubationTime = 4
fluHospitalizationRate = .02
fluFatalityRate = .01