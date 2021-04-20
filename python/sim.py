from scipy.stats import norm
import tkinter as tk
import random
import time

frame = tk.Tk()
frame.title("DiseaseSim")
frame.geometry('750x350')

def printInput():
    global inPop, inImm, inInfect, inContag, inLock, inMask
    inPop = inputtxtPop.get(1.0, "end-1c")
    inImm = inputtxtImm.get(1.0, "end-1c")
    inInfect = inputtxtInfect.get(1.0, "end-1c")
    inContag = inputtxtContag.get(1.0, "end-1c")
    inLock = inputtxtLock.get(1.0, "end-1c")
    inMask = inputtxtMask.get(1.0, "end-1c")
    lbl.config(text = "Input Saved. You can close this window now.")

popLabel = tk.Label(text="This is a Graphical Disease Simulator. Based on the data inputted, a graph showing the infection over 100 days will be created.")
popLabel.pack()

popLabel = tk.Label(text="Population Size:")
popLabel.pack()

inputtxtPop = tk.Text(frame,
                    height = 1,
                    width = 10)

inputtxtPop.pack()

immLabel = tk.Label(text="Immunity Percentage:")
immLabel.pack()

inputtxtImm = tk.Text(frame,
                    height = 1,
                    width = 10)

inputtxtImm.pack()

infectLabel = tk.Label(text="Starting Number of Infected:")
infectLabel.pack()

inputtxtInfect = tk.Text(frame,
                    height = 1,
                    width = 10)

inputtxtInfect.pack()

contagLabel = tk.Label(text="Days Contagious:")
contagLabel.pack()

inputtxtContag = tk.Text(frame,
                    height = 1,
                    width = 10)

inputtxtContag.pack()

lockLabel = tk.Label(text="Start of Lockdown (0-100):")
lockLabel.pack()

inputtxtLock = tk.Text(frame,
                    height = 1,
                    width = 10)

inputtxtLock.pack()

maskLabel = tk.Label(text="Start of Mask Mandate (0-100):")
maskLabel.pack()

inputtxtMask = tk.Text(frame,
                    height = 1,
                    width = 10)

inputtxtMask.pack()

printButton = tk.Button(frame,
                        text = "Enter Inputs",
                        command = printInput)

printButton.pack()

lbl = tk.Label(frame, text = "")
lbl.pack()
frame.mainloop()

numPeople = int(float(inPop))
startingImmunity = int(float(inImm))
startingInfecters = int(float(inInfect))
daysContagious = int(float(inContag))
lockdownDay = int(float(inLock))
maskDay = int(float(inMask))

peopleDictionary = []
#simulation of a single person
class Person():
    def __init__(self, startingImmunity):
        if random.randint(0,100)<startingImmunity:
            self.immunity = True
        else:
            self.immunity = False
        self.contagiousness = 0
        self.mask = False
        self.contagiousDays = 0
        #use gaussian distribution for number of friends; average is 5 friends
        self.friends = int((norm.rvs(size=1,loc=0.5,scale=0.15)[0]*10).round(0))
    def wearMask(self):
        self.contagiousness /= 2
        
def initiateSim():
    for x in range(0,numPeople):
        peopleDictionary.append(Person(startingImmunity))
    for x in range(0,startingInfecters):
        peopleDictionary[random.randint(0,len(peopleDictionary)-1)].contagiousness = int((norm.rvs(size=1,loc=0.5,scale=0.15)[0]*10).round(0)*10)
    return daysContagious, lockdownDay, maskDay
def runDay(daysContagious, lockdown):
    #this section simulates the spread, so it only operates on contagious people, thus:
    for person in [person for person in peopleDictionary if person.contagiousness>0 and person.friends>0]:
        peopleCouldMeetToday = int(person.friends/2)
        if peopleCouldMeetToday > 0:
            peopleMetToday = random.randint(0,peopleCouldMeetToday)
        else:
            peopleMetToday = 0
            
        if lockdown == True:
            peopleMetToday= 0
            
        for x in range(0,peopleMetToday):
            friendInQuestion = peopleDictionary[random.randint(0,len(peopleDictionary)-1)]
            if random.randint(0,100)<person.contagiousness and friendInQuestion.contagiousness == 0 and friendInQuestion.immunity==False:
                friendInQuestion.contagiousness = int((norm.rvs(size=1,loc=0.5,scale=0.15)[0]*10).round(0)*10)
                print("Person ", peopleDictionary.index(person), " infected Person ", peopleDictionary.index(friendInQuestion))
            
    for person in [person for person in peopleDictionary if person.contagiousness>0]:
        person.contagiousDays += 1
        if person.contagiousDays > daysContagious:
            person.immunity = True
            person.contagiousness = 0
            print("Person ", peopleDictionary.index(person), " gained immunity")
            
lockdown = False
daysContagious, lockdownDay, maskDay = initiateSim()
saveFile = open("pandemicsave3.txt", "a")
for x in range(0,100):
    if x==lockdownDay:
        lockdown = True
        #add lockdown and mask end days
    if x == maskDay:
        for person in peopleDictionary:
            person.wearMask()
            
    print("DAY ", x)
    runDay(daysContagious,lockdown)
    write = str(len([person for person in peopleDictionary if person.contagiousness>0])) + "\n"
    saveFile.write(write)
    print(len([person for person in peopleDictionary if person.contagiousness>0]), " people are contagious on this day.")
saveFile.close()
