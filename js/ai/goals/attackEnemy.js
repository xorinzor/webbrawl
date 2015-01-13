game.AIGoalAttackEnemy = game.AIGoal.extend({
    init: function(entity) {
        this.entity = entity;
    },
    
    shouldExecute: function() {
        return true;
    },
    
    execute: function() {
        this.entity.shoot();
    }
})