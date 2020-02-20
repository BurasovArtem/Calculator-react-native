import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operation = ['Del','+', '-', '*', '/']
  }

  calculateResult() {
    const text = this.state.resultText
    console.log(text, eval(text))
    this.setState({
      calculationText: eval(text)
    })
  }

  validate() {
    const text = this.state.resultText
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed(text) {
    if(text == '=') {
      return this.validate() && this.calculateResult()
    }
    this.setState({
      resultText: this.state.resultText+text
    })
  }

  operate(operationn) {
    switch(operationn) {
      case 'Del':
        let text = this.state.resultText.split('')
        text.pop()
        text.join('')
        this.setState({
          resultText: text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()
        if(this.operation.indexOf(lastChar) > 0) return
        if(this.state.text == "") return
        this.setState({
          resultText: this.state.resultText + operationn
        })
    }
  }
  render() {
    let rows = []
    let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    for(let i = 0; i < 4; i++) {
      let row = []
      for(let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity onPress={() =>  this.buttonPressed(nums[i][j])} style={styles.btn}>
          <Text style={styles.btntext}>{nums[i][j]}</Text>
        </TouchableOpacity>
        )
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }
    let ops = []
    for( let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity onPress={() => this.operate(this.operation[i])} style={styles.btn}>
          <Text style={styles.btntext,styles.white}>{this.operation[i]}</Text>
        </TouchableOpacity>
      )
    }

    return(
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    color: 'white',
    fontSize: 30
  },
  container: {
    flex: 1
  },
  btntext: {
    fontSize: 30,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  calculationText: {
    fontSize: 24,
    color: 'white'
  },
  resultText: {
    fontSize: 30,
    color: 'white'
  },
  result: {
    flex: 2,
    backgroundColor: '#67C6F2',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: '#6EEEED',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#C9F8FE',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#005BAA'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
