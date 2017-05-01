import React, { Component } from "react";
import "./App.css";
import beck from "./beck.json";
import defs from "./pos.json";

const POSTag = props => {
  if (!props.tag) return null;
  if (!props.desc) return null;
  if (!props.example) return null;
  return (
    <div className="Tag">
      <p className="Tag-example">{props.example}</p>
      <p className="Tag-name">{props.tag}</p>
      <p className="Tag-desc">{props.desc}</p>
    </div>
  );
};

const Lyric = props => {
  if (!props.lyric) return null;
  return (
    <div className="Lyric">
      <h4><em>{props.lyric.line}</em></h4>
      <h5>{props.lyric.tags.join(" | ")}</h5>
      {props.lyric.pairs.map(tagPair => (
        <POSTag
          tag={tagPair[1]}
          example={tagPair[0]}
          desc={props.descriptions[tagPair[1]]}
        />
      ))}
    </div>
  );
};

class App extends Component {
  state = {
    lyrics: beck.lyrics,
    frequencies: beck.frequencies,
    tags: defs
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>WHERE IT'S AT</h2>
          <h3>
            a celebration of the wacky language of
            {" "}
            <a href="https://en.wikipedia.org/wiki/Beck">Beck</a>
          </h3>
          <p>
            <em>
              I analyzed popular-ish Beck lyrics with a part-of-speech tagger, and mapped them out.
            </em>
          </p>
          <p>
            These methods could be used on any corpus of newline-separated lyrics by any artist. But, to start out, I'm using Beck.
          </p>
        </div>
        <p className="App-intro">
          k, here goes.
        </p>
        {this.state.lyrics.map(lyric => (
          <Lyric
            lyric={lyric}
            descriptions={this.state.tags}
            key={encodeURI(lyric.line)}
          />
        ))}
      </div>
    );
  }
}

export default App;
