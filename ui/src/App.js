import React, { Component } from 'react'
import './App.css'

const most = (freqs) => Object.entries(freqs).reduce((m, entry) => {
  if (entry[1] > m.value) {
    m.key = entry[0]
    m.value = entry[1]
  }
  return m
}, { key: '', value: 0 })

const Tag = (props) =>
  <div className='Tag'>
    <p className='Tag-example'>{props.example}</p>
    <p className='Tag-name'>{props.name}</p>
    <p className='Tag-desc'>{props.desc}</p>
  </div>

const TagList = (props) => {
  let key = 0
  const t = props.tags
    .filter((tag) => tag !== '')
    .map((tag) => <Tag name={tag} desc={props.defs[tag]} key={key++} example={props.example} />)
  return <div className='TagList'>{t}</div>
}

const Frequencies = (props) => {
  const mostFreq = most(props.data)

  return <div className='Frequencies'>
    <h4>MOST FREQUENT PATTERN:</h4>
    <TagList tags={mostFreq.key.split('_')} {...props} />
    <p>{`@ ${mostFreq.value}`}</p>
  </div>
}

const Lyrics = (props) => <div></div>

class App extends Component {
  apiRoot = 'http://localhost:8080'
  state = {
    lyrics: [],
    frequencies: [],
    tags: {}
  }

  componentDidMount() {
    fetch(this.apiRoot + '/lyrics/tagged').then((b) => b.json()).then((t) => {
      this.setState({
        lyrics: t
      })
    })
    fetch(this.apiRoot + '/lyrics/tagged/frequencies').then((b) => b.json()).then((f) => {
      this.setState({
        frequencies: f
      })
    })
    fetch(this.apiRoot + '/pos/tags').then((b) => b.json()).then((t) => {
      this.setState({
        tags: t
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>WHERE IT'S AT</h2>
          <h3>a celebration of language</h3>
        </div>
        <p className="App-intro">
          k, here goes.
        </p>
        <Frequencies data={this.state.frequencies} defs={this.state.tags} />
        <Lyrics data={this.state.lyrics} />
      </div>
    );
  }
}

export default App;
