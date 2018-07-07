function parse(message){
    // message = "@aaa=bbb;ccc;example.com/ddd=eee"
    // aaa, ccc, and ddd are tags
    // bbb and eee are values


    const tags = message.split(';');
    // tags[0] is @aaa=bbb
    // tags[1] is ccc
    // tags[2] is example.com/ddd=eeez
    
    let temp = tags[0].substring(1); // aaa=bbb

    temp = temp.split('=');
    const firstTag = {
        key: temp[0], // aaa
        value: convertEscaped(temp[1]) // bbb
    }

    const secondTag = tags[1] // ccc

    temp = tags[2].split('/');
    // temp[0] is example.com
    // temp[1] is ddd=eee

    const software = temp[0];

    temp = temp[1].split('=');
    const thirdTag = {
        key: temp[0], // ddd
        value: convertEscaped(temp[1]) // eee
    }

    // test
    console.log(firstTag);
    console.log(secondTag);
    console.log(software);
    console.log(thirdTag);
}

function convertEscaped(escapedSequence){
    const cleanedSequence = escapedSequence.replace(/\\\\/g, ";").replace(/\\s/g, " ")
    .replace(/\\\\\\\\/g, "\\\\").replace(/\\r/g, "\r").replace(/\\n/g, "\n");

    // for (let i = 0; i < escapedSequence.length; i++) {
    //     let curChar = escapedSequence.charAt(i);

    //     if(curChar === '\\:'){
    //         cleanedSequence += ';';
    //     } else if (curChar === '\\s') {
    //         cleanedSequence += ' ';
    //     } else if (curChar === '\\\\') {
    //         cleanedSequence += '\\';
    //     } else if (curChar === '\\r') {
    //         cleanedSequence += 'r';
    //     } else if (curChar === '\\n') {
    //         cleanedSequence += '\n';
    //     } else {
    //         cleanedSequence += curChar;
    //     }
    // }

    return cleanedSequence;
}

// parse('@aaa=bbb;ccc;example.com/ddd=eee');
// parse('@aaa=bbb;ccc;example.com/ddd=\\se');