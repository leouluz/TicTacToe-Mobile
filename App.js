import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window')

export default function App() {

  //criação do array que se refere ao tabuleiro
  const emptyBoard = Array(9).fill("")

  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  //Verifica se existe um vencedor e define o proximo jogador caso não exista vencedor
  const handlerCellClick = (index) => {
    if (winner) {
      return null;
    }
    if (board[index] !== "") {
      return null;
    }

    setBoard(board.map(
      (item, itemIndex) => itemIndex === index ? player : item));
    setPlayer(player === "X" ? "O" : "X");
  }

  //Checa as possibilidades de vitoria/empate
  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    checkDraw();

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O Venceu!");
      if (cells.every(cell => cell === "X")) setWinner("X Venceu!");
    })

  }

  //Verifica se todos já foram selecionados e se existe um vencedor, caso não tenha empata
  const checkDraw = () => {
    if (winner == null) {
      if (board.every(item => item !== "")) setWinner("Empatou")
    }
  }

  //Seta todos os valores com os valores iniciais
  const handleReset = () => {
    setPlayer("O")
    setBoard(emptyBoard);
    setWinner(null);
  }

  useEffect(checkWinner, [board]);
  return (
    <View style={styles.container}>
      <View style={styles.playersView}>
        <Text>Jogador 1</Text>
        <Text>Jogador 2</Text>
      </View>
      <TouchableOpacity
        onPress={handleReset}
      ><Text>Resetar jogo</Text>
      </TouchableOpacity>
      <View style={styles.viewCells}>
        {

          board.map((item, index) => (
            <TouchableOpacity
              disabled={winner !== null ? true : false}
              key={index}
              onPress={() => handlerCellClick(index)}
              style={styles.cell}
            >
              <Text style={styles.textCell} > {item ? item : ""} </Text></TouchableOpacity>
          ))
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersView: {
    width,
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cell: {
    height: 100,
    width: 100,
    backgroundColor: '#888',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textCell: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },

  viewCells: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
  }
});
