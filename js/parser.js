let container = document.querySelector('.container').innerHTML
let result = document.querySelector('.result')

let mdTables = (str) => {
	//console.log('str: ', str)
  str = str.trim()
  //console.log('str: ', str)

  let table = ''
  let regCheckPipe = /(\|)/gi

  if (str.match(regCheckPipe)) {
  	// TODO: 'replace' could be improved --> create single regex
  	str = str.replace(/<p[^>]*>/g, '')
    str = str.replace(/<\/p[^>]*>/g, '\n')
    str = str.replace(/<br>/g, '')

    //console.log('str2: ', str)

    let tableStart = '<table><tbody>'
    let tableEnd = '</tbody></table>'
    let rowStart = '<tr>'
    let rowEnd = '</tr>'
    let columnStart = '<td>'
    let columnEnd = '</td>'

    let row = str.split('\n')
    //console.log('row.length: ', row.length)
    //console.log('row: ', row)

    let content = ''
    let column = ''

    let i_res = ''
    let k_res = ''

    let i = 0
    for (i; i < row.length; i += 1) {
      //console.log(i)

      i_res = row[i]
      //console.log('row['+i+']: ', i_res)

      if (i_res) {
        column = i_res.split('|')
        // console.log('column.length: ', column.length)
        // console.log('column: ', column)

        if (column.length > 1) {
          let k = 0
          let inner = ''
          for (k; k < column.length; k += 1) {
            k_res = column[k].trim()
            console.log('column['+k+']: ', k_res)

            inner += `${columnStart}${k_res}${columnEnd}`
          }
          content += `${rowStart}${inner}${rowEnd}`
        }
      }
    }

    if (content) {
      table += `${tableStart}${content}${tableEnd}`
    }

    //console.log('table: ', table)
    result.insertAdjacentHTML('beforeend', table)
  } else {
    console.log('Invalid');
  }
}

mdTables(container)
