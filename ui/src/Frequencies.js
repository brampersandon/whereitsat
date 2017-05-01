import React from "react";

// Deprecated: this is some of the stuff I used for the first pass at this.

const most = freqs =>
  Object.entries(freqs).reduce(
    (m, entry) => {
      if (entry[1] > m.value) {
        m.key = entry[0];
        m.value = entry[1];
      }
      return m;
    },
    { key: "", value: 0 }
  );

const Tag = props => (
  <div className="Tag">
    <p className="Tag-example">{props.example[0]}</p>
    <p className="Tag-name">{props.name}</p>
    <p className="Tag-desc">{props.desc}</p>
  </div>
);

const TagList = props => {
  let key = 0;
  const t = props.tags
    .filter(tag => tag !== "")
    .map(tag => (
      <Tag
        name={tag}
        desc={props.defs[tag]}
        key={key++}
        example={props.examples[tag]}
      />
    ));
  return <div className="TagList">{t}</div>;
};

const Frequencies = props => {
  const mostFreq = most(props.freqs);
  const lyrics = props.lyrics.find(
    lyric => lyric.tags.join("_") === mostFreq.key
  );
  const examples = lyrics
    ? lyrics.pairs.reduce((acc, l) => {
        if (!acc[l[1]]) acc[l[1]] = [];
        acc[l[1]] = acc[l[1]].concat([l[0]]);
        return acc;
      }, {})
    : null;

  return (
    <div className="Frequencies">
      <h4>{mostFreq.key.split("_").join(" | ")}</h4>
      <h5><em>{lyrics ? lyrics.line : null}</em></h5>
      <TagList tags={mostFreq.key.split("_")} examples={examples} {...props} />
      <p>{`@ ${mostFreq.value}`}</p>
    </div>
  );
};

module.exports = Frequencies;
