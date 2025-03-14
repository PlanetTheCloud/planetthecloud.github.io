For Schedules there's commonality with the holiday schedule and exam schedule

So in the case there's a class repeat where they might not conform to one common class schedule, the Schedula couldn't accomodate it. Instead we may need to do the following:
    - Have an individualized class system where classes are added individually to the system, then
    - Group the classes by clasroom and they'll get a classroom code.
    - For those that needs to customize the class as they're in higher semester, they can:
        - Open Schedula Editor, create a new custom "schedule", maybe we should call it "MySchedules" and group by Semester
        - Then search for classes and add them to the "schedule"
        - Once the schedule is built, they can save it and it should be a JSON data which then is saved to the browser's localstorage
        - Server should also save a pastebin-like system where the payload is Audited and then can be served, with a six character "key" so that data can be transferred over easily
    - So Schedula can be customized for any schedules out there and we may need to add hooks for the types because schedule types can vary IRL

# Expanding Schedula
To be used on other types of schedcules.
