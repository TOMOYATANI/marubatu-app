<template>
  <div id="app">
    <table id="table">
      <tr v-for="(row,rowsIndex) in states" :key="row.id">
        <td
          v-for="(state,colsIndex) in row"
          @click="onSelect(rowsIndex, colsIndex)"
          :key="state.id"
        >
          <div class="maru" v-if="state==1">○</div>
          <div class="batu" v-if="state==2">×</div>
        </td>
      </tr>
    </table>
    <div class="player">
      <div class="player-maru" v-if="playerId==1">「○ プレイヤーさん、マスを選んでください」</div>
      <div class="player-batu" v-if="playerId==2">「× プレイヤーさん、マスを選んでください」</div>
    </div>
    <div class="winner" v-if="winnerText">
      <p v-text="winnerText"></p>
      <img src="../assets/winner.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  el: "#app",
  data() {
    return {
      states: [],
      playerId: 1,
      winnerText: ""
    };
  },
  methods: {
    init: function() {
      this.states = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
      ];
    },
    onSelect: function(rowsIndex, colsIndex) {
      this.winnerText = "";

      if (this.states[rowsIndex][colsIndex] != -1) {
        alert("そのマスは、すでに選択されています！");
      } else {
        let states = JSON.parse(JSON.stringify(this.states)); //JSONに再度元に戻す
        states[rowsIndex][colsIndex] = this.playerId;
        this.states = states; //再度代入
        this.playerId = this.playerId == 1 ? 2 : 1; //三項演算子
        let winnerId = this.getWinnerId();

        if (winnerId != -1) {
          this.init();
          let playerIds = {
            1: "○",
            2: "×"
          };
          this.winnerText =
            playerIds[winnerId] + " さんの勝ちです。おめでとうございます！";
        } else if (this.isDraw()) {
          this.init();
          alert("引き分けです！");
        }
      }
    },
    getWinnerId: function() {
      for (let i = 0; i < 3; i++) {
        // 横の列
        let row = this.states[i];
        if (this.isStatesFilled(row)) {
          return row[0];
        }

        // 縦の列
        let col = [this.states[0][i], this.states[1][i], this.states[2][i]];
        if (this.isStatesFilled(col)) {
          return this.states[0][i];
        }
      }

      // ななめ
      let skew1 = [this.states[0][0], this.states[1][1], this.states[2][2]];
      if (this.isStatesFilled(skew1)) {
        return this.states[0][0];
      }

      let skew2 = [this.states[0][2], this.states[1][1], this.states[2][0]];
      if (this.isStatesFilled(skew2)) {
        return this.states[0][2];
      }

      return -1;
    },
    isStatesFilled: function(states) {
      return (
        states[0] != -1 && states[0] == states[1] && states[1] == states[2]
      );
    },
    isDraw: function() {
      for (let i in this.states) {
        let row = this.states[i];

        for (let j in row) {
          let state = row[j];

          if (state == -1) {
            return false;
          }
        }
      }

      return true;
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

<style lang="scss">
#table {
  margin: 0 auto;
  border-collapse: collapse;
  border: 3px solid #ccc;
  td {
    border: 1px solid #ccc;
    height: 110px;
    width: 110px;
    text-align: center;
    vertical-align: middle;
    font-size: 80px;
    cursor: pointer;
    .maru {
      color: #f00;
    }
    .batu {
      color: #00f;
    }
  }
}
.player {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  padding: 20px;
  &-maru {
    color: #f00;
  }
  &-batu {
    color: #00f;
  }
}

.winner {
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  img {
    width: 220px;
    height: 220px;
  }
}
</style>