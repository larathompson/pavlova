from datetime import date

def calculate_age(dtob):
    today = date.today()
    return today.year - dtob.year - ((today.month, today.day) < (dtob.month, dtob.day))
print()
print(calculate_age(date(2006,10,12)))
print(calculate_age(date(1993,11,30)))
print()



