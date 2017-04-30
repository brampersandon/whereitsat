const fs = require('fs')
const pos = require('pos')

const LYRIC_FILE = './beck.txt'

const readLyrics = function () {
  return new Promise(function (res, rej) {
    fs.readFile(LYRIC_FILE, 'utf-8', function (err, buf) {
      if (err) rej(err)
      res(buf)
    })
  })
}

const parseLyrics = function (lyrs) {
  const parsed = lyrs
    .split('\n')
    .map((s) => {
      return s.replace(/\.|\,/g, '')
    })
    .reduce((acc, line) => {
      const lexed = new pos.Lexer().lex(line)
      const tagged = new pos.Tagger().tag(lexed)

      return acc.concat([{
        line: line,
        tags: tagged.map((t) => t[1]),
        pairs: tagged
      }])
    }, [])
  if (!parsed) return
  return parsed
}

const getFrequencies = function (lines) {
  const freqs = lines
    .map(function (line) {
      return line.tags
    })
    .reduce(function (acc, tags) {
      const key = tags.join('_')
      if (!acc[key]) {
        acc[key] = 1
      } else {
        acc[key]++
      }
      return acc
    }, {})
  if (!freqs) return
  return freqs
}

const printMostPopular = (freqs) => {
  const most = Object.entries(freqs).reduce((m, entry) => {
    if (entry[1] > m.value) {
      m.key = entry[0]
      m.value = entry[1]
    }
    return m
  }, { key: '', value: 0 })
  if (!most) return
  return most
}

const output = readLyrics().then(parseLyrics).then((l) => {
  const parsedLyrics = l
  const frequencies = getFrequencies(l)
  return {
    lyrics: parsedLyrics,
    freqs: frequencies
  }
})

output.then((d) => {
  fs.writeFile(LYRIC_FILE + '.json', JSON.stringify(d), {encoding: 'utf-8'}, console.log)
})
