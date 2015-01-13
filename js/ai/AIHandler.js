game.AIHandler = Object.extend({
    init: function() {
        this.goals = new Array();
    },
    
    hasGoals: function() {
        return this.goals.length;
    },
    
    addGoal: function(goal) {
        this.goals.push(goal);
    },
    
    getGoals: function() {
        return this.goals;
    }
});