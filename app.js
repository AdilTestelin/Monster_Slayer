const app = Vue.createApp({
  data() {
    return {
      playerLifePoint: 100,
      monsterLifePoint: 100,
      nbTurnSpecialAttack: 3,
      surrendered: false,
      damages: 0,
      logMessages: []
    }
  },
  computed: {
    monsterBar() {
      return { width: this.monsterLifePoint + '%' };
    },
    playerBar() {
      return { width: this.playerLifePoint + '%' };
    }
  },
  methods: {
    attackMonster() {
      this.damages = (Math.floor(Math.random() * 13) + 5);
      console.log('Damage dealt by the player '+ this.damages);
      this.monsterLifePoint = this.monsterLifePoint - this.damages;
      console.log("Monster lifepoints : ", this.monsterLifePoint);
      this.addLogMessage('Player', 'attacks', this.damages);
      this.attackPlayer();
    },
    attackPlayer() {
      this.damages = (Math.floor(Math.random() * 13) + 5);
      console.log('Damage dealt by the monster '+ this.damages);
      this.playerLifePoint = this.playerLifePoint - this.damages;
      console.log("Player lifepoints : ", this.playerLifePoint);
      this.addLogMessage('Monster', 'attacks', this.damages);
      this.decreaseNbTurn();
    },
    specialAttack() {
      if (this.nbTurnSpecialAttack === 3) {
        this.damages = 25;
        console.log('Damage dealt by the player with special attack '+ this.damages);
        this.monsterLifePoint = this.monsterLifePoint - this.damages;
        console.log("Monster lifepoints : ", this.monsterLifePoint);
        this.addLogMessage('Player', 'specialAttack', this.damages);
        this.attackPlayer();
        this.decreaseNbTurn();
        }
    },
    decreaseNbTurn() {
      if (this.nbTurnSpecialAttack === 0) {
        this.nbTurnSpecialAttack = 3;
      } else {
        this.nbTurnSpecialAttack--;
      }
    },
    healPlayer() {
      this.damages = (Math.floor(Math.random() * 13) + 5);
      console.log('Heal by the player :'+ this.damages);
      this.playerLifePoint = this.playerLifePoint + this.damages;
      this.addLogMessage('Player', 'heals', this.damages);
      if (this.playerLifePoint > 100) {
        this.playerLifePoint = 100;
      }
      this.attackPlayer();
    }, 
    restartGame() {
      this.playerLifePoint = 100;
      this.monsterLifePoint = 100;
      this.nbTurnSpecialAttack = 3;
      this.surrendered = false;
      this.logMessages = [];
    },
    surrender() {
      this.surrendered = true;
    }, 
    addLogMessage(who, what, value) {
      this.logMessages.push({
        actionBy: who, 
        actionType: what, 
        actionValue: value
      })
    }
  }
});

app.mount('#game');