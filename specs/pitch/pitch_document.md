# Red Pandas (Team 29) Pitch Document

**Team Members:** Avery Pham, Baha Keskin, Edbert Dai, Enzo de Oliveira, Fangcheng Dou, Haonan Jiang, Jeffrey Morales, Jiayi Zhao, Justin Butera, Tri Dao, Zhuoran Tang

1. **Problem** — The raw idea, a use case, or something we’ve seen that motivates us to work on this

The raw idea we were given is that we have to make a recipe manager. We see in society that some people are not living the healthiest lifestyles and those that lead an active lifestyle need an app that caters to their nutrition needs. Our motivation to create our recipe manager is the idea that we should all live healthy lifestyles.

Active people who emphasize healthy living lifestyles on a daily basis must take into account their diet choices to match their fitness goals. Taking the time to make nutritious, calorie-packed meals takes a lot of preparation, and our goal is to provide these individuals a medium to plan their week with meals that they are proud to be eating. Our application will solve two key issues. Firstly, our meals will fit a demographic of individuals that prefer healthy and nutritious options. Secondly, recognizing active lifestyles are time-constrained, our application will provide these individuals the ability to plan out their entire week of meals. People with active lifestyles also at times attempt to follow strict diet choices, and our meal planner will provide these individuals the ability to plan all their meals. The combination of these two key ideas will let people organize their diets ahead of time, be happy with their meals, and focus on the lifestyle that provides them satisfaction.

We looked at various other apps to see how they solved our problem:
- Fit Men Cook
    - [fitmencook.com](https://fitmencook.com)
- Healthy Fitness Meals
    - [healthyfitnessmeals.com](https://healthyfitnessmeals.com)
- MealPrepPro
    - [mealpreppro.com](https://mealpreppro.com)


2. **Appetite** — How much time we want to spend and how that constrains the solution

We want to accomplish a couple of key ideas. Firstly, we want to provide our users with quality recipes that match their lifestyles and demographics. Secondly, we will provide them the opportunity to plan their week ahead of time. We expect that the first couple of weeks will prioritize compiling a solution to our first desire, followed by spending a final couple of weeks developing the meal planner feature. Time constraints prevent us from making the web application as individualized as we had hoped for.

We ideally want to spend 4 weeks to finalize our application and spend the last week refining and testing it.  With the time given, we had to simplify our application and remove some features (like a user system) that we would have liked to put in our app.

3. **Solution** — The core elements we came up with, presented in a form that’s easy for people to immediately understand
- Homepage showing recipes as cards in a grid
    - Pros: Easy to see what recipes you want to try
    - Risks: Could add clutter and result in long page load times
- Quick at-a-glance ingredients and nutrition facts for each recipe
    - Calories/nutrients
    - Pros: User-friendly and saves time
    - Risks: May give the wrong information
- Recipe steps with pictures and videos
    - Pros: Concise and quick
    - Risks: May either be too brief or cluttered
- Recipes divided into categories and search system
    - Pros: Easier to find specific recipes and sort
    - Cons: May confuse the user and be difficult to implement
- Ability to contribute recipes and a simple way to share recipe links with others
    - Pros: User contribution and potentially increases user base
    - Risks: Spam contributions and sharing
- Weekly meal-planner where users can add recipes they want to eat for breakfast, lunch, and dinner
    - Ability to share meal planner or print it out
    - Pros: Promotes planned healthy eating
    - Risks: May be hard to use
- Hands-free recipe mode that declutters interface and presents steps with larger buttons to assist while cooking with built-in recipe timer
    - Pros: Helps the user while cooking
    - Risks: Information may be too brief and the timer may be inaccurate

4. **Rabbit holes** — Details about the solution worth calling out to avoid problems
- Trying to finalize how pages look too early on in development (“pretty pixels”)
    - Given how likely the interface and backend will often change, spending too much time on pretty pixels will end up detracting from implementing our core goals.
- Spending too much time on search may detract from the recipe discovery features (homepage, category sort)
    - Based on our specification, there should be a way to easily find recipes that does not involve search.
- Being too broad on how recipe sharing works
    - Having social not related to directly sharing a recipe link (such as Facebook integration) is not a good way to spend development time as it does not relate to our core solution.
- Adding in timer features that do not explicitly relate to cooking the recipe
    - A scenario could occur where we decide the timer is too simplistic which causes us to overthink timer functionality such as adding timers for prep.
- Focusing too much on ways to export the meal planner may cause the meal planner’s overall functionality to not be as refined
    - For instance, generating a custom link that contains data about the meal planner entries takes time away from developing the calendar functionality.
- Adding too much to the hands-free mode at the expense of the core recipe page
    - The main function of our app is a recipe manager so while a hands-free mode while cooking is nice, it detracts from the solution we are trying to achieve.
- Trying to find videos to add to each recipe
    - Although it would be nice to give users a video they can follow along for each recipe, it could potentially require too much time to implement

5. **No-gos** — Anything specifically excluded from the concept: functionality or use cases we intentionally aren’t covering to fit the appetite or make the problem tractable
- User accounts are nice to have but given the time constraints set out in our appetite and that the feature is not within our problem scope we have decided that it is not advisable to include this feature.

## Artifacts

[Personas and User Stories](../users/Personas_User&#32;Stories.pdf)

[Fat Marker Sketch](../interface/rough/Fat&#32;Marker&#32;Sketch.pdf)

[User Flow/System Event Diagram](user_flow_system_diagrams.pdf)

[Wireframes](../interface/wireframes/wireframes_v2.pdf)

[Roadmap](../roadmap.md)
