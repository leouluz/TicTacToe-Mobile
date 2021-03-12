import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import { Colors, Cell } from './styles'
import Trofeu from './json/trofeu.json'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

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
      if (cells.every(cell => cell === "O")) setWinner("O");
      if (cells.every(cell => cell === "X")) setWinner("X");
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

  const handlerStyleCell = (item) => {
    if (item) {
      if (item == "X") {
        return styles.cellX
      } if (item == "O") {
        return styles.cellO
      }
    } else {
      return styles.cell
    }
  }

  const handlerStyleBoard = (winner) => {
    if (!winner) {
      return styles.viewCells
    } else {
      return styles.viewCellsDisable
    }
  }
  const handlerStyleModal = (winner) => {
    if (winner == 'O') {
      return styles.ModalO
    } if (winner == 'X') {
      return styles.ModalX
    } else {
      return styles.ModalDraw
    }
  }

  useEffect(checkWinner, [board]);
  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={false}
        visible={winner !== null ? true : false}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <SafeAreaView style={handlerStyleModal(winner)}>
          <LottieView
            source={Trofeu}
            autoPlay
          />
        </SafeAreaView>
        <View style={styles.modalStyle}>
          <TouchableOpacity
            style={styles.buttonCongratulation}
            onPress={handleReset}>
            <Text>Resetar jogo</Text>
          </TouchableOpacity>
        </View>

      </Modal>

      <View style={styles.playersView}>
        <Text>Jogador 1</Text>
        <Text>Jogador 2</Text>
      </View>
      <View style={handlerStyleBoard(winner)}>
        {
          board.map((item, index) => (
            <TouchableOpacity
              disabled={winner !== null ? true : false}
              key={index}
              onPress={() => handlerCellClick(index)}
              style={handlerStyleCell(item)}
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
    backgroundColor: '#ffbf00',
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
    ...Cell.cells,
    ...Cell.shadow,
    backgroundColor: Colors.white,
  },
  cellX: {
    ...Cell.cells,
    ...Cell.shadow,
    backgroundColor: Colors.red,
  },
  cellO: {
    ...Cell.cells,
    ...Cell.shadow,
    backgroundColor: Colors.blue,
  },
  textCell: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.white,
    elevation: 5,
  },

  viewCells: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
  },
  viewCellsDisable: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    opacity: 0.5
  },
  buttonCongratulation: {
    height: 60,
    width: width * 0.8,
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ModalX: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red
  },
  ModalO: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue
  },
  ModalDraw: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray
  },
  modalStyle: {
    height: height,
    width: width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});
