A README.md file with explanations of what your bot does, what commands it responds to, the approach taken, unsolved problems, etc.
TravelBuddy is a bot that gives you recommendations for activities to do at various destinations.
 
When you first open TravelBuddy, he asks you how you are today. It’d be rude not to respond!
 
He then asks if you’d like to register for his newsletter. If you are not already signed up, he asks you for your email address. If you’ve already signed up, he asks you to enter a destination.
 
It’s fine if you don’t want to register for the newsletter – we aren’t going to force you to join.
 
TravelBuddy then asks you to enter a destination you want a recommendation for. He currently knows about: Paris, Lake Tahoe, Chile, Iceland, Florida ……. Don’t worry about case sensitivity.
 
If TravelBuddy doesn’t know about a specific destination you’ve entered, it recommends a classmate for you to ask.
 
The approach for TravelBuddy is to store it’s travel recommendations in an object “Locations.” If I had more time and resources, it would be nice to host this information in MongoDB with links to various travel blogs, flight booking engines, hotels or car rentals. If I had a hosted data source, I could also ask the user to enter recommendations and persist them to the DB so that TravelBuddy will become smarter! I could do the same with the newsletter registration.
 
I also want to add a query for if you want to learn about a random destination