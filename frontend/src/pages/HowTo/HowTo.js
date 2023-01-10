import React from 'react';
import "./HowTo.css"; 

const HowTo = () => {
    return ( 
        <div className="HowTo">
            <p>Philosophy: Health trends and advice from experts are all over the place, but you will never know which bits of health and wellness info will help you feel your best until you experiment and document your journey.</p>

            <h3>Using the Habit Tracker:</h3>
            
            <p>After creating your account, follow the menu to “My Goals”.  Here you will select from a list of habits, amassed from other people’s suggestions on how to improve your wellbeing.</p>
            
            <p>You may add a custom habit to your list if it is not included in the list of suggestions.</p>
            
            <p>Next, head “Daily Check-In” after you have completed your habits for the day. Follow this step every day. You can set up a daily reminder notification if you wish.</p>
            
            <p>If you want to approach this more scientifically, start with tracking one habit at a time, and give it at least a month before adjusting anything. You cannot infer whether a habit really contributes to your quality of life if you begin by implementing more than one, because any positive or negative change you feel could be.</p>
            
            <p>Disclaimer: I am not a psychologist or a statistician. I hope to add some additional data analysis parameters as well as create a correlation score between habits and check-in scores to aid in user experience. 
                However, my main goal was to create a functional app for my software developer portfolio, and I can’t dive into a data analysis and statistics rabbit hole right now, as much as I would like to. I will continue adding to this app, and I hope that others will find it a helpful tool on their way to holistic health.</p>
            
            <p>I’ve purposefully avoided the word “happy” in the Daily Check-in questions, because I believe a meaningful life contains ups and downs and your goal should not be chasing happiness. Better goals are: satisfaction, purpose, a sense of belonging, a desire to create and contribute things to the world.</p>
            
            <p>Many of my ideas are stolen from the work of 
                <a href="https://theholisticpsychologist.com/"> Dr. Nicole LePerra </a>
                and <a href="https://www.pushkin.fm/podcasts/the-happiness-lab-with-dr-laurie-santos"> Dr. Laurie Santos </a>
            </p>
        </div>
     );
}
 
export default HowTo;