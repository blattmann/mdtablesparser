// The function :)
let mdTables = str => {
  let table = ''
  let regCheckPipe = /(\|)/gi

  str = str.trim()

  if (str.match(regCheckPipe)) {
    let tableStart = '<table><tbody>'
    let tableEnd = '</tbody></table>'
    let rowStart = '<tr>'
    let rowEnd = '</tr>'
    let headStart = '<th>'
    let headEnd = '</th>'
    let columnStart = '<td>'
    let columnEnd = '</td>'
    let row = ''
    let content = ''
    let column = ''
    let i_res = ''
    let k_res = ''

    // Clean the content.
    str = htmlDecode(str).replace(/<(div|\/div|p|\/p|br)[^>]{0,}>/g, '\n')

    // Create rows.
    row = str.split('\n')

    let i = 0
    for (i; i < row.length; i += 1) {
      i_res = row[i]

      // Table header.
      if (row.length >= 1 && i === 0) {
        column = i_res.split('|')
        if (column.length > 1) {
          let k = 0
          let inner = ''
          for (k; k < column.length; k += 1) {
            k_res = column[k].trim()
            inner += `${headStart}${k_res}${headEnd}`
          }
          content += `${rowStart}${inner}${rowEnd}`
        }
        i_res = row[i + 1]
      }

      // Table content.
      if (i_res) {
        column = i_res.split('|')
        if (column.length > 1) {
          let k = 0
          let inner = ''
          for (k; k < column.length; k += 1) {
            k_res = column[k].trim()
            inner += `${columnStart}${k_res}${columnEnd}`
          }
          content += `${rowStart}${inner}${rowEnd}`
        }
      }
    }

    if (content) {
      table += `${tableStart}${content}${tableEnd}`
    }

    result.insertAdjacentHTML('beforeend', table)
  } else {
    console.error('Invalid input')
  }
}

// Here we find the content that should be parsed.
const container = document.querySelector('.container').innerHTML

// Here we outout the parsed content.
let result = document.querySelector('.result')

// Decode HTML entities.
const htmlDecode = str => {
  return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

// Happy parsing!
mdTables(container)
